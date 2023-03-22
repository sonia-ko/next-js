import { useRouter } from "next/router";
function ClientProject() {
  const router = useRouter();

  return (
    <div>
      <h1>The page with a specific project for a selected client</h1>
    </div>
  );
}

export default ClientProject;
