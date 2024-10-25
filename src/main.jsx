import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login_signup from "./page/Login_signup.jsx"
import WelcomePage from "./page/WelcomePage.jsx"
import GamePage from "./page/GamePage.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store.js'

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
