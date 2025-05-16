import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="main_layout_wrapper">
      <Header />
      <Outlet />
    </div>
  );
}
