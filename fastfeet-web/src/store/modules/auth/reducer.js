import produce from 'immer';

const INITIAL_STATE = {
    token: null,
    name: null,
    email: null
}

export default function Auth(state = INITIAL_STATE, action){
    return produce(state, draftState => {
        
        switch (action.type) {
            case '@Auth/ADD_AUTH':
                draftState.token = action.payload.auth.token;
                draftState.name = action.payload.auth.name;
                draftState.email = action.payload.auth.email;
                break;
            case '@Auth/LOGOUT':
                draftState.token = null;
                draftState.name = null;
                draftState.email = null;
                break;
            default:
                break;
        }
    ;

    });
}