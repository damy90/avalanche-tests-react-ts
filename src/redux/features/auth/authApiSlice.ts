
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { userApi } from './userApi';
import { IGenericResponse } from '../../../types/generalTypes';
import authSlice, { setUser, setRoles } from './authSlice';
import { getAuthHeaders } from '../../../../utils/auth-headers';
import { Role, User } from '../../../types/authorization';

type LoginInput = {
    username: string,
    password: string
}

type RegisterInput = {
    email: string,
    password: string
}

type LoginResponse = {
    username: string;
    token: string;
    roles: string[];
}

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

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/auth`,
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<IGenericResponse, RegisterInput>({
            query(data) {
                return {
                    url: 'signup',
                    method: 'POST',
                    body: data,
                };
            },
        }),
        loginUser: builder.mutation<LoginResponse, LoginInput>({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                    //credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    let roles:string[] = [];
                    if (data.roles)
                        roles = data.roles.map((roleId: string) => {
                            return ROLES.find((r) => roleId === r.id)?.name
                        });
                    dispatch(setUser({ user: data.username, token: data.token }));
                    dispatch(setRoles(roles));
                } catch (error) { }
            },
        }),
        logoutUser: builder.mutation<void, void>({
            query(data) {
                return {
                    url: '_logout',
                    method: 'POST',
                    body: data,
                    //credentials: 'include',
                };
            },
        }),

        // getMe: builder.query<string[], string>({
        //     query(token) {
        //         return {
        //             url: `/_me`,
        //             headers: getAuthHeaders('kinvey', token).headers,
        //         };
        //     },
        //     transformResponse: (data: any) => {
        //         if (data._kmd.roles)
        //             return data._kmd.roles.map((role: Role) => {
        //                 return ROLES.find((r) => role.roleId === r.id)?.name
        //             })
        //     },
        //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled;
        //             dispatch(setRoles(data));
        //         } catch (error) { }
        //     },
        // }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    //useGetMeQuery,
} = authApi;

