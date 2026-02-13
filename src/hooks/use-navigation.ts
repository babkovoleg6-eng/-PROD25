import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  return {
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
  };
}
