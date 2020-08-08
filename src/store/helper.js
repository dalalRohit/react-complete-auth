export const updateObj = (old, values) => {
  return {
    ...old,
    ...values,
  };
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setData = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", user);
};

export const removeUserData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
