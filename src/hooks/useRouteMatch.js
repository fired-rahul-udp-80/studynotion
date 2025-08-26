import { useLocation, matchPath } from "react-router";

export default function useRouteMatch(path) {
  const location = useLocation();
  return matchPath(location.pathname, { path });
}
