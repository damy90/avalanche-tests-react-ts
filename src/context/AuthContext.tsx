import { useMutation } from "@tanstack/react-query"
import { getAuthHeaders } from '../../utils/auth-headers'

import axios from "axios"
import {
    createContext,
} from "react"
import { Navigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { AuthContext, AuthProviderProps, Role, User } from "../types/authorization"

const ROLES = [
    {
        id: '649c0554c7abbe38a8b25ee2',
        name:'Admin',
        paths: []
    }, {
        id: '649c0554c7abbe38a8b25ee1',
        name: 'Registered',
        paths: ['/submit-report']
    }
]

export const Context = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useLocalStorage<string>("user")
    const [token, setToken] = useLocalStorage<string>("authtoken")
    const [userRoles, setUserRoles] = useLocalStorage<string[]>("roles")
    if(!userRoles) {
        setUserRoles([])
    }
    //const [authHeader, setAuthHeader, headers] = useAuthHeader<AxiosRequestConfig>("basic")
    // Log in, register
    const basicAuth = getAuthHeaders('basic');
    //const [authHeader, setAuthHeader] = useState<AxiosRequestConfig>(basicAuth);

    const signup = useMutation({
        mutationFn: (user: User) => {
            return axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, user)
        },
        onSuccess() {
            return <Navigate to="/" />
        },
    })

    const login = useMutation({
        mutationFn: (user: User) => {
            return axios
                .post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, user)
                .then(res => {
                    setUser(res.data.username)
                    setToken(res.data.token)
                    setUserRoles(res.data.roles || [])
                    
                    return res.data
                })
        },
        onSuccess() {
            return <Navigate to="/" />
        },
    })

    const logout = useMutation({
        mutationFn: () => {
            return axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login/_logout`, undefined)
        },
        onSuccess() {
            setUser(undefined)
            setToken(undefined)
            setUserRoles([])
            return <Navigate to="/" />
        },
        onError() {
            setUser(undefined)
            setToken(undefined)
            setUserRoles([])
            login.mutate({
                username: 'Anonymous',
                password: 'anonymous'
            })
        }
    })

    function userHasRole (roleName:string):boolean {
        let hasRole = false;
        if(!userRoles) {
            return hasRole;
        }
        let roleId = '';
        ROLES.forEach(role => {
            if(role.name === roleName) {
                roleId = role.id;
            }
            
        });
    
        if(!roleId) {
            throw new Error('Unknown role!');
        }
        userRoles.forEach(role => {
            if(role === roleId) {
                hasRole = true;
            }
        })
    
        return hasRole;
    }

    // useEffect(() => {
    //     if (token == null || user == null) {
    //         setAuthHeader(null)
    //         return
    //     } else {
    //         const headers = getAuthHeaders("kinvey", token)
    //         setAuthHeader(headers);
    //     }
    // }, [token, user])

    return (
        <Context.Provider value={{ user, token, signup, login, logout, userHasRole }}>
            {children}
        </Context.Provider>
    )
}
