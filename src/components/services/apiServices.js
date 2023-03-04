import axios from "../../utils/customAxios"

const getAllUsers = () => {
    return axios.get('/api/v1/users')
}
const postCreateUser = (name, age, gender, phone, job, price, image) => {
    return axios.post('/api/v1/users', { name, age, gender, phone, job, price, image })
}

const putUpdateUser = (id, name, age, gender, phone, job, price, image) => {
    return axios.put(`/api/v1/users/${id}`, { name, age, gender, phone, job, price, image })
}

const deleteUser = (id) => {
    return axios.delete(`/api/v1/users/${id}`)
}



export {
    getAllUsers, postCreateUser, putUpdateUser,
    deleteUser
}