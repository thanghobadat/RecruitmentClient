import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal } from 'antd';

import styles from './profile-user.module.scss'
import Navbar from '../../../layouts/navbar/navbar';
import clsx from 'clsx';
import Information from './information';
import ChangePasswordUser from './change-password-user';
import ForgotPassword from './forgot-password';

function ProfileUser() {
    return (
        <>
            <Navbar />
            <div className={styles.wrapper}>
                <div className={styles.catalog}>
                    <ul className={styles.list}>
                        <Link to='/user/profile'>
                            <li className={clsx(styles.item, styles.active) }>
                                <h3>Tài Khoản</h3>
                                <p>Thông tin cá nhân</p>
                            </li>
                        </Link>
                        <Link to='/user/profile'>
                            <li className={styles.item}>
                                <h3>Đổi Mật khẩu</h3>
                                <p>Thay đổi mật khẩu đăng nhập</p>
                            </li>
                        </Link>
                        <Link to='/user/profile'>
                            <li className={styles.item}>
                                <h3>Đăng xuất</h3>
                                <p>Đăng xuất</p>
                            </li>
                        </Link>
                    </ul>


                </div>
                <div className={styles.main}>
                    <Information/>
                </div>
            </div>
        </>
    )
}

export default ProfileUser