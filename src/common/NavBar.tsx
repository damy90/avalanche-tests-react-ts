import { NavLink } from "react-router-dom";
import {StyledNavBar} from "../styles/common/NavBar.styled.tsx";
import { useLoggedInAuth } from "../hooks/useLoggedInAuth.tsx";
function NavBar() {
    const { userHasRole, logout } = useLoggedInAuth()

    const isRegistered = userHasRole('Registered')
    
    return (
        <StyledNavBar>
            <h2>Title</h2>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                {isRegistered ? <li><NavLink to='/submit-report'>Submit Report</NavLink></li>: ''}
                {isRegistered ? <li><NavLink to='/my-reports'>My Reports</NavLink></li>: ''}
                {isRegistered ? '' : <li><NavLink to='/login'>Log In</NavLink></li>}
                {isRegistered ? '' : <li><NavLink to='/signup'>Register</NavLink></li>}
                {isRegistered ? <li><button onClick={() => logout.mutate()} disabled={logout.isLoading}>Log Out</button></li>: ''}
            </ul>
        </StyledNavBar>
    )
}

export default NavBar