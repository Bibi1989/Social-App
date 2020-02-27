export const publics = history => {
  if (sessionStorage.getItem("auth")) {
    history.push("/");
  }
};

export const privates = history => {
  if (!sessionStorage.getItem("auth")) {
    history.push("/login");
  }
};
