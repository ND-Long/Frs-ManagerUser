import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../services/apiServices';
import catGuest from "../../../assets/catGuest.jpg"

function ViewProduct(props) {
    const { show, setShow, fetchAllUsers, inforView, setInforView } = props
    const [type, setType] = useState('')
    const [color, setColor] = useState('')
    const [gender, setgender] = useState('Chưa rõ')
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
    console.log(inforView)

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

    useEffect(() => {
        setType(inforView.type)
        setColor(inforView.color)
        setgender(inforView.gender)
        setAge(inforView.age)
        setCharacteristic(inforView.characteristic)
        setSource(inforView.source)
        setPrice(inforView.price)
        setImage1(inforView.image1)
        setImage2(inforView.image2)
        setImage3(inforView.image3)
        setPreviewImage1(inforView.image1)
        setPreviewImage2(inforView.image2)
        setPreviewImage3(inforView.image3)
    }, [inforView])


    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
                className='mt-5'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin thú cưng</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>
                        <div className="row" id='form'>
                            <div className="col-md-3">
                                <label>Giống</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
                                    disabled
                                    value={type}
                                ></textarea>
                            </div>
                            <div className="col-md-3">
                                <label >Màu sắc</label>
                                <input type="text" className="form-control mb-4" placeholder="Màu..." disabled
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Giới tính</label>
                                <select className="form-control mb-4"
                                    disabled
                                    value={gender}
                                    onChange={e => setgender(e.target.value)}
                                >    <option>Chưa rõ</option>
                                    <option>Đực</option>
                                    <option>Cái</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label >Tuổi</label>
                                <input type="text" className="form-control mb-4" placeholder="Tuổi..."
                                    disabled
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Đặc điểm</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
                                    disabled
                                    value={characteristic}
                                ></textarea>
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label>Nguồn gốc</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"
                                    disabled
                                    value={source}
                                >
                                </textarea>
                            </div>
                            <div className="form-group col-md-3 mb-3">
                                <label>Giá</label>
                                <input type="number" className="form-control"
                                    disabled
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Ảnh</label>
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
                                        <div className='list-image-preview mx-1'>
                                            < img className='image-preview' src={catGuest} />
                                        </div>
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

export default ViewProduct;