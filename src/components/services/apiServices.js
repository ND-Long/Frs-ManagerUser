import axios from "../../utils/customAxios"

const getAllUsers = () => {
    return axios.get('/products')
}

const getUserLimit = (limit, page) => {
    return axios.get(`/products?_limit=${limit}&_page=${page}`)
}

const postCreateProduct = (type, color, gender, age, characteristic, source, price, image1, image2, image3) => {
    return axios.post('/products', { type, color, gender, age, characteristic, source, price, image1, image2, image3 })
}

const putUpdateProduct = (id, type, color, gender, age, characteristic, source, price, image1, image2, image3) => {
    return axios.put(`/products/${id}`, { type, color, gender, age, characteristic, source, price, image1, image2, image3 })
}

const deleteUser = (id) => {
    return axios.delete(`/products/${id}`)
}

const apiLogin = () => {
    return axios.get(`/users`)
}

const apiSignup = (username, password) => {
    return axios.post(`/users`, { username, password })
}



export {
    getAllUsers, postCreateProduct, putUpdateProduct,
    deleteUser, getUserLimit, apiLogin, apiSignup
}