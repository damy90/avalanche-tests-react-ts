import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import NavBar from "../../common/NavBar"
import { useEffect } from "react"
import { useLoginUserMutation } from "../../redux/features/auth/authApiSlice";
import { useAppSelector } from "../../redux/hooks";

export function RootLayout() {
  //const { login, user } = useAuth()
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <NavBar/>
      <div>User: {user}</div>
      <Outlet />
    </>
  )
}
