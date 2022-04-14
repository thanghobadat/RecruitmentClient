import styles from './login.module.scss'
import { FaUserAlt } from "react-icons/fa";
import { IoKey } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';

function Login() {

    const [formValue, setFormValue] = useState({
        userName: '',
        password: '',
        rememberMe: true
    })
    function handleOnChange(e) {
        if (e.target) {
            setFormValue({
                ...formValue, [e.target.name]: e.target.value
            })
        }
        else {
            setFormValue(...formValue)
        }
    }
    const  submit = async() => {
        console.log(formValue)
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Accounts/Authenticate`,
            { userName: formValue.userName, password: formValue.password, rememberMe: true },
            config
        );
        if (data.isSuccessed) {
            message.success('cập nhật thành công')
            localStorage.setItem('user', JSON.stringify(data.resultObj))
        }
        else {
            message.error(data.message)
        }
    }
    return (
        <div className={styles.cover}>
            <div className={styles.wrapper}>
                <div className={styles.login}>
                    <p className={styles.title}>Đăng nhập</p>
                    <input type="text"
                        placeholder="Tài khoản"

                        name='userName'
                        onChange={(e) => { handleOnChange(e) }} />

                    <FaUserAlt className={styles.iconUser} />
                    <input type="password" placeholder="Mật khẩu"
                        name='password'
                        onChange={(e) => { handleOnChange(e) }} />
                    <IoKey className={styles.iconUser} />
                    <a href="#">Quên mật khẩu?</a>
                    <button onClick={() => submit()}>
                        <i class="spinner"></i>
                        <span className={styles.state}>Đăng nhập</span>
                    </button>
                </div>
                <footer>bạn không có tài khoản? <a target="blank" href="http://boudra.me/">Đăng ký tại đây</a></footer>

            </div >
        </div>
    )
}

export default Login