export const getAuthHeaders = (type: string, authToken?: string)=> {
    const authHeader:string = type === 'basic'
    ?  'Basic ' + btoa(import.meta.env.VITE_APP_KEY + ':' + import.meta.env.VITE_APP_SECRET)
    :  'Kinvey ' + authToken;

    return {
        headers: {
            'Authorization': authHeader,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    }
}