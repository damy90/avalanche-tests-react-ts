import { ReactNode, createContext, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { getAuthHeaders } from "../../utils/auth-headers"
import { TestDetails, TestsListContext } from "../types/reports"


type TestsListProviderProps = {
    children: ReactNode
}

export const Context = createContext<TestsListContext | null>(null)

export function TestsListProvider({children}: TestsListProviderProps) {
    const { user, token} = useAuth()
    const [ tests, setTests ] = useState<TestDetails[]>([])
    // function handleAuthenticated() {
    //     if (token == null || user == null) return
    //     getTests.mutate();

    // }

    // TODO: extract as services
    const getTests = useMutation({
        mutationFn: () => {
            return axios.get(`${import.meta.env.VITE_SERVER_URL}/api/tests/`)
                .then(res => {
                    return res.data
                })
        },
        onSuccess(data) {
            console.log(data)
            setTests([...tests, ...data])
        },
    })
    const postTest = useMutation({
        mutationFn: (data:TestDetails) => {
            const headers = getAuthHeaders(token)
            return axios.post(`${import.meta.env.VITE_SERVER_URL}/api/tests/`, data, headers)
                .then(res => {
                    return res.data
                })
        },
        onSuccess(data) {
            console.log(data)
            setTests([...tests, data])
        },
    })
    //useEffect((handleAuthenticated), [user, token])
    useEffect(getTests.mutate, [])
    return (
        <Context.Provider value={{getTests, postTest, tests}}>
            {children}
        </Context.Provider>
    )
}