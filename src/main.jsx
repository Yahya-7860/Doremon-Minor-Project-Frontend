import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login_signup from "./page/Login_signup.jsx"
import WelcomePage from "./page/WelcomePage.jsx"
import GamePage from "./page/GamePage.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login_signup />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
