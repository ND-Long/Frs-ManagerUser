import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../services/apiServices';

function DeleteProduct(props) {
    const { show, setShow, fetchAllUsers, inforDelete } = props


    console.log(inforDelete)
    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {

    }, [inforDelete])



    const handleDeleteProduct = async () => {
        const resDeleteProduct = await deleteUser(inforDelete.id)
        if (resDeleteProduct) {
            fetchAllUsers()
            toast.success(`Xoá thú cưng thành công`)
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
                className='mt-5'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bạn có chắc muốn xoá thú cưng?</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div >
                        <p>Giống: <b>{inforDelete.type}</b> </p>
                        <p>Màu: <b>{inforDelete.color}</b></p>
                        <p >Giá: <b>{inforDelete.price}</b></p>
                    </div>
                    <div className='image-delete mt-3' >
                        {
                            inforDelete.image1 ?
                                <div className='image-show-delete'>  <img src={inforDelete.image1} /></div> :
                                <></>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleDeleteProduct()}
                    >Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteProduct;