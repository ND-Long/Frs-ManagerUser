import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../../redux/actions/userActions';
import './Profile.scss'
import UserProfile from './UserProfile';

function Profile(props) {
    const isAuthenticated = useSelector(state => state.account.user.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isActiveUser, setIsActiveUser] = useState(true)
    const [selected, setSelected] = useState(1);

    const handleClick = (divNum) => () => {
        setSelected(divNum);
    };
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [])

    const handleLogOut = () => {
        dispatch({
            type: USER_LOGOUT
        })
        navigate('/login')
    }
    return (
        <div className='profile-page p-4 '>
            <div className='colum-info'>
                <div className={`btn btn-white text-left ${selected == 1 ? "active" : ""}`} onClick={handleClick(1)}>Thông tin cá nhân</div>
                <div className={`btn btn-white text-left ${selected == 2 ? "active" : ""}`} onClick={handleClick(2)}>Danh sách đơn hàng</div>
                <div className={`btn btn-white text-left ${selected == 3 ? "active" : ""}`} onClick={handleClick(3)}>Đánh giá</div>
                <div className={`btn btn-white text-left ${selected == 4 ? "active" : ""}`} onClick={handleClick(4)}>Ví voucher</div>
                <div className='btn btn-white text-left' onClick={handleLogOut}>Thoát</div>
            </div>
            <div className='colum-detail'>
                {
                    selected === 1 ?
                        <UserProfile /> :
                        <></>
                }
            </div>
        </div>
    );
}

export default Profile;