import axios from "axios"
import { User } from "../../../types/authorization"
import { getAuthHeaders } from "../../../../utils/auth-headers"

const ROLES = [
    {
        id: '649c0554c7abbe38a8b25ee2',
        name: 'Admin',
        paths: []
    }, {
        id: '649c0554c7abbe38a8b25ee1',
        name: 'Registered',
        paths: ['/submit-report']
    }
]

const initialState = {}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'auth/signupResponse':
    case 'auth/loginResponse': {
        const data = action.payload.data
        return {
            ...state,
            user: data.username,
            token: data.token,
            roles: data.roles.map((role: string) => {
                return ROLES.find((r) => role === r.id)?.name
            })
        }
    }
    // case 'auth/getMeResponse': {
    //     const data = action.payload.data
    //     return {
    //         ...state,
    //         roles: data._kmd.roles.map((role: string) => {
    //             return ROLES.find((r) => role === r.id)?.name
    //         })
    //     }
    // }
    case 'auth/logoutResponse': {
        return {
            ...initialState
        }
    }
    default:
      return state
  }
}

const authUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`;
// Thunk function
export function signup(user: User) {
    return async function signupThunk(dispatch) {
        const response = await axios.post(`${authUrl}/signup`, user)
        dispatch({ type: 'auth/signupResponse', payload: response })
    }
}

// export function getMe(token:string) {
//     const headers = getAuthHeaders("kinvey", token)
//     return async function getMeThunk(dispatch, getState) {
//         const response = await axios.get(`${authUrl}/_me`, headers)
//         dispatch({ type: 'auth/getMeResponse', payload: response })
//     }
// }

export function login(user: User) {
    return async function loginThunk(dispatch) {
        const response = await axios.post(`${authUrl}/login`, user)
        dispatch({ type: 'auth/loginResponse', payload: response })
    }
}

export function logout(token:string) {
    const headers = getAuthHeaders(token)
    return async function loginThunk(dispatch) {
        const response = await axios.post(`${authUrl}/_logout`, user, headers)
        dispatch({ type: 'auth/logoutResponse', payload: response })
    }
}