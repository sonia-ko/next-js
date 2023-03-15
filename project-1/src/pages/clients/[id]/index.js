import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHandler() {
    // load data
    // router.push("/clients/max/projectdata");
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", projectId: "projecta" },
    });
  }

  return (
    <div>
      <h1>The project of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load a project A</button>
    </div>
  );
}

export default ClientProjectsPage;
