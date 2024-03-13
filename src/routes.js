import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
} from "react-icons/md";
import Orders from "views/admin/orders";
import Users from "views/admin/users";
import Products from "views/admin/products";
import SingleOrder from "views/admin/orders/singleOrder";
// import SingleProduct from "views/admin/products/singleProduct";
import AddProduct from "views/admin/products/AddProduct";
import SingleProduct from "views/admin/products/singleProduct";
// import singleOrder from "./views/admin/orders/singleOrder"

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    name: "SingleOrders",
    layout: "/admin",
    path: "orders/:id",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <SingleOrder/>,
    secondary:true,
  },
  {
    name: "Users",
    layout: "/admin",
    icon: <MdPerson className="h-6 w-6" />,
    path: "users",
    component: <Users/>,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Products />,
  },
  {
    name: "Single Products",
    layout: "/admin",
    path: "products/:id",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <SingleProduct />,
  },
  {
    name: "Add Product",
    layout: "/admin",
    path: "Addproduct",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <AddProduct />,
  },
];
export default routes;
