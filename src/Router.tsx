import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { SecondPage } from "./pages/SecondPage.page";
import { HabitPage } from "./pages/HabitPage.page";
import { MainAppShell } from "./components/MainAppShell/MainAppShell";
import { LoginPage } from "./pages/Login.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainAppShell>
        <HomePage />
      </MainAppShell>
    ),
  },
  {
    path: "/second",
    element: (
      <MainAppShell>
        <SecondPage />
      </MainAppShell>
    ),
  },
  {
    path: "/habit",
    element: (
      <MainAppShell>
        <HabitPage />
      </MainAppShell>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
