import { Outlet } from "react-router-dom";
import publicRoutes from "./public.route";

export const userRoutes = (t) => {
  return [
    {
      element: <Outlet />,
      children: [...publicRoutes(t)],
    },
  ];
};
