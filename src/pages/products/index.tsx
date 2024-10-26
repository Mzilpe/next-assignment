import Image from "next/image";

interface ProductsProps {
  products: [
    {
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
  ];
  categories: string[];
}

const Products = ({ products, categories }: ProductsProps) => {
  console.log("Clients side fetching", products);

  return (
    <>
      <div>
        {categories.map((category) => {
          return (
            <button
              key={category}
              onClick={(e) => {
                console.log(e);
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className="products">
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <Image
                src={product.image}
                width={200}
                height={300}
                alt={product.description}
              ></Image>
              <span>{product.title}</span>
              <span>{product.price}</span>
              <span>{product.category}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://fakestoreapi.com/products");
  const response2 = await fetch("https://fakestoreapi.com/products/categories");
  const products = await response.json();
  const categories = await response2.json();

  console.log("server side fetching", products);
  return {
    props: {
      products,
      categories,
    },
  };
}

export default Products;
