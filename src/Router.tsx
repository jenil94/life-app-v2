import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home.page";
import { SecondPage } from "./pages/SecondPage.page";
import { MainAppShell } from "./components/MainAppShell/MainAppShell";

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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
