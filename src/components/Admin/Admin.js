import "./Admin.scss"
import { useEffect, useState } from "react"
import { getAllProducts, getUserLimit } from "../services/apiServices"
import AddNewProduct from "./Modal/AddNewProduct"
import UpdateProduct from "./Modal/UpdateProduct"
import DeleteProduct from "./Modal/DeleteProduct"
import ViewProduct from "./Modal/ViewProduct"
import { FaEye } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import { RiDeleteBinFill } from 'react-icons/ri';
import { TbSearch } from 'react-icons/tb';
import { SiMicrosoftexcel } from 'react-icons/si';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import ReactPaginate from 'react-paginate';
import catGuest from "../../assets/catGuest.jpg"

function Admin(props) {
    const [listProducts, setListProducts] = useState([])
    const [listAllUsers, setListAllUsers] = useState([])
    const [showAddNew, setShowAddNew] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [inforUpdate, setInforUpdate] = useState({})
    const [showDelete, setShowDelete] = useState(false)
    const [inforDelete, setinforDelete] = useState({})
    const [showView, setShowView] = useState(false)
    const [inforView, setInforView] = useState({})
    const [limitUser, setLimitUser] = useState(5)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchAllUsers()

        window.scrollTo(0, 0)

    }, [page])

    const fetchAllUsers = async () => {
        const resLimitUser = await getUserLimit(limitUser, page)
        const resAllUsers = await getAllProducts()
        console.log(resLimitUser)
        setListProducts(resLimitUser)
        setListAllUsers(resAllUsers)
    }

    const handleShowAddNew = () => {
        setShowAddNew(true)
    }

    const handleShowUpdate = (id, type, color, gender, age, characteristic, source, price, image1, image2, image3) => {
        setInforUpdate({ id, type, color, gender, age, characteristic, source, price, image1, image2, image3 })
        setShowUpdate(true)
    }

    const handleShowDelete = (id, type, color, gender, age, characteristic, source, price, image1, image2, image3) => {
        setinforDelete({ id, type, color, gender, age, characteristic, source, price, image1, image2, image3 })
        setShowDelete(true)
    }

    const handleShowView = (id, type, color, gender, age, characteristic, source, price, image1, image2, image3) => {
        setInforView({ id, type, color, gender, age, characteristic, source, price, image1, image2, image3 })
        setShowView(true)
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1)
        console.log(
            event.selected
        );

    };






    return (
        <div className="adminPage container">
            <div className="admin-header mt-3 d-flex justify-content-between mt-5">
                <div className="col-md-4">
                    <div class="input-group mb-3 mt-5">
                        <input type="text" class="form-control" placeholder="Tìm kiếm..." />
                        <div class="input-group-prepend">
                            <span class="btn btn-primary" id="basic-addon1"><TbSearch /></span>
                        </div>
                    </div>
                </div>

                <div className="button-header mb-3">
                    {/* <button className="btn btn-warning ">Nhập</button>
                    <button className="btn btn-primary mx-1">Xuất</button> */}
                    <button className="btn btn-success ms-3" onClick={() => handleShowAddNew()}>Thêm</button>
                </div>
            </div>

            <div className="admin-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã số</th>
                            <th scope="col">Ảnh mô tả</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Tuổi</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProducts.map((product, index) => (
                                <tr key={product.id} className="align-middle">
                                    <th scope="row">{product.id}</th>
                                    <td>
                                        {
                                            product.image1 ?
                                                <img src={product.image1} style={{ height: "50px", borderRadius: "10px" }} /> :
                                                <>
                                                    {
                                                        product.image2 ?
                                                            <img src={product.image2} style={{ height: "50px", borderRadius: "10px" }} /> :
                                                            <>
                                                                {
                                                                    product.image3 ?
                                                                        <img src={product.image3} style={{ height: "50px", borderRadius: "10px" }} /> :

                                                                        <>
                                                                            <img src={catGuest} style={{ height: "50px", borderRadius: "10px" }} />
                                                                        </>
                                                                }
                                                            </>
                                                    }
                                                </>
                                        }
                                    </td>
                                    <td>
                                        {product.gender ?
                                            <>{product.gender}</> :
                                            <div style={{ fontSize: "13px", color: "gray" }}>Chưa rõ</div>
                                        }
                                    </td>
                                    <td>
                                        {product.age ?
                                            <>{product.age}</> :
                                            <div style={{ fontSize: "13px", color: "gray" }}>Chưa rõ</div>
                                        }
                                    </td>
                                    <td>{product.price}</td>
                                    <td className="button-control">
                                        <FaEye className="button view mx-1"
                                            onClick={() => handleShowView(product.id, product.type, product.color, product.gender, product.age, product.characteristic, product.source, product.price, product.image1, product.image2, product.image3)} />
                                        <BsPencilFill className="button update mx-1" onClick={() => handleShowUpdate(product.id, product.type, product.color, product.gender, product.age, product.characteristic, product.source, product.price, product.image1, product.image2, product.image3)} />
                                        <RiDeleteBinFill className="button delete mx-1" onClick={() => handleShowDelete(product.id, product.type, product.color, product.gender, product.age, product.characteristic, product.source, product.price, product.image1, product.image2, product.image3)} />
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>
                <div className="paginate-user" >
                    <ReactPaginate
                        previousLabel={<TbPlayerTrackPrevFilled />}
                        nextLabel={<TbPlayerTrackNextFilled />}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={listAllUsers.length / limitUser}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={0}
                    />
                </div>
            </div>
            <AddNewProduct
                show={showAddNew}
                setShow={setShowAddNew}
                fetchAllUsers={fetchAllUsers}
            />

            <UpdateProduct
                show={showUpdate}
                setShow={setShowUpdate}
                fetchAllUsers={fetchAllUsers}
                inforUpdate={inforUpdate}
                setInforUpdate={setInforUpdate}
            />

            <DeleteProduct
                show={showDelete}
                setShow={setShowDelete}
                fetchAllUsers={fetchAllUsers}
                inforDelete={inforDelete}

            />

            <ViewProduct
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