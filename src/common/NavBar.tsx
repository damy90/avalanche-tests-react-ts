import { NavLink } from "react-router-dom";
import {StyledNavBar} from "../styles/common/NavBar.styled.tsx";
import { useAppSelector } from "../redux/hooks.ts";
//import { useLogoutUserMutation } from "../redux/features/auth/authApiSlice.ts";
function NavBar() {
    //const [logout, { isLoading, isError, error, isSuccess }] = useLogoutUserMutation()

    const roles =  useAppSelector((state) => state.auth.roles);
    const isRegistered = roles?.includes('Registered')
    
    return (
        <StyledNavBar>
            <h2>Title</h2>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                {isRegistered ? <li><NavLink to='/submit-report'>Submit Report</NavLink></li>: ''}
                {isRegistered ? <li><NavLink to='/my-reports'>My Reports</NavLink></li>: ''}
                {isRegistered ? '' : <li><NavLink to='/login'>Log In</NavLink></li>}
                {isRegistered ? '' : <li><NavLink to='/signup'>Register</NavLink></li>}
                {/* {isRegistered ? <li><button onClick={() => logout()} disabled={isLoading}>Log Out</button></li>: ''} */}
            </ul>
        </StyledNavBar>
    )
}

export default NavBar