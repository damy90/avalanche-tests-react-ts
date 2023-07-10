export const getAuthHeaders = (authToken?: string)=> {
    return {
        headers: {
            'Authorization': authToken,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }
}