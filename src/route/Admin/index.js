import { Outlet } from "react-router-dom";
import privateRoutes from "./private.route";

export const adminRoutes = (t) => {
  return [
    {
      element: <Outlet />,
      children: [...privateRoutes(t)],
    },
  ];
};
