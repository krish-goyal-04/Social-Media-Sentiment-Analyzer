import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AnalysisPage from './components/Analyze/AnalysisPage.jsx'
import HomePage from './components/Home/HomePage.jsx'

const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
          {
            path:"/",
            element: <HomePage />
          },
          {
            path:"/analyze",
            element: <AnalysisPage />
          }
        ]
    },
])


createRoot(document.getElementById('root')).render(
    <StrictMode>
       <RouterProvider router={appRouter} />
    </StrictMode>
)
