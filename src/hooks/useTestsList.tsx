import { useContext } from "react";
import { TestsListContext } from "../types/reports";
import { Context } from "../context/TestsListContext";


export function useTestsList(): TestsListContext {
    return useContext(Context) as TestsListContext;
}
