import { createBrowserRouter, Outlet } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { TestsListProvider } from "./context/TestsListContext"
import Home from "./pages/Home"
import { RootLayout } from "./pages/layouts/RootLayout"
import Login from "./pages/LoginForm"
import Register from "./pages/RegisterForm"
import SubmitReport from "./pages/SubmitReport"
import MyReports from "./pages/MyReports"

export const router = createBrowserRouter([
    {
        element: <AuthContextWrapper />,
        children: [
            {
                path: "/",
                element: <RootLayout />,
                children: [
                    {
                        element: <TestsListContextWrapper />,
                        children: [
                            { element: <Home />, index: true },
                            { path: "submit-report", element: <SubmitReport /> },
                            { path: "my-reports", element: <MyReports /> },
                            { path: 'report/:id/edit', element: <SubmitReport/>}
                        ]
                    },
                    { path: "login", element: <Login /> },
                    { path: "signup", element: <Register /> }
                ],
            }
        ],
    },
])

function AuthContextWrapper() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

function TestsListContextWrapper() {
    return (
        <TestsListProvider>
            <Outlet />
        </TestsListProvider>
    )
}
