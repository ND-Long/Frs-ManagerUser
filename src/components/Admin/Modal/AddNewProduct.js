import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateProduct } from '../../services/apiServices';
import catGuest from "../../../assets/catGuest.jpg"
function AddNewProduct(props) {
    const { show, setShow, fetchAllUsers } = props
    const handleClose = () => {
        setShow(false);
        setType('')
        setColor('')
        setgender('')
        setAge('')
        setCharacteristic('')
        setSource('')
        setPrice('')
        setImage1('')
        setImage2('')
        setImage3('')
        setPreviewImage1('')
        setPreviewImage2('')
        setPreviewImage3('')

    }

    const [type, setType] = useState('')
    const [color, setColor] = useState('')
    const [gender, setgender] = useState('')
    const [age, setAge] = useState('')
    const [characteristic, setCharacteristic] = useState('')
    const [source, setSource] = useState("")
    const [price, setPrice] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [previewImage1, setPreviewImage1] = useState('')
    const [previewImage2, setPreviewImage2] = useState('')
    const [previewImage3, setPreviewImage3] = useState('')

    const handleAddProduct = async () => {
        // if (!name || !phone || !price) {

        // }

        const resCreateuser = await postCreateProduct(type, color, gender, age, characteristic, source, price, image1, image2, image3)
        fetchAllUsers()

        if (resCreateuser) {
            toast.success("Thêm mới thú cưng thành công!")
        }

        handleClose()
    }


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                className='p-4 mt-4'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm thú cưng</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>
                        <div className="row" id='form'>
                            <div className="col-md-3">
                                <label>Giống</label>
                                <input type="text" className="form-control mb-4" placeholder="Giống..."
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label >Màu sắc</label>
                                <input type="text" className="form-control mb-4" placeholder="Màu..."
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Giới tính</label>
                                <select className="form-control mb-4"
                                    value={gender}
                                    onChange={e => setgender(e.target.value)}
                                >    <option></option>
                                    <option>Đực</option>
                                    <option>Cái</option>
                                </select>
                            </div>
                            {/* <div className="form-group col-md-3">
                                <label >Mã số</label>
                                <input type="text" className="form-control mb-4" placeholder="Tuổi..."
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </div> */}
                            {/* <div className="form-group col-md-3">
                                <label >Đặc điểm</label>
                                <textarea type="text" className="form-control" rows='1'
                                    placeholder='Đặc đ...'
                                    value={characteristic}
                                    onChange={e => setCharacteristic(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label>Nguồn gốc</label>
                                <textarea type="text" className="form-control" rows='1'
                                    placeholder='Nguồn gốc...'
                                    value={source}
                                    onChange={e => setSource(e.target.value)}
                                />
                            </div> */}
                            <div className="form-group col-md-3 mb-3">
                                <label>Giá</label>
                                <input type="number" className="form-control"
                                    placeholder='Giá'
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh 1</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ảnh 1...'
                                        value={image1}
                                        onChange={e => {
                                            setImage1(e.target.value)
                                            setPreviewImage1(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh 2</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ảnh 1...'
                                        value={image2}
                                        onChange={e => {
                                            setImage2(e.target.value)
                                            setPreviewImage2(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh 3</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ảnh 1...'
                                        value={image3}
                                        onChange={e => {
                                            setImage3(e.target.value)
                                            setPreviewImage3(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>


                            <div className='preview-image'>
                                {
                                    previewImage1 || previewImage2 || previewImage3 ?
                                        <>
                                            {previewImage1 ?
                                                <div className='list-image-preview mx-1'>
                                                    < img className='image-preview' src={previewImage1} />
                                                </div>
                                                :
                                                <></>
                                            }
                                            {previewImage2 ?
                                                <div className='list-image-preview mx-1'>
                                                    < img className='image-preview' src={previewImage2} />
                                                </div> :
                                                <></>
                                            }
                                            {previewImage3 ?
                                                <div className='list-image-preview mx-1'>
                                                    < img className='image-preview' src={previewImage3} />
                                                </div>
                                                :
                                                <></>
                                            }</> :
                                        <span>Preview image</span>
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
                        onClick={() => handleAddProduct()}
                    >Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddNewProduct
