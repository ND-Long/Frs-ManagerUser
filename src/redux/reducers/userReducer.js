import { USER_LOGIN, USER_LOGOUT } from "../actions/userActions";


const INITIAL_STATE = {
    user: {
        username: "",
        role: "",
        auth: false
    }
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case USER_LOGIN:

            return {
                ...state,
                user: {
                    username: action.user.username,
                    role: action.user.role,
                    auth: true
                }
            };

        case USER_LOGOUT:
            return {
                ...state,
                user: {
                    username: "",
                    role: "",
                    auth: false
                }

            };

        default: return state;

    }

};

export default userReducer;