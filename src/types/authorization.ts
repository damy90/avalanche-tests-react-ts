import { UseMutationResult } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { ReactNode } from "react"

// export type AuthContext = {
//     user?: string
//     token?: string
//     signup: UseMutationResult<object, unknown, User>
//     login: UseMutationResult<object, unknown, User>
//     logout: UseMutationResult<AxiosResponse, unknown, void>
//     userHasRole(roleName:string) :  boolean;
// }

export type User = {
    username: string
    password: string,
    roles?: string[],
    token?: string
}

export type AuthProviderProps = {
    children: ReactNode
}

// grantDate
// : 
// "2023-05-26T14:16:42.406Z"
// grantedBy
// : 
// "kid_HyAg2VCSh"
// roleId
// : 
// "ed7aedf9-2941-458b-9460-d9ecdaefe4da"

export type Role = {
    grantDate: string,
    grantedBy: string,
    roleId: string
}