import { useContext } from "react";
import { AuthContext } from "../types/authorization";
import { Context } from "../context/AuthContext";


export function useLoggedInAuth() {
    return useContext(Context) as AuthContext &
        Required<Pick<AuthContext, "user">>;
}
