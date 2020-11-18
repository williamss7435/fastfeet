export function AddUser(user) {
    return {
        type: '@User/ADD_USER',
        payload: {
            user,
        },
    };
}

export function Logout() {
    return {
        type: '@User/LOGOUT',
    };
}
