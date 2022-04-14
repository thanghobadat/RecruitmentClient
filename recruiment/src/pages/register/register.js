import styles from './register.module.scss'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal } from 'antd';
import RegisterUser from './register-user';
import RegisterAdmin from './register-admin';
import RegisterCompany from './register-company';

function Register(){
    return (
            <div className={styles.cover}>
                <div className={styles.purdah}>
                    <div className={styles.wrapper}>
                        <RegisterUser/>
                        <div>Bạn đã có tài khoản? <Link to='/'>Đăng nhập</Link></div>
                    </div>
                </div>

            </div>
    )
}

export default Register