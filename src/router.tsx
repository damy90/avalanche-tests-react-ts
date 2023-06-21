import { createBrowserRouter, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import { RootLayout } from "./pages/layouts/RootLayout"
import Login from "./pages/LoginForm"
import Register from "./pages/RegisterForm"
import SubmitReport from "./pages/SubmitReport"
import MyReports from "./pages/MyReports"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { element: <Home />, index: true },
            { path: "submit-report", element: <SubmitReport /> },
            { path: "my-reports", element: <MyReports /> },
            { path: 'report/:id/edit', element: <SubmitReport/>},
            { path: "login", element: <Login /> },
            { path: "signup", element: <Register /> }
        ],
    },
])
