import produce from 'immer';
const INITIAL_STATE = {
    logged: false,
    id: -1,
    name: '',
    initialsName: '',
    email: '',
    photo_url: null,
    created_at_formatted: '',
};

export default function User(state = INITIAL_STATE, action) {
    return produce(state, (draftState) => {
        switch (action.type) {
            case '@User/ADD_USER':
                draftState.logged = true;
                draftState.name = action.payload.user.name;
                draftState.id = action.payload.user.id;
                draftState.email = action.payload.user.email;
                draftState.initialsName = action.payload.user.initialsName;
                draftState.photo_url = action.payload.user.photo_url;
                draftState.created_at_formatted =
                    action.payload.user.created_at_formatted;
                break;
            case '@User/LOGOUT':
                draftState.logged = false;
                draftState.name = '';
                draftState.id = -1;
                draftState.email = '';
                draftState.initialsName = '';
                draftState.photo_url = null;
                draftState.created_at_formatted = '';
                break;
            default:
                break;
        }
    });
}
