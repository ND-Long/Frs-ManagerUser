import "./Admin.scss"
import { useEffect, useState } from "react"
import { getAllUsers } from "../services/apiServices"
import AddNewUser from "./Modal/AddNewUser"
import UpdateUser from "./Modal/UpdateUser"
import DeleteUser from "./Modal/DeleteUser"
import ViewUser from "./Modal/ViewUser"
import { FaEye } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import { RiDeleteBinFill } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';

function Admin(props) {
    const [listUsers, setListUsers] = useState([])
    const [showAddNew, setShowAddNew] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [inforUpdate, setInforUpdate] = useState({})
    const [showDelete, setShowDelete] = useState(false)
    const [inforDelete, setinforDelete] = useState({})
    const [showView, setShowView] = useState(false)
    const [inforView, setInforView] = useState({})



    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = async () => {
        const resAllUsers = await getAllUsers()

        setListUsers(resAllUsers)
    }

    const handleShowAddNew = () => {
        setShowAddNew(true)
    }

    const handleShowUpdate = (id, name, age, gender, phone, job, price, image) => {
        setInforUpdate({ id, name, age, gender, phone, job, price, image })
        setShowUpdate(true)
    }

    const handleShowDelete = (id, name, age, gender, phone, job, price, image) => {
        setinforDelete({ id, name, age, gender, phone, job, price, image })
        setShowDelete(true)
    }

    const handleShowView = (id, name, age, gender, phone, job, price, image) => {
        setInforView({ id, name, age, gender, phone, job, price, image })
        setShowView(true)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 20) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const [itemOffset, setItemOffset] = useState(0);





    return (
        <div className="adminPage container">
            <div className="admin-header mt-3 d-flex justify-content-between">
                <div className="listUser-header">
                    <h4>Danh sách nhân viên</h4>
                </div>

                <div className="button-header">
                    <button className="btn btn-warning mx-2">Nhập file</button>
                    <button className="btn btn-primary mx-2">Xuất file</button>
                    <button className="btn btn-success mx-2" onClick={() => handleShowAddNew()}>Thêm mới</button>
                </div>
            </div>
            <div className=" col-md-6 mt-3">
                <div className="input-group mb-3">
                    <input type="text" className="search-user-email form-control" placeholder="Tìm kiếm theo email..." aria-label="Username" aria-describedby="basic-addon1" />
                </div>
            </div>
            <div className="admin-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Tuổi</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Nghìn đồng/giờ</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>

                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.price}</td>
                                    <td className="button-control">
                                        <FaEye className="button view mx-1"
                                            onClick={() => handleShowView(user.id, user.name, user.age, user.gender, user.phone, user.job, user.price, user.image)} />
                                        <BsPencilFill className="button update mx-1" onClick={() => handleShowUpdate(user.id, user.name, user.age, user.gender, user.phone, user.job, user.price, user.image)} />
                                        <RiDeleteBinFill className="button delete mx-1" onClick={() => handleShowDelete(user.id, user.name, user.age, user.gender, user.phone, user.job, user.price)} />
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={20}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={5}
                />
            </div>
            <AddNewUser
                show={showAddNew}
                setShow={setShowAddNew}
                fetchAllUsers={fetchAllUsers}
            />

            <UpdateUser
                show={showUpdate}
                setShow={setShowUpdate}
                fetchAllUsers={fetchAllUsers}
                inforUpdate={inforUpdate}
                setInforUpdate={setInforUpdate}
            />

            <DeleteUser
                show={showDelete}
                setShow={setShowDelete}
                fetchAllUsers={fetchAllUsers}
                inforDelete={inforDelete}

            />

            <ViewUser
                show={showView}
                setShow={setShowView}
                fetchAllUsers={fetchAllUsers}
                inforView={inforView}
                setInforView={setInforView}
            />
        </div>
    );
}

export default Admin;