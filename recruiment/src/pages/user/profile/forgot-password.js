import { useParams } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './forgot-password.module.scss'

function ForgotPassword(){
    const [form] = Form.useForm();

    const userId = "1135e3de-3346-45b5-2b39-08da13ba6867";

    const onFinish = (values) => {
        const { email } = values;
        changePassword(userId, email);
    };


    const onFinishFailed = (errorInfo) => {
        message.error(errorInfo)
    };

    const changePassword = async (userId, email) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            message.error("vui lòng nhập email hợp lệ")
        }
        else{
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/users/forgotPassword`,
                { userId, email },
                config
            );
            console.log(data)
            if (data.isSuccessed) {
                message.success('Lấy lại mật khẩu thành công, vui lòng vào gmail để kiểm tra')
            }
            else {
                message.error(data.message)
            }
        }
        
    };
    return (
        <>
        <div className={styles.wrapper}>
                <h1 className={styles.title}>Quên mật khẩu</h1>
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
                        label='Email xác nhận'
                        name='email'
                        rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                        <Input
                            name="email"
                            placeholder='Nhập email xác nhận'
                        />

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default ForgotPassword;