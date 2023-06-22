import axios from "axios"
import { getAuthHeaders } from "../../../utils/auth-headers"


const initialState = {
    tests: []
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'tests/getTestsResponse': {
        const data = action.payload.data
        return {
            ...state,
            tests: data
        }
    }
    case 'tests/postTestResponse': {
        const data = action.payload.data
        return {
            ...state,
            tests: [...state.tests, data]
        }
    }
    default:
      return state
  }
}

const testsUrl = `${import.meta.env.VITE_SERVER_URL}/appdata/${import.meta.env.VITE_APP_KEY}/avalanche-tests/`;
// Thunk function
export async function getTests(dispatch, getState) {
    const token = getState().auth.token
    const headers = getAuthHeaders("kinvey", token)
    const response = await axios.get(testsUrl, headers)
    dispatch({ type: 'tests/getTestsResponse', payload: response })
}

export function postTest(test) {
    
    return async function postTestThunk(dispatch, getState) {
        const token = getState().userData.token
        const headers = getAuthHeaders("kinvey", token)
        const response = await axios.post(testsUrl, test, headers)
        dispatch({ type: 'tests/postTestResponse', payload: response })
    }
}