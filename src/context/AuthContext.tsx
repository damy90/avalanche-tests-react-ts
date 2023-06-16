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
        id: 'f86b1061-de69-4c36-871f-31932b0ad239',
        name:'Admin',
        paths: []
    }, {
        id: 'ed7aedf9-2941-458b-9460-d9ecdaefe4da',
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
            return axios.post(`${import.meta.env.VITE_SERVER_URL}/user/${import.meta.env.VITE_APP_KEY}`, user, basicAuth)
                .then(res => {
                    setUser(res.data.username)
                    setToken(res.data._kmd.authtoken)
                    return res.data
                })
                .then(data => {
                    const headers = getAuthHeaders("kinvey", data._kmd.authtoken)
                    return axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${import.meta.env.VITE_APP_KEY}/_me`, headers)
                })
                .then(res => {
                    return res.data
                })
        },
        onSuccess(data) {
            if(data._kmd.roles) {
                // TODO: role response type
                const roleIds = data._kmd.roles.map((role:Role)=>{
                    return role.roleId
                })
                setUserRoles(roleIds || [])
            }
            
            return <Navigate to="/" />

        },
    })

    const login = useMutation({
        mutationFn: (user: User) => {
            return axios
                .post(`${import.meta.env.VITE_SERVER_URL}/user/${import.meta.env.VITE_APP_KEY}/login`, user, basicAuth)
                .then(res => {
                    console.log("************ LOGGED IN")
                    setUser(res.data.username)
                    setToken(res.data._kmd.authtoken)
                    
                    return res.data
                })
                .then(data => {
                    const headers = getAuthHeaders("kinvey", data._kmd.authtoken)
                    return axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${import.meta.env.VITE_APP_KEY}/_me`, headers)
                })
                .then(res => {
                    return res.data
                })
        },
        onSuccess(data) {
            if(data._kmd.roles) {
                // TODO: role response type
                const roleIds = data._kmd.roles.map((role:Role)=>{
                    return role.roleId
                })
                setUserRoles(roleIds || [])
            }
            
            return <Navigate to="/" />
        },
    })

    const logout = useMutation({
        mutationFn: () => {
            const headers = getAuthHeaders("kinvey", token)
            return axios.post(`${import.meta.env.VITE_SERVER_URL}/user/${import.meta.env.VITE_APP_KEY}/_logout`, undefined, headers)
        },
        onSuccess() {
            setUser(undefined)
            setToken(undefined)
            setUserRoles([])
            
            login.mutate({
                username: 'Anonymous',
                password: 'anonymous'
            })
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
