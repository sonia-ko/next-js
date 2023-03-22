import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => {
        return (
          <Link key={product.id} href={`/products/${product.id}`}>
            <li> {product.title}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data/",
      },
    };
  }
  if (data.products.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    notFound: false,
  };
}

export default HomePage;
