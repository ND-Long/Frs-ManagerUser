import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiLogin } from '../components/services/apiServices';
import "./Auth.scss"
import { useDispatch } from 'react-redux';
import { USER_LOGIN, USER_LOGOUT } from '../redux/actions/userActions';

var bcrypt = require('bcryptjs-react');

function Login() {
    const [dataAllUser, setDataAllUser] = useState([])
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const arrayHashPass = []
    const arrayHashUsername = []
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchAllUser()
    }, [])



    const fetchAllUser = async () => {
        const resAllUser = await apiLogin()
        setDataAllUser(resAllUser)
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validatePass = (pass) => {
        return pass.match(/^.{6,}$/)
    }

    const handleLogin = () => {

        if (!validateEmail(username)) {
            toast.error("Email không đúng định dạng")
            return
        }

        if (!validatePass(password)) {
            toast.error("Mật khẩu tối thiểu 6 ký tự")
            return
        }
        let checkLogin = 0
        dataAllUser.map((dataUser, index) => {

            //check hass password
            // const checkPass = bcrypt.compareSync(password, dataUser.password);
            // const checkUsername = bcrypt.compareSync(username, dataUser.username);

            if (password === dataUser.password && username === dataUser.username) {
                toast.success("Đăng nhập thành công!")

                checkLogin = 1;
                dispatch({
                    type: USER_LOGIN,
                    user: {
                        id: dataUser.id,
                        username: username,
                        password: dataUser.password,
                        name: dataUser.name,
                        phone: dataUser.phone,
                        birthday: dataUser.birthday,
                        address: dataUser.address,
                        province: dataUser.province,
                        district: dataUser.district,
                        ward: dataUser.ward,
                        role: dataUser.role,
                        listCart: dataUser.listCart
                    }
                })
                navigate("/")
            }
        })
        if (checkLogin === 0) {
            toast.error("Tài khoản hoặc mật khẩu sai!")
        }
    }

    return (
        <div className='login-page'>
            <div className="header">
                <div className="header-content">
                    <span
                    >Chưa có tài khoản?</span>
                    <button
                        className="btnSignup"
                        onClick={() => { navigate("/signup") }}
                    >
                        Đăng ký
                    </button>

                </div>
            </div>
            < div className="login-signup d-flex justify-content-center">

                <div className='login-table mt-5'>
                    <div className="title col-12 mx-auto">
                        <h3>PetShop</h3>
                    </div>
                    <div className="wellcome col-12 mx-auto">Xin chào, bạn là ai?</div>
                    <div className="content form-group col-10  mx-auto">
                        <label>Tài khoản  <span style={{ color: "white" }}>(admin@gmail.com)</span></label>
                        <input
                            type={"email"}
                            className="form-control"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        />
                        <label>Mật khẩu <span style={{ color: "white" }}>(password)</span></label>
                        <input
                            type={"password"}
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="forgotPass">
                            <span

                            >Quên mật khẩu?</span>
                        </div>
                        <button
                            className="btn btn-dark col-12"
                            onClick={() => handleLogin()}
                        >

                            <span

                            >Đăng nhập </span>
                        </button>
                        <div className="goToHomePage">

                            <span onClick={() => { navigate("/") }}

                            > &#60;&#60;&#60; Quay lại trang chủ</span>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default Login;