import { useNavigate } from "react-router-dom";

export default function useNavigationWithQueryParams() {
  const navigate = useNavigate();
  return (path) => {
    return navigate(`${path}?${window.location.search}`);
  };
}
