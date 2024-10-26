// pages/product/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductDetailProps {
  product: Product | null;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();

  // Handle loading state for fallback
  if (router.isFallback) return <p>Loading...</p>;

  if (!product) return <p>Product details not found</p>;

  return (
    <div>
      <div className="product" key={product.id}>
        <Image
          src={product.image}
          width={300}
          height={500}
          alt={product.description}
        ></Image>
        <span>{product.title}</span>
        <span>{product.price}</span>
        <span>{product.category}</span>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await [...Array(20)].map((productId) => ({
    params: { productId: String(productId) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async (
  context
) => {
  const { productId } = context.params!;
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product = await res.json();

  if (!product) {
    return {
      notFound: true,
    };
  }

  return { props: { product }, revalidate: 10 };
};

export default ProductDetail;
