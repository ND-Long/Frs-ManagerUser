import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../services/apiServices';

function DeleteUser(props) {
    const { show, setShow, fetchAllUsers, inforView, setInforView } = props
    const [name, setName] = useState("")
    const [age, setAge] = useState('')
    const [gender, setgender] = useState('')
    const [phone, setPhone] = useState('')
    const [job, setJob] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')


    const handleClose = () => {
        setShow(false);
        setName('')
        setAge('')
        setgender('')
        setPhone('')
        setPrice('')
        setImage('')
        setPreviewImage('')
        setInforView('')
    }

    useEffect(() => {
        setName(inforView.name)
        setAge(inforView.age)
        setgender(inforView.gender)
        setPhone(inforView.phone)
        setJob(inforView.job)
        setPrice(inforView.price)
        setPreviewImage(inforView.image)
    }, [inforView])


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>
                        <div className="row" id='form'>
                            <div className="col-md-6">
                                <label>Tên</label>
                                <input type="text" className="form-control mb-4" placeholder="Tên..."
                                    value={name}
                                    disabled
                                />
                            </div>
                            <div className="col-md-3">
                                <label >Tuổi</label>
                                <input type="number" className="form-control mb-4" placeholder="Tuổi..."
                                    value={age}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Giới tính</label>
                                <select className="form-control mb-4"
                                    value={gender}
                                    disabled
                                >    <option>Khác</option>
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label >SĐT</label>
                                <input type="number" className="form-control mb-4" placeholder="Số điện thoại..."
                                    value={phone}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Công việc</label>
                                <select className="form-control mb-4"
                                    value={job}
                                    disabled
                                >    <option>Khác</option>
                                    <option>Gia sư</option>
                                    <option>Trông trẻ</option>
                                    <option>Giúp việc</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Nghìn đồng/giờ</label>
                                <input type="number" className="form-control"
                                    value={price}
                                    disabled
                                />
                            </div>
                            <label >  Ảnh đại diện:</label>
                            <div className='preview-image'>

                                {previewImage ?
                                    < img className='image-preview' src={previewImage} />
                                    :
                                    <span >Preview Image</span>
                                }
                            </div>


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteUser;