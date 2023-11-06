import { Outlet } from "react-router-dom";
import { NotFound } from "../pages";
import { adminRoutes } from "./Admin";
import { userRoutes } from "./User";

export const routes = () => {
  return [
    {
      element: <Outlet />, //Outlet from "react-router-dom": This is used to render nested child routes within the parent route
      children: [...adminRoutes()],
    },
    {
      element: <Outlet />,
      children: [...userRoutes()],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
};

export const routesList = () => {
  let routeArr = [
    ...userRoutes()[0].children,
    ...userRoutes()[1].children,
    ...adminRoutes()[0].children,
    ...adminRoutes()[1].children,
  ];
  return [...routeArr];
};

export const moduleRoutesList = () => {
  let routeArr = {
    user: [...userRoutes()[0].children, ...userRoutes()[1].children],
    admin: [...adminRoutes()[0].children, ...adminRoutes()[1].children],
  };
  return routeArr;
};

export const getCompletePathList = () => {
  return routesList().reduce((prev, curr) => {
    prev.push(curr);
    if (curr.children) {
      prev.push(...curr.children);
    }
    return prev;
  }, []);
};
