import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../../services/apiServices';
import { toast } from 'react-toastify';
import "./Modal.scss"

function UpdateUser(props) {
    const { show, setShow, fetchAllUsers, inforUpdate, setInforUpdate } = props
    const [name, setName] = useState("")
    const [age, setAge] = useState('')
    const [gender, setgender] = useState('')
    const [phone, setPhone] = useState('')
    const [job, setJob] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    console.log(inforUpdate)

    const handleClose = () => {
        setShow(false);
        setName('')
        setAge('')
        setgender('')
        setPhone('')
        setPrice('')
        setImage('')
        setPreviewImage('')
        setInforUpdate('')
    }

    useEffect(() => {
        setName(inforUpdate.name)
        setAge(inforUpdate.age)
        setgender(inforUpdate.gender)
        setPhone(inforUpdate.phone)
        setJob(inforUpdate.job)
        setPrice(inforUpdate.price)
        setImage(inforUpdate.image)
        setPreviewImage(inforUpdate.image)
    }, [inforUpdate])



    const handleUpdateUser = async () => {
        const resUpdateuser = await putUpdateUser(inforUpdate.id, name, age, gender, phone, job, price, image)
        if (resUpdateuser) {
            fetchAllUsers()
            toast.success("Cập nhật thông tin thành công!")
            handleClose()
        }
    }
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
                    <Modal.Title>Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>
                        <div className="row" id='form'>
                            <div className="col-md-6">
                                <label>Tên</label>
                                <input type="text" className="form-control mb-4" placeholder="Tên..."
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label >Tuổi</label>
                                <input type="number" className="form-control mb-4" placeholder="Tuổi..."
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Giới tính</label>
                                <select className="form-control mb-4"
                                    value={gender}
                                    onChange={e => setgender(e.target.value)}
                                >    <option>Khác</option>
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label >SĐT</label>
                                <input type="number" className="form-control mb-4" placeholder="Số điện thoại..."
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Công việc</label>
                                <select className="form-control mb-4"
                                    value={job}
                                    onChange={e => setJob(e.target.value)}
                                >    <option>Khác</option>
                                    <option>Gia sư</option>
                                    <option>Trông trẻ</option>
                                    <option>Giúp việc</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Nghìn đồng/giờ</label>
                                <input type="number" className="form-control mb-4"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label >  Ảnh đại diện:</label>
                                <div className='input-image' >
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ảnh đại diện'
                                        value={image}
                                        onChange={e => setImage(e.target.value)}
                                    />
                                </div>
                            </div>
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
                    <Button variant="primary"
                        onClick={() => handleUpdateUser()}
                    >Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUser;