import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select, InputNumber, List, DatePicker } from 'antd';
import styles from './detail-recruitment.module.scss'

import NavbarCompany from '../../../layouts/navbar/navbar-company';
import NavbarAdmin from '../../../layouts/navbar/navbar-admin';
import NavbarUser from '../../../layouts/navbar/navbar-user';
import Navbar from '../../../layouts/navbar/navbar';

import { MdOutlineAttachMoney, MdDateRange } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { FaPaperPlane } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { BiDetail } from "react-icons/bi";
import Footer from '../../../layouts/footer/footer';




function DetailRecruitment() {
    const { TextArea } = Input;
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))
    

    const [recruitment, setRecruitment] = useState();
    const [userInformation, setUserInformation] = useState();
    const [companyInformation, setCompanyInformation] = useState();
    const [comment, setComment] = useState();
    const [isShowModalSubmitCV, setIsShowModalSubmitCV] = useState(false);
    const [cvFile, setCvFile] = useState();

    useEffect(() => {
        getRecruitment();
        if (user?.role === 'user') {
            getUserInformation();
        }
        else if (user?.role === 'company') {
            getCompanyInformation();
        }
        else{
            getRecruitment();
        }
    }, []);

    const getRecruitment = async () => {
        await axios.get(`https://localhost:5001/api/Companies/GetRecruitmentById?id=${id}`).then(
            res => {
                if (res.data.isSuccessed) {
                    console.log(res.data.resultObj)
                    setRecruitment(res.data.resultObj);

                }
            }
        );
    };
    const getUserInformation = async () => {
        await axios.get(`https://localhost:5001/api/Users/GetUserInformation?userId=${user.id}`).then(
            res => {
                if (res.data.isSuccessed) {
                    console.log(res.data.resultObj)

                    setUserInformation(res.data.resultObj)
                }
            }
        );
    };
    const getCompanyInformation = async () => {
        await axios.get(`https://localhost:5001/api/Companies/GetCompanyInformation?companyId=${user.id}`).then(
            res => {
                if (res.data.isSuccessed) {
                    console.log(res.data.resultObj)
                    setCompanyInformation(res.data.resultObj)
                }
            }
        );
    };


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

    const lineDown = (string) => {
        const descrip = [];
        var underline = string.indexOf('||')
        var index = 0;
        for (var i = underline; i != -1; i = underline) {
            var nextUnderline = string.indexOf('||', (underline + 1))
            if (nextUnderline != -1) {
                var data = string.slice(underline + 2, nextUnderline)
                descrip[index] = data;
                index += 1;
                underline = nextUnderline;

            }
            else {
                var data = string.slice(underline + 2, string.length)
                descrip[index] = data;
                underline = -1;
            }


        }
        return descrip

    }

    function GetFormattedDate(datetime) {
        if (datetime) {
            var month = datetime.substring(5, 7);
            var day = datetime.substring(8, 10);
            var year = datetime.substring(0, 4);
            return day + "-" + month + "-" + year;
        }
        else {
            return 'undefined'
        }
    }

    function timeCaculate(datetime) {
        var oneHour = 60 * 60 * 1000
        var oneDate = 60 * 60 * 1000 * 24
        var dateCreated = new Date(datetime);
        var currentDate = new Date();
        if ( currentDate-dateCreated  < oneHour) {
            var minuteCurent = currentDate.getMinutes()
            var minuteCreated = dateCreated.getMinutes()
            if (  minuteCurent<minuteCreated ) {
                minuteCurent += 60;
                return minuteCurent   -minuteCreated  + ' ph??t tr?????c'
            }
            else {
                if ( minuteCreated - minuteCurent < 1) {
                    return 'v???a xong'
                }
                else {
                    return minuteCreated  - minuteCurent + ' ph??t tr?????c'
                }

            }
        }
        else if (currentDate - dateCreated < oneDate) {
            var hourCurent = currentDate.getHours()
            var hourCreated = dateCreated.getHours()
            if (  hourCurent<=hourCreated ) {
                hourCurent += 24
                return   hourCurent  -hourCreated + ' gi??? tr?????c'
            }
            else {
                return  hourCurent - hourCreated + ' gi??? tr?????c'
            }
        }
        else {
            var dayCurent = currentDate.getDate()
            var dayCreated = dateCreated.getDate()
            var preMonth = currentDate.getMonth() -1;
            if (dayCurent<=dayCreated ) {
                if (preMonth == 1 
                    ||preMonth == 3
                    ||preMonth == 5
                    ||preMonth == 7
                    ||preMonth == 8
                    ||preMonth == 10
                    ||preMonth == 12
                    ){
                        dayCurent += 31
                    }
                    else if (preMonth == 2){
                        dayCurent +=28;
                    }
                    else{
                        dayCurent += 30
                    }
                return   dayCurent  -dayCreated + ' ng??y tr?????c'
            }
            else {
                return  dayCurent - dayCreated + ' ng??y tr?????c'
            }
        }
    }

    const handleComment = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/Comment`,
            {
                accountId: user.id,
                recruitmentId: recruitment.id,
                content: comment,
                subCommentId: null,
                role: user.role
            },
            config
        );
        if (data.isSuccessed) {
            getRecruitment();
        }
        else {
            message.error(data.message)
        }
    }
    const handleSubmitChildInput = async (inputChild, id) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/Comment`,
            {
                accountId: user.id,
                recruitmentId: recruitment.id,
                content: inputChild,
                subCommentId: id.toString(),
                role: user.role
            },
            config
        );
        if (data.isSuccessed) {
            getRecruitment();
        }
        else {
            message.error(data.message)
        }


    }


    const RenderComment = ({ comment, index }) => {
        const [inputChild, setInputChild] = useState('');
        return (
            <div className={styles.comment_title} key={index}>
                <div className={styles.sub_title_wrapper}>
                    <div className={styles.sub_image_wrapper}>
                        <img src={'https://localhost:5001/avatars/' + comment.avatarPath}
                            className={styles.sub_avatar}></img>
                    </div>
                    <div className={styles.sub_name}>
                        {comment.name}
                    </div>
                    <div className={styles.sub_date}>
                        {timeCaculate(comment.dateCreated)}
                    </div>
                </div>
                <div className={styles.sub_content}>
                    {comment.content}
                </div>
                {comment.childComments.map((childComment, index) => (
                    <div className={styles.child_title_wrapper} key={index}>
                        <div className={styles.child_header}>
                            <div className={styles.child_image_wrapper}>
                                <img src={'https://localhost:5001/avatars/' + childComment.avatarPath}
                                    className={styles.child_avatar}></img>
                            </div>
                            <div className={styles.child_name}>
                                {childComment.name}
                            </div>
                            <div className={styles.child_date}>
                                {timeCaculate(childComment.dateCreated)}
                            </div>
                        </div>
                        <div className={styles.child_content}>
                            {childComment.content}
                        </div>

                    </div>
                ))}
                <div className={styles.child_comment}>
                    {user.role === 'company' ?
                        <div className={styles.child_comment_image_wrapper}>
                            <img src={companyInformation ? 'https://localhost:5001/avatars/' + companyInformation.companyAvatar.imagePath : ''}
                                className={styles.child_comment_image}></img>
                        </div>
                        :
                        <div className={styles.child_comment_image_wrapper}>
                            <img src={userInformation ? 'https://localhost:5001/avatars/' + userInformation.userAvatar.imagePath : ''}
                                className={styles.child_comment_image}></img>
                        </div>}
                    <div className={styles.input_child_comment_wrapper}>
                        <TextArea
                            value={inputChild}
                            rows={1}
                            autoSize
                            onChange={(e) => setInputChild(e.target.value)}
                            placeholder='Nh???p b??nh lu???n'
                        />
                    </div>
                    <Button type='primary'
                        className={styles.btn__childcomment}
                        onClick={() => handleSubmitChildInput(inputChild, comment.id)}>
                        B??nh lu???n
                    </Button>

                </div>

            </div>
        )
    }

    const showModalSubmitCV = () => {

        setIsShowModalSubmitCV(true);
    };
    const handleCancelSubmitCV = () => {
        setIsShowModalSubmitCV(false);
    };
    const handleOkSubmitCV = () => {

        Modal.confirm({
            title: `B???n c?? ch???c ch???n mu???n n???p CV v??o b??i tuy???n d???ng n??y`,
            okText: "C??",
            cancelText: "Kh??ng",
            okType: "danger",
            onOk: () => {
                SubmitCV();
            },
        });

    };
    const SubmitCV = async () => {
        console.log(id, user.id, typeof cvFile)
        var bodyFormData = new FormData();
        bodyFormData.append('file', cvFile);
        bodyFormData.append('recruitmentId', id);
        bodyFormData.append('userId', user.id);
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/users/SubmitCV`,
            bodyFormData,
            config
        );
        if (data.isSuccessed) {
            message.success('N???p ????n th??nh c??ng')
            getRecruitment();
            setIsShowModalSubmitCV(false);
        }
        else {
            getRecruitment();
            message.error(data.message)
        }
    }


    return (
        <>
            {user?.role == 'company' ? <NavbarCompany /> : user?.role == "user"? <NavbarUser/> :user?.role == "admin"? <NavbarAdmin/> : <Navbar/> }
            <div className={styles.container}>
                <div className={styles.fluit}>
                    <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <div className={styles.header_image_wrapper}>
                                <img src={recruitment ? 'https://localhost:5001/avatars/' + recruitment.avatarPath : ''} className={styles.header_image}></img>
                            </div>
                            <div className={styles.header_description}>
                                <h2>{recruitment ? recruitment.name : ''}</h2>
                                <Link to={recruitment ?'/company/profile/' + recruitment.companyId:''}>
                                    <div className={styles.company}>
                                        {recruitment ? recruitment.companyName : ''}
                                    </div>
                                </Link>
                                <div className={styles.salary}>{recruitment ? tranferPrice(recruitment.salary) : ''} VND / Th??ng</div>
                                <MdOutlineAttachMoney className={styles.icon_salary} />
                                <div className={styles.branch}>
                                    <span>
                                        {recruitment ? recruitment.branches.length > 0 ? recruitment.branches.map((branch, index) =>
                                        (
                                            index === 0 ? branch : ', ' + branch
                                        )) : 'Ch??a th??m t???nh th??nh' : ''}
                                    </span>


                                </div>
                                <ImLocation2 className={styles.icon_branch} />

                                {user?.role === 'user'? 
                                <>
                                <Button type='primary' onClick={showModalSubmitCV} className={styles.apply}>N???p ????n</Button>

                                <FaPaperPlane className={styles.icon_apply}/>

                                </>

                                
                            :<></>}
                                {/* <Button type='primary' onClick={showModalSubmitCV} className={styles.apply}>N???p ????n</Button>

                                <FaPaperPlane className={styles.icon_apply} /> */}
                            </div>
                        </div>
                        <div className={styles.description}>
                            <h2>M?? t??? c??ng vi???c</h2>
                            {recruitment ? lineDown(recruitment.description).map((item, index) => (
                                <p key={index}>{item}</p>
                            )) : ''}
                            {/* <Button onClick={() => lineDown(recruitment.description)}>click</Button> */}
                        </div>
                        <div className={styles.description}>
                            <h2>Quy???n l???i ???????c h?????ng</h2>
                            {recruitment ? lineDown(recruitment.benefits).map((item, index) => (
                                <p key={index}>{item}</p>
                            )) : ''}
                        </div>
                        <div className={styles.description}>
                            <h2>Kinh nghi???m / K??? n??ng chi ti???t</h2>
                            {recruitment ? lineDown(recruitment.detailedExperience).map((item, index) => (
                                <p key={index}>{item}</p>
                            )) : ''}
                        </div>
                        <div className={styles.detail}>
                            <h2>M?? t??? chi ti???t</h2>
                            <p>Lo???i c??ng vi???c: <span>{recruitment ? recruitment.type : ''}</span></p>
                            <p>C???p b???c: <span>{recruitment ? recruitment.rank : ''}</span></p>
                            <p>Y??u c???u kinh nghi???m: <span>{recruitment ? recruitment.experience : ''}</span></p>
                            <p>Y??u c???u h???c v???n: <span>{recruitment ? recruitment.education : ''}</span></p>
                            <p>Ngh??nh ngh???: <span>{recruitment ? recruitment.careers.map((career, index) =>
                            (
                                index === 0 ? career : ', ' + career
                            )) : ''}</span></p>
                            <p>Th???i gian ???ng tuy???n: <span>{recruitment ? GetFormattedDate(recruitment.dateCreated) : ''} - {recruitment ? GetFormattedDate(recruitment.expirationDate) : ''}</span></p>

                        </div>
                        {user?.role === 'user' || user?.role ==='company' ?
                            <div>
                                <div className={styles.comment}>
                                    {user?.role === 'company' ?
                                        <div className={styles.comment_image_wrapper}>
                                            <img src={companyInformation ? 'https://localhost:5001/avatars/' + companyInformation.companyAvatar.imagePath : ''}
                                                className={styles.comment_image}></img>
                                        </div>
                                        :
                                        <div className={styles.comment_image_wrapper}>
                                            <img src={userInformation ? 'https://localhost:5001/avatars/' + userInformation.userAvatar.imagePath : ''}
                                                className={styles.comment_image}></img>
                                        </div>}
                                    <div className={styles.input_comment_wrapper}>
                                        <TextArea value={comment}
                                            rows={1}
                                            autoSize
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder='Nh???p b??nh lu???n'
                                        />
                                    </div>
                                    <Button type='primary'
                                        className={styles.btn_comment}
                                        onClick={handleComment}>
                                        B??nh lu???n
                                    </Button>

                                </div>
                                <div className={styles.comment_list}>
                                    {recruitment ? recruitment.listComment.map((comment, index) => {
                                        return (
                                            <RenderComment comment={comment} index={index} />
                                        )
                                    }
                                    ) : ''}
                                </div>
                            </div>


                            : ''}


                    </div>
                </div>

            </div>
            <Modal
                title="Ch???n file"
                visible={isShowModalSubmitCV}
                onCancel={handleCancelSubmitCV}
                footer={[
                    <Button key="back" onClick={handleCancelSubmitCV}>
                        quay l???i
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOkSubmitCV}>
                        N???p ????n
                    </Button>

                ]}>
                <Form.Item
                    label='Ch???n file'
                >
                    <input
                        type="file"
                        onChange={(e) => setCvFile(e.target.files[0])}
                    />

                </Form.Item>
            </Modal>
            <Footer/>
        </>
    )
}

export default DetailRecruitment

