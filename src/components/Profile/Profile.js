import React from 'react';
import { useDispatch } from 'react-redux';
import { USER_LOGOUT } from '../../redux/actions/userActions';

function Profile(props) {
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch({
            type: USER_LOGOUT
        })
    }
    return (
        <div className='profile-page pt-3 container'>
            <div>Demo Profile</div>
            <button className='btn btn-dark' onClick={handleLogOut}>Đăng xuất</button>
        </div>
    );
}

export default Profile;