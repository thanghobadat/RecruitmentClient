import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './change-password-user.module.scss'


function ChangePasswordUser() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();

    const [passwordNew, setPasswordNew] = useState('')
    const [passwordOld, setPasswordOld] = useState('')
    function validateConfirmPassword(value) {
        var confirm = document.getElementById("confirm");
        if (value === passwordNew) {
            confirm.classList.remove(styles["invalid"]);
            confirm.classList.add(styles["valid"]);
        } else {
            confirm.classList.remove(styles["valid"]);
            confirm.classList.add(styles["invalid"]);
        }
    }
    function validateMessage(value) {
        setPasswordNew(value)
        var letter = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var number = document.getElementById("number");
        var length = document.getElementById("length");
        var special = document.getElementById("special");
        var lowerCaseLetters = /[a-z]/g;
        if (value.match(lowerCaseLetters)) {
            letter.classList.remove(styles["invalid"]);
            letter.classList.add(styles["valid"]);
        } else {
            letter.classList.remove(styles["valid"]);
            letter.classList.add(styles["invalid"]);
        }

        var upperCaseLetters = /[A-Z]/g;
        if (value.match(upperCaseLetters)) {
            capital.classList.remove(styles["invalid"]);
            capital.classList.add(styles["valid"]);
        } else {
            capital.classList.remove(styles["valid"]);
            capital.classList.add(styles["invalid"]);
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (value.match(numbers)) {
            number.classList.remove(styles["invalid"]);
            number.classList.add(styles["valid"]);
        } else {
            number.classList.remove(styles["valid"]);
            number.classList.add(styles["invalid"]);
        }

        // Validate length
        if (value.length >= 8) {
            length.classList.remove(styles["invalid"]);
            length.classList.add(styles["valid"]);
        } else {
            length.classList.remove(styles["valid"]);
            length.classList.add(styles["invalid"]);
        }
        var specials = /[!@#$%^&*(),.?":{}|<>]/g;
        if (value.match(specials)) {
            special.classList.remove(styles["invalid"]);
            special.classList.add(styles["valid"]);
        } else {
            special.classList.remove(styles["valid"]);
            special.classList.add(styles["invalid"]);
        }
    }
    const onFinish = (values) => {
        const { oldPassword, newPassword } = values;
        changePassword(id, oldPassword, newPassword);
    };


    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };

    const changePassword = async (id, oldPassword, newPassword) => {
        if (oldPassword == newPassword) {
            message.error("M???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u c??")
        }
        else {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Users/ChangePasswordUser`,
                { userId: id,oldPassword: oldPassword,newPassword: newPassword },
                config
            );
            if (data.isSuccessed) {
                message.success('?????i m???t kh???u th??nh c??ng')
            }
            else {
                if(data.message == 'Incorrect password.'){
                    message.error('M???t kh???u kh??ng ch??nh x??c')
                }
                else{
                    message.error(data.message)
                }
            }
        }

    };

    function showErr() {
        document.getElementById("error").style.display = "block";
    }
    function hideErr() {
        document.getElementById("error").style.display = "none";

    }
    return (
        <>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>?????i m???t kh???u</h1>
                <Link className={styles.forgot} to='/'>Qu??n m???t kh???u?</Link>
                <Form
                    name='basic'
                    layout='vertical'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='off'
                >
                    <Form.Item
                        label='M???t kh???u c??'
                        name='oldPassword'
                        rules={[{ required: true, message: 'Vui l??ng nh???p tr?????ng n??y' }]}>
                        <Input.Password
                            placeholder='Nh???p m???t kh???u c??'
                        />
                    </Form.Item>
                    <Form.Item
                        label='M???t kh???u m???i'
                        name='newPassword'
                        rules={[{ required: true, message: 'Vui l??ng nh???p tr?????ng n??y' }]}>
                        <Input.Password
                            onFocus={() => showErr()}
                            onBlur={() => hideErr()}
                            onChange={(e) => validateMessage(e.target.value)}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                            title="M???t kh???u ph???i th??a m??n nh???ng ??i???u ki???n b??n d?????i"
                            placeholder='Nh???p m???t kh???u m???i'
                        />

                    </Form.Item>
                    <Form.Item
                        label='Nh???p l???i m???t kh???u m???i'
                        name='confirmPassword'
                        rules={[{ required: true, message: 'Vui l??ng nh???p tr?????ng n??y' }]}>
                        <Input.Password
                            onFocus={() => showErr()}
                            onBlur={() => hideErr()}
                            onChange={(e) => validateConfirmPassword(e.target.value)}
                            placeholder='Nh???p l???i m???t kh???u m???i'
                        />

                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                        <Button type='primary' htmlType='submit'>
                            Thay ?????i
                        </Button>
                    </Form.Item>
                </Form>
                <div className={styles.message} id="error">
                    <h3>M???t kh???u ph???i th??a m??n nh???ng ??i???u ki???n sau:</h3>
                    <p className={clsx(styles.letter, styles.invalid)} id="letter">Ch???a ??t nh???t m???t <b>ch??? th?????ng</b></p>
                    <p className={clsx(styles.capital, styles.invalid)} id="capital">Ch???a ??t nh???t m???t <b>ch??? hoa</b></p>
                    <p className={clsx(styles.number, styles.invalid)} id="number" >Ch???a ??t nh???t m???t <b>s???</b></p>
                    <p className={clsx(styles.length, styles.invalid)} id="length">Ch???a ??t nh???t <b>8 k?? t???</b></p>
                    <p className={clsx(styles.special, styles.invalid)} id="special">Ch???a ??t nh???t m???t <b>k?? t??? ?????c bi???t</b></p>
                    <p className={clsx(styles.confirm, styles.invalid)} id="confirm">X??c nh???n m???t kh???u ch??nh x??c</p>
                </div>
            </div>

        </>
    )
}


export default ChangePasswordUser