import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateProduct } from '../../services/apiServices';
import { toast } from 'react-toastify';
import "./Modal.scss"

function UpdateProduct(props) {
    const { show, setShow, fetchAllUsers, inforUpdate, setInforUpdate } = props
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
        setInforUpdate('')
    }

    useEffect(() => {
        setType(inforUpdate.type)
        setColor(inforUpdate.color)
        setgender(inforUpdate.gender)
        setAge(inforUpdate.age)
        setCharacteristic(inforUpdate.characteristic)
        setSource(inforUpdate.source)
        setPrice(inforUpdate.price)
        setImage1(inforUpdate.image1)
        setImage2(inforUpdate.image2)
        setImage3(inforUpdate.image3)
        setPreviewImage1(inforUpdate.image1)
        setPreviewImage2(inforUpdate.image2)
        setPreviewImage3(inforUpdate.image3)
    }, [inforUpdate])



    const handleUpdateProduct = async () => {
        const resUpdateuser = await putUpdateProduct(inforUpdate.id, type, color, gender, age, characteristic, source, price, image1, image2, image3)
        if (resUpdateuser) {
            fetchAllUsers()
            toast.success("C???p nh???t th??ng tin th??nh c??ng!")
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
                className='p-4 mt-4'
            >
                <Modal.Header closeButton>
                    <Modal.Title>S???a th??ng tin th?? c??ng</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form>
                        <div className="row" id='form'>
                            <div className="col-md-3">
                                <label>Gi???ng</label>
                                <input type="text" className="form-control mb-4" placeholder="Gi???ng..."
                                    value={type}
                                    onChange={e => setType(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label >M??u s???c</label>
                                <input type="text" className="form-control mb-4" placeholder="M??u..."
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >Gi???i t??nh</label>
                                <select className="form-control mb-4"
                                    value={gender}
                                    onChange={e => setgender(e.target.value)}
                                >    <option></option>
                                    <option>?????c</option>
                                    <option>C??i</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label >Tu???i</label>
                                <input type="text" className="form-control mb-4" placeholder="Tu???i..."
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >?????c ??i???m</label>
                                <textarea type="text" className="form-control" rows='1'
                                    placeholder='?????c ??...'
                                    value={characteristic}
                                    onChange={e => setCharacteristic(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6 mb-3">
                                <label>Ngu???n g???c</label>
                                <textarea type="text" className="form-control" rows='1'
                                    placeholder='Ngu???n g???c...'
                                    value={source}
                                    onChange={e => setSource(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3 mb-3">
                                <label>Gi??</label>
                                <input type="number" className="form-control"
                                    placeholder='Gi??'
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label >???nh 1</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ???nh 1...'
                                        value={image1}
                                        onChange={e => {
                                            setImage1(e.target.value)
                                            setPreviewImage1(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label >???nh 2</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ???nh 1...'
                                        value={image2}
                                        onChange={e => {
                                            setImage2(e.target.value)
                                            setPreviewImage2(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <label >???nh 3</label>
                                <div className='input-image1' >
                                    <input type="text" className=" form-control col-md-12" placeholder='Link ???nh 1...'
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
                        ????ng
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleUpdateProduct()}
                    >L??u</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateProduct;