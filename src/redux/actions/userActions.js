import { putUpdateInfoUser } from "../../components/services/apiServices"

export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const UPDATE_USER = "UPDATE_USER"



export const putInfoUserAction = (data) => {
    return async (dispatch, payload) => {
        const resUpdate = await putUpdateInfoUser(data)

    }
}

export const putUpdateInfoUserRedux = (data) => {
    return ({
        type: UPDATE_USER,
        payload: data
    })
}