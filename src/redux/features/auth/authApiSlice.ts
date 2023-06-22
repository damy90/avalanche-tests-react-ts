import axios from "axios"
import { Role, User } from "../../../types/authorization"
import { getAuthHeaders } from "../../../../utils/auth-headers"

// type LoginInput = {
//     username: string,
//     password: string
// }

// type RegisterInput = {
//     email: string,
//     password: string
// }

// type LoginResponse = {
//     username: string;
//     _kmd: { authtoken: string };
// }

// const ROLES = [
//     {
//         id: 'f86b1061-de69-4c36-871f-31932b0ad239',
//         name: 'Admin',
//         paths: []
//     }, {
//         id: 'ed7aedf9-2941-458b-9460-d9ecdaefe4da',
//         name: 'Registered',
//         paths: ['/submit-report']
//     }
// ]

// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${import.meta.env.VITE_SERVER_URL}/user/${import.meta.env.VITE_APP_KEY}`,
//     }),
//     endpoints: (builder) => ({
//         registerUser: builder.mutation<IGenericResponse, RegisterInput>({
//             query(data) {
//                 return {
//                     url: '',
//                     method: 'POST',
//                     body: data,
//                 };
//             },
//         }),
//         loginUser: builder.mutation<LoginResponse, LoginInput>({
//             query(data) {
//                 return {
//                     url: 'login',
//                     method: 'POST',
//                     body: data,
//                     credentials: 'include',
//                 };
//             },
//             async onQueryStarted(args, { dispatch, queryFulfilled }) {
//                 try {
//                     const { data } = await queryFulfilled;
//                     dispatch(setUser({ user: data.username, token: data._kmd.authtoken }));
//                     await dispatch(authApi.endpoints.getMe.initiate(data._kmd.authtoken));
//                 } catch (error) { }
//             },
//         }),
//         logoutUser: builder.mutation<void, void>({
//             query(data) {
//                 return {
//                     url: '_logout',
//                     method: 'POST',
//                     body: data,
//                     credentials: 'include',
//                 };
//             },
//         }),

//         getMe: builder.query<string[], string>({
//             query(token) {
//                 return {
//                     url: `/_me`,
//                     headers: getAuthHeaders('kinvey', token).headers,
//                 };
//             },
//             transformResponse: (data: any) => {
//                 if (data._kmd.roles)
//                     return data._kmd.roles.map((role: Role) => {
//                         return ROLES.find((r) => role.roleId === r.id)?.name
//                     })
//             },
//             async onQueryStarted(args, { dispatch, queryFulfilled }) {
//                 try {
//                     const { data } = await queryFulfilled;
//                     dispatch(setRoles(data));
//                 } catch (error) { }
//             },
//         }),
//     }),
// });

// export const {
//     useLoginUserMutation,
//     useRegisterUserMutation,
//     useLogoutUserMutation,
//     useGetMeQuery,
// } = authApi;

const ROLES = [
    {
        id: 'f86b1061-de69-4c36-871f-31932b0ad239',
        name: 'Admin',
        paths: []
    }, {
        id: 'ed7aedf9-2941-458b-9460-d9ecdaefe4da',
        name: 'Registered',
        paths: ['/submit-report']
    }
]

const initialState = {
}

const basicAuth = getAuthHeaders('basic');

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'auth/signupResponse':
    case 'auth/loginResponse': {
        const data = action.payload.data
        return {
            ...state,
            user: data.username,
            token: data._kmd.authtoken
        }
    }
    case 'auth/getMeResponse': {
        const data = action.payload.data
        return {
            ...state,
            roles: data._kmd.roles.map((role: Role) => {
                return ROLES.find((r) => role.roleId === r.id)?.name
            })
        }
    }
    case 'auth/logoutResponse': {
        return {
            ...initialState
        }
    }
    default:
      return state
  }
}

const authUrl = `${import.meta.env.VITE_SERVER_URL}/user/${import.meta.env.VITE_APP_KEY}`;
// Thunk function
export function signup(user: User) {
    return async function signupThunk(dispatch, getState) {
        const response = await axios.post(authUrl, user, basicAuth)
        dispatch({ type: 'auth/signupResponse', payload: response })
    }
}

export function getMe(token:string) {
    const headers = getAuthHeaders("kinvey", token)
    return async function getMeThunk(dispatch, getState) {
        const response = await axios.get(`${authUrl}/_me`, headers)
        dispatch({ type: 'auth/getMeResponse', payload: response })
    }
}

export function login(user: User) {
    return async function loginThunk(dispatch, getState) {
        const response = await axios.post(`${authUrl}/login`, user, basicAuth)
        dispatch({ type: 'auth/loginResponse', payload: response })
    }
}

export function logout(token:string) {
    const headers = getAuthHeaders("kinvey", token)
    return async function loginThunk(dispatch, getState) {
        const response = await axios.post(`${authUrl}/_logout`, user, headers)
        dispatch({ type: 'auth/logoutResponse', payload: response })
    }
}