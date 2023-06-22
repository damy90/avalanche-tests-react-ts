import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import NavBar from "../../common/NavBar"
import { useEffect } from "react"
//import { useLoginUserMutation } from "../../redux/features/auth/authApiSlice";
import { useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/features/auth/authApiSlice";
import { useDispatch } from "react-redux";

export function RootLayout() {
  //const { login, user } = useAuth()
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  useEffect(function () {
    // TODO: check if logged in
    
    if(!user) {
      // login.mutate({
      //   username: 'Anonymous',
      //   password: 'anonymous'
      // })

      dispatch(login({
        username: 'Anonymous',
        password: 'anonymous'
      }))
      
    }
    
  }, [])
  
  //if (user == null) return <Navigate to="/login" />

  return (
    <>
      <NavBar/>
      <div>User: {user}</div>
      <Outlet />
    </>
  )
}
