import { AppShell, NavLink, Title, Flex } from "@mantine/core";
import { IconHome2, IconGauge, IconCircleCheck } from "@tabler/icons-react";

interface MainAppShellProps {
  children: React.ReactNode;
}

export function MainAppShell({ children }: MainAppShellProps) {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center" h={"100%"} mx={12}>
          <Title order={1}>Heading 1</Title>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          href="/"
          label="Home"
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
        />
        <NavLink
          href="/habit"
          label="X Factor"
          leftSection={<IconCircleCheck size="1rem" stroke={1.5} />}
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
