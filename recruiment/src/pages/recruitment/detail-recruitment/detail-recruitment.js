import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select, InputNumber, List } from 'antd';
import styles from './detail-recruitment.module.scss'

import NavbarCompany from '../../../layouts/navbar/navbar-company';
import { MdOutlineAttachMoney, MdDateRange } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { FaPaperPlane } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { BiDetail } from "react-icons/bi";




function DetailRecruitment() {
    const { TextArea } = Input;
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    const [recruitment, setRecruitment] = useState();

    const [isEditName, setIsEditName] = useState(false);
    const [name, setName] = useState();
    const [isEditSalary, setIsEditSalary] = useState(false);

    const [salary, setSalary] = useState();
    const [test, setTest] = useState('');

    useEffect(() => {
        getRecruitment();
    }, []);

    const getRecruitment = async () => {
        await axios.get(`https://localhost:5001/api/Companies/GetRecruitmentById?id=${id}`).then(
            res => {
                if (res.data.isSuccessed) {
                    setRecruitment(res.data.resultObj);
                    setName(res.data.resultObj.name)
                    setSalary(res.data.resultObj.salary)
                }
            }
        );
    };
    
    const handleSubmitName = async () => {
        if (name.trimEnd() == recruitment.name.trimEnd()) {
            message.error("vui lòng thay đổi dữ liệu")
        }
        else {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Companies/UpdateRecruitmentName`,
                { id: recruitment.id, name },
                config
            );
            if (data.isSuccessed) {
                message.success('cập nhật thành công')
                getRecruitment();
                setIsEditName(false)
                
            }
            else {
                message.error(data.message)
            }
        }

    }
    const handleSubmitSalary = async () => {
        if (parseInt(salary) > 2147483647) {
            message.error("Lương không được lớn hơn 2 tỷ / tháng")
        }
        else if (parseInt(salary) === recruitment.salary) {
            message.error("vui lòng thay đổi dữ liệu")
        }
        else {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.put(
                `https://localhost:5001/api/Companies/UpdateRecruitmentSalary`,
                { id: recruitment.id, salary: parseInt(salary) },
                config
            );
            if (data.isSuccessed) {
                message.success('cập nhật thành công')
                getRecruitment();
                setIsEditSalary(false)
            }
            else {
                message.error(data.message)
            }
        }

    }
    function tranferPrice(data) {
        if (data) {
            data = data.toString();
            var cut;
            for (var i = data.length - 3; i > 0; i -= 3) {
                cut = data.slice(i, data.length);
                data = data.slice(0, i);
                data = data.concat('.')
                data = data.concat(cut)
            }
            return data
        } else {
            return 'undefined'
        }

    }
    
    const lineDown = (string) =>{
        const descrip = [];
        var underline = string.indexOf('-')
        var index = 0;
        for( var i = underline; i != -1 ; i = underline ){
            var nextUnderline = string.indexOf('-', (underline + 1))
            if (nextUnderline != -1){
                var data = string.slice(underline, nextUnderline )
                descrip[index] = data;
                index += 1;
                underline = nextUnderline;
                
            }
            else{
                var data =  string.slice(underline, string.length )
                descrip[index] = data;
                underline = -1;
            }
            

        }
        return descrip
        
    }
    const lineUp = (string) =>{
        // var test = string.indexOf('\n')
        // console.log(test)
        // console.log(string[test +2])
        var result = '';
        var newString = string.split('\n')
        for (var i =0 ; i< newString.length; i++){
            result += newString[i] 
        }
        return result
        
        
    }
    
    return (
        <>
            <NavbarCompany />
            <div className={styles.container}>
                <div className={styles.fluit}>
                    <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <div className={styles.header_image_wrapper}>
                                <img src={recruitment ? 'https://localhost:5001/avatars/' + recruitment.avatarPath : ''} className={styles.header_image}></img>
                            </div>
                            <div className={styles.header_description}>
                                {!isEditName ? <h2>{name}</h2>
                                    :
                                    <div className={styles.editName}>
                                        <Input
                                            value={name}
                                            className={styles.editName_input}
                                            onChange={(e) => setName(e.target.value)} />
                                        <Button type='primary' onClick={handleSubmitName}>Thay đổi</Button>
                                    </div>
                                }

                                <Link to='/'>
                                    <div className={styles.company}>
                                        {recruitment ? recruitment.companyName : ''}
                                    </div>
                                </Link>
                                {!isEditSalary ?
                                   
                                        <div className={styles.salary}>{tranferPrice(salary)} VND / Tháng</div>
                                        

                                   
                                    :
                                    <div className={styles.editSalary}>
                                        <Input
                                            value={salary}
                                            className={styles.editSalary_input}
                                            onChange={(e) => setSalary(e.target.value)} />
                                        <Button type='primary' onClick={handleSubmitSalary}>Thay đổi</Button>
                                    </div>
                                }


                                {!isEditSalary ? <MdOutlineAttachMoney className={styles.icon_salary} /> : ''}
                                <div className={styles.branch}>
                                    {recruitment ? recruitment.branches.map((branch, index) =>
                                    (
                                        index === 0 ? branch : ', ' + branch
                                    )) : ''}

                                </div>
                                <ImLocation2 className={styles.icon_branch} />
                                {!isEditName ? <GrEdit className={styles.icon_edit_name} onClick={() => setIsEditName(true)} /> : ''}
                                {!isEditSalary ? <GrEdit className={styles.icon_edit_salary} onClick={() => setIsEditSalary(true)} /> : ''}
                                <BiDetail className={styles.icon_detail_branch}/>
                                {/* {user.role === 'user'? 
                                <>
                                <Button type='primary' className={styles.apply}>Nộp Đơn</Button>

                                <FaPaperPlane className={styles.icon_apply}/>

                                </>

                                
                            :<></>} */}
                                <Button type='primary' className={styles.apply}>Nộp Đơn</Button>

                                <FaPaperPlane className={styles.icon_apply} />
                            </div>
                        </div>
                        <div className={styles.description}>
                            <h2>Mô tả công việc</h2>
                            {recruitment? lineDown(recruitment.description).map((item, index) => (
                                <p key={index}>{item}</p>
                            )): ''}
                            {/* <Button onClick={() => lineDown(recruitment.description)}>click</Button> */}
                        </div>
                        <div className={styles.text}>
                        
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default DetailRecruitment

