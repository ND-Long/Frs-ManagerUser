import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../services/apiServices';

function DeleteUser(props) {
    const { show, setShow, fetchAllUsers, inforDelete } = props

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {

    }, [inforDelete])



    const handleDeleteUser = async () => {
        const resDeleteUser = await deleteUser(inforDelete.id)
        if (resDeleteUser) {
            fetchAllUsers()
            toast.success(`Xoá nhân viên thành công`)
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
                    <Modal.Title>Xoá nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Xác nhận xoá nhân viên:</span><br />
                    <span>Tên: <b>{inforDelete.name}</b> </span> - <span>SĐT: <b>{inforDelete.phone}</b></span>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleDeleteUser()}
                    >Lưu</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteUser;