import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>

      <footer>
        © 2025
      </footer>
    </div>
  );
}

export default MainLayout;
