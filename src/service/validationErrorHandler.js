import { toast } from "react-toastify";
import routes from "routes/routes";

export const serializeErrorMessage = (error) => {
  if (error.response?.status === 401) {
    window.location.pathname = routes.login;
    return { data: { hasError: true } };
  }
  if (error?.response?.data) {
    const { data } = error.response;
    if (data.errors) {
      Object.keys(data.errors).forEach((err) =>
        toast.error(data.errors[err][0])
      );
      return { data: { hasError: true } };
    }
    return {
      data: {
        hasError: true,
        errorMessage: error.response?.data?.errorMessage || error?.message,
      },
    };
  }
  return { data: { hasError: true } };
};
