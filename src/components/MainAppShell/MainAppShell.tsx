import { AppShell, NavLink, Center, Loader } from "@mantine/core";
import { IconHome2, IconCircleCheck } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "@/data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface MainAppShellProps {
  children: React.ReactNode;
}

const navLinkItems = [
  {
    label: "Home",
    icon: <IconHome2 size="1rem" stroke={1.5} />,
    to: "/",
  },
  {
    label: "X Factor",
    icon: <IconCircleCheck size="1rem" stroke={1.5} />,
    to: "/habit",
  },
];

export function MainAppShell({ children }: MainAppShellProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  if (!user && loading) {
    return (
      <Center h={"100vh"} w={"100vw"}>
        <Loader />
      </Center>
    );
  }

  if (!user) {
    navigate("/login");
  }

  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Navbar>
        {navLinkItems.map((item) => (
          <NavLink
            key={item.to}
            onClick={() => navigate(item.to)}
            label={item.label}
            active={pathname === item.to}
            leftSection={item.icon}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
