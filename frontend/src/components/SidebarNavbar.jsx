import { useState } from "react";
import { Link } from "react-router";
import { Anchor, Button, Drawer } from "@mantine/core";
import { PanelLeft } from "lucide-react";

const SidebarNavbar = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <>
      <nav className="h-14 flex items-center px-4 border-b border-gray-200 relative">
        <Button
          variant="subtle"
          radius="xl"
          onClick={() => setSidebarOpened(true)}
          className="mr-4"
        >
          <PanelLeft />
        </Button>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Anchor component={Link} to="/" underline={false}>
            <h1 className="text-2xl">{import.meta.env.VITE_APP_NAME}</h1>
          </Anchor>
        </div>
      </nav>

      <Drawer
        opened={sidebarOpened}
        onClose={() => setSidebarOpened(false)}
        title="Menu"
        padding="md"
        size="250px"
        position="left"
      >
        <ul className="space-y-2">
          <li>
            <Anchor component={Link} to="/">
              Home
            </Anchor>
          </li>
          <li>
            <Anchor component={Link} to="/about">
              About
            </Anchor>
          </li>
          <li>
            <Anchor component={Link} to="/contact">
              Contact
            </Anchor>
          </li>
        </ul>
      </Drawer>
    </>
  );
};

export default SidebarNavbar;
