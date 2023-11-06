import { AdminDashboard } from "../../../pages";

export default function route() {
  return [
    {
      path: "/admin",
      element: <AdminDashboard />,
    },
  ];
}
