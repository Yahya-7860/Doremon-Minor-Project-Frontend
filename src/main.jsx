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
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login_signup />,
  },
  {
    path: "/welcome",
    element: (<ProtectedRoute>
      <WelcomePage />
    </ProtectedRoute>),
  },
  {
    path: "/game",
    element: (<ProtectedRoute>
      <GamePage />
    </ProtectedRoute>),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={2500} />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
