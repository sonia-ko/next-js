import fs from "fs/promises";
import path from "path";

function ProductDetailPage({ loadedProduct }) {
  if (!loadedProduct) {
    return <p>Product not found...</p>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.descriotion}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}
export async function getStaticProps(context) {
  const { params } = context;

  const id = params.id;

  const data = await getData();

  const product = data.products.find((product) => product.id === id);

  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => {
    return { params: { id } };
  });

  return {
    paths: params,
    fallback: true,
  };
}

export default ProductDetailPage;
