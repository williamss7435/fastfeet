
export function AddAuth(auth){
    return {
        type: '@Auth/ADD_AUTH',
        payload: {
            auth,
        }
    }
}

export function Logout(){
    return {
        type: '@Auth/LOGOUT',
    }
}