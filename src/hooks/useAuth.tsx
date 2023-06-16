import { useContext } from "react";
import { AuthContext } from "../types/authorization";
import { Context } from "../context/AuthContext";


export function useAuth() {
    return useContext(Context) as AuthContext;
}
