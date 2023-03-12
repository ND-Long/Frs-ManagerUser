import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { getDistrict, getProvince, getWard, putUpdateInfoUser } from '../services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { putInfoUserAction, putUpdateInfoUserRedux } from '../../redux/actions/userActions';

const noneOptions = {
    value: "Chưa chọn",
    label: "Chưa chọn"
}

function UserProfile(props) {
    const inforUser = useSelector(state => state.account.user)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState('')
    const [address, setAddress] = useState('')
    const [ward, setWArd] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [optionsWard, setOptionsWArd] = useState('')
    const [optionsDistrict, setOptionsDistrict] = useState('')
    const [optionsProvince, setOptionsProvince] = useState('')
    const [isDisabledDistrict, setIsDisabledDistrict] = useState(true)
    const [isDisabledWard, setIsDisabledWard] = useState(true)




    useEffect(() => {
        fetchProvince()
        setDefaultInfo()
    }, [])

    const setDefaultInfo = () => {
        setName(inforUser.name)
        setUsername(inforUser.username)
        setPhone(inforUser.phone)
        setBirthday(inforUser.birthday)
        setAddress(inforUser.address)
        setWArd(inforUser.ward)
        setDistrict(inforUser.district)
        setProvince(inforUser.province)
    }


    const dispatch = useDispatch()

    const fetchProvince = async () => {
        let options = [];
        try {
            const resProvince = await getProvince()
            resProvince.map((item) => {
                options.push({
                    value: item.name,
                    label: item.name,
                    code: item.code,
                    codename: item.codename,
                    district: item.district,
                    division_type: item.division_type,
                    name: item.name,
                    phone_code: item.phone_code
                })
            })
            setOptionsProvince(options)
        } catch (error) {
            toast.error("Máy chủ lỗi!")
        }
    }

    const handleChooseProvince = async (type, value) => {
        try {
            let options = [{
                value: "",
                label: ""
            }];

            switch (type) {
                case "PROVINCE":
                    setOptionsDistrict('')
                    setOptionsWArd('')
                    setDistrict('')
                    setWArd('')
                    setIsDisabledDistrict(false)

                    try {

                        const resDistrict = await getDistrict(value.code)
                        resDistrict.districts.map((item) => {
                            options.push({
                                value: item.name,
                                label: item.name,
                                code: item.code,
                                codename: item.codename,
                                district: item.district,
                                division_type: item.division_type,
                                name: item.name,
                                phone_code: item.phone_code
                            })
                        })
                        setOptionsDistrict(options)
                        setProvince(value.value)
                    } catch (error) {
                        toast.error("Máy chủ lỗi!")
                    }
                    break;
                case "DISTRICT":
                    setIsDisabledWard(false)
                    setOptionsWArd('')
                    setWArd('')
                    try {
                        setOptionsWArd(options)
                        setDistrict(value.value)
                        const resWard = await getWard(value.code)
                        resWard.wards.map((item) => {
                            options.push({
                                value: item.name,
                                label: item.name,
                                code: item.code,
                                codename: item.codename,
                                ward: item.ward,
                                division_type: item.division_type,
                                name: item.name,
                                phone_code: item.phone_code
                            })
                        })
                        setOptionsWArd(options)
                        setDistrict(value.value)
                    } catch (error) {
                        toast.error("Máy chủ lỗi!")
                    }
                    break;
                case "WARD":
                    if (province && district) {
                        setWArd(value.value)
                    }
                    break;

                default:
                    toast.error("Máy chủ lỗi!")
            }
        } catch (error) {
            toast.error("Máy chủ lỗi!")
        }
    }

    const handleUpdateInfoUser = async () => {
        try {
            const resUpdate = await putUpdateInfoUser(inforUser.id, username, inforUser.role, inforUser.password, name, phone, birthday, address, province, district, ward, inforUser.listCart)
            // dispatch(putInfoUserAction(inforUser.id, username, inforUser.role, inforUser.password, name, phone, birthday, address, province, district, ward, inforUser.listCart))
            dispatch(putUpdateInfoUserRedux(resUpdate))


            toast.success("Cập nhật thông tin thành công!")
        } catch (error) {
            toast.error("Lỗi máy chủ!")
        }

    }
    return (
        <div className='user-profile'>
            <h5>Thông tin cá nhân</h5>
            <form>
                <div className="form-group pb-3">
                    <label htmlFor="exampleInputEmail1">Tài khoản</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled
                        value={username}
                    />

                </div>
                <div className="form-group  pb-3">
                    <label htmlFor="exampleInputname">Họ và tên</label>
                    <input type="text" className="form-control" id="exampleInputname" placeholder="Họ và tên"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group  pb-3">
                    <label htmlFor="exampleInputPhone">Số điện thoại</label>
                    <input type="number" className="form-control" id="exampleInputPhone" placeholder="Số điện thoại"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group  pb-3">
                    <label htmlFor="exampleInputBirthday">Ngày sinh</label>
                    <input type="date" className="form-control" id="exampleInputBirthday" placeholder="Ngày sinh"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                    />
                </div>

                <div className="row pb-3">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="inputState">Thành phố/Tỉnh</label>
                        <Select
                            placeholder={
                                province ?
                                    <>{province}</>
                                    :
                                    <div>TP/Tỉnh</div>
                            }
                            onChange={e => handleChooseProvince("PROVINCE", e)}
                            options={optionsProvince}
                            defaultValue={inforUser.province ? { value: inforUser.province, label: inforUser.province } : noneOptions}
                            value={{ label: province }}
                        />
                    </div>
                    <div className=" col-md-4 mb-3">
                        <label htmlFor="inputState">Quận/Huyện</label>
                        <Select
                            placeholder={
                                district ?
                                    <>{district}</>
                                    :
                                    <div>Quận/Huyện</div>
                            }
                            onChange={e => handleChooseProvince("DISTRICT", e)}
                            options={optionsDistrict}
                            defaultValue={inforUser.district ? { value: inforUser.district, label: inforUser.district } : noneOptions}
                            isDisabled={isDisabledDistrict}
                            value={{ label: district }}
                        />
                    </div>
                    <div className=" col-md-4 mb-3" disabled>
                        <label htmlFor="inputState">Phường/xã</label>
                        <Select
                            placeholder={
                                ward ?
                                    <>{ward}</>
                                    :
                                    <div>Phường/xã</div>
                            }
                            onChange={e => handleChooseProvince("WARD", e)}
                            options={optionsWard}
                            defaultValue={inforUser.ward ? { value: inforUser.ward, label: inforUser.ward } : noneOptions}
                            isDisabled={isDisabledWard}
                            value={{ label: ward }}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="inputAddress">Địa chỉ</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Địa chỉ"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>


                </div>

                <button type="button" className="btn btn-success me-2 mb-2" onClick={handleUpdateInfoUser}>Cập nhật tài khoản</button>
                <button type="button" className="btn btn-secondary mb-2" onClick={setDefaultInfo}>Huỷ thay đổi</button>
            </form>
        </div>
    );
}

export default UserProfile;