function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {

  const { params, request, res } = context;

  

  return {
    //this can not be set
    // revalidate
    // that can be set
    // redirect:
    // notfound:
    props: {
      username: "Mia",
    },
  };
}
