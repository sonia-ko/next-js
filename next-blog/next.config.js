const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_un: "soniakozitskaya",
        mongodb_password: "Y2kcR5rlFwnIqVRd",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-blog-dev",
      },
    };
  }
  return {
    env: {
      mongodb_un: "soniakozitskaya",
      mongodb_password: "Y2kcR5rlFwnIqVRd",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-blog",
    },
  };
};
