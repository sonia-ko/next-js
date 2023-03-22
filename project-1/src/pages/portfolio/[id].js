import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();

  //send a request to some backend server to fetch the piece of data with an id of router.data.id
  return (
    <div>
      <h1>The portfolio project page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
