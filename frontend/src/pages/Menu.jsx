import { useEffect } from "react";

const Menu = () => {
  useEffect(() => {
    document.title = "Menu";
  }, []);
  return <div>Menu</div>;
};

export default Menu;
