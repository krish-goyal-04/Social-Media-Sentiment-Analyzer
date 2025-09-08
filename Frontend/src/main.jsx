import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AnalysisPage from './components/Analyze/AnalysisPage.jsx'
import HomePage from './components/Home/HomePage.jsx'
import LoginUser from './components/Auth/LoginUser.jsx'
import RegisterUser from './components/Auth/RegisterUser.jsx'
import AuthProvider from './hooks/useAuthContext.jsx'
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx"
import UserProfile from './components/UserProfile.jsx'

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:(
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
        children:[
          {
            path:"/",
            element: <HomePage />
          },
          {
            path:"/analyze",
            element: <AnalysisPage />
          },
          {
            path:"/profile",
            element: <UserProfile />
          }
        ]
    },
    {
      path:"/login",
      element:<LoginUser />
    },
    {
      path:"/register",
      element:<RegisterUser />
    }

])


createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </StrictMode>
)
