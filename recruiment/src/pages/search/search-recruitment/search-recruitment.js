import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Input, Button, message, Modal, Select } from 'antd';

import styles from './search-recruitment.module.scss'
import NavbarCompany from '../../../layouts/navbar/navbar-company';
import NavbarUser from '../../../layouts/navbar/navbar-user';
import NavbarAdmin from '../../../layouts/navbar/navbar-admin';
import Navbar from '../../../layouts/navbar/navbar';
import logo from '../../../assets/images/logo-facebook.png'
import { MdDateRange, MdDelete } from "react-icons/md";
import Footer from '../../../layouts/footer/footer';
function SearchRecruitment() {
    const { Option } = Select;

    const user = JSON.parse(localStorage.getItem('user'))
    const [career, setCareer] = useState()
    const [careerList, setCareerList] = useState()
    const [branch, setBranch] = useState()
    const [branchList, setBranchList] = useState()
    const [rank, setRank] = useState()
    const [experience, setExperience] = useState()
    const [salary, setSalary] = useState()
    const [education, setEducation] = useState()
    const [type, setType] = useState()
    const [listRecruitments, setListRecruitments] = useState()
    const [totalRecord, setTotalRecord] = useState(0)

    useEffect(() => {
        getSearchInformation();
    }, []);
    const getSearchInformation = async () => {
        await axios.get(`https://localhost:5001/api/Admins/GetAllCareer`).then(
            res => {
                setCareerList(res.data)
            }
        );
        await axios.get(`https://localhost:5001/api/Admins/GetAllBranch`).then(
            res => {
                setBranchList(res.data)
            }
        );
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${rank ? '&Rank=' + rank : ''}${experience ? '&Experience=' + experience : ''}${salary ? '&Salary=' + salary : ''}${education ? '&Education=' + education : ''}${type ? '&Type=' + type : ''}${branch ? '&BranchId=' + branch : ''}${career ? '&CareerId=' + career : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );

    };
    const ranks = [
        {
            id: 1,
            name: 'Th???c t???p'
        },
        {
            id: 2,
            name: 'M???i ??i l??m'
        },
        {
            id: 3,
            name: 'Nh??n vi??n'
        },
        {
            id: 4,
            name: 'Tr?????ng ph??ng / Qu???n l??'
        },
        {
            id: 5,
            name: 'Gi??m ?????c'
        }

    ]
    const experiences = [
        {
            id: 1,
            name: 'D?????i 1 n??m'
        },
        {
            id: 2,
            name: '1 - 2 n??m'
        },
        {
            id: 3,
            name: '2 - 5 n??m'
        },
        {
            id: 4,
            name: '5 - 10 n??m'
        },
        {
            id: 5,
            name: 'Tr??n 10 n??m'
        }

    ]
    const educations = [
        {
            id: 1,
            name: 'Trung h???c ph??? th??ng'
        },
        {
            id: 2,
            name: 'Trung c???p'
        },
        {
            id: 3,
            name: 'Cao ?????ng / ?????i h???c'
        },
        {
            id: 4,
            name: 'Th???c s??'
        },
        {
            id: 5,
            name: 'Ti???n s??'
        }
    ]
    const types = [
        {
            id: 1,
            name: 'To??n th???i gian'
        },
        {
            id: 2,
            name: 'B??n th???i gian'
        },
        {
            id: 3,
            name: 'Th???i v???'
        }
    ]
    const salaries = [
        {
            id: 1,
            name: 'D?????i 1 tri???u',
            value: 1000000,
        },
        {
            id: 2,
            name: '1 tri???u - 3 tri???u',
            value: 3000000
        },
        {
            id: 3,
            name: '3 tri???u - 8 tri???u',
            value: 8000000
        },
        {
            id: 4,
            name: '8 tri???u - 20 tri???u',
            value: 20000000
        },
        {
            id: 5,
            name: '20 tri???u - 50 tri???u',
            value: 50000000
        },
        {
            id: 6,
            name: 'Tr??n 50 tri???u',
            value: 50000001
        }
    ]
    const handleChangeCareer = async (value) => {
        setCareer(value)
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${rank ? '&Rank=' + rank : ''}${experience ? '&Experience=' + experience : ''}${salary ? '&Salary=' + salary : ''}${education ? '&Education=' + education : ''}${type ? '&Type=' + type : ''}${branch ? '&BranchId=' + branch : ''}${value ? '&CareerId=' + value : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );
        
    }
    const handleChangeBranch = async (value) => {
        setBranch(value)
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${rank ? '&Rank=' + rank : ''}${experience ? '&Experience=' + experience : ''}${salary ? '&Salary=' + salary : ''}${education ? '&Education=' + education : ''}${type ? '&Type=' + type : ''}${value ? '&BranchId=' + value : ''}${career ? '&CareerId=' + career : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );
    }
    const handleChangeRank = async (value) => {
        setRank(value)
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${value ? '&Rank=' + value : ''}${experience ? '&Experience=' + experience : ''}${salary ? '&Salary=' + salary : ''}${education ? '&Education=' + education : ''}${type ? '&Type=' + type : ''}${branch ? '&BranchId=' + branch : ''}${career ? '&CareerId=' + career : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );
    }
    const handleChangeExperience = async (value) => {
        setExperience(value)
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${rank ? '&Rank=' + rank : ''}${value ? '&Experience=' + value : ''}${salary ? '&Salary=' + salary : ''}${education ? '&Education=' + education : ''}${type ? '&Type=' + type : ''}${branch ? '&BranchId=' + branch : ''}${career ? '&CareerId=' + career : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );
    }
    const handleChangeSalary = async (value) => {
        setSalary(value)
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${rank ? '&Rank=' + rank : ''}${experience ? '&Experience=' + experience : ''}${value ? '&Salary=' + value : ''}${education ? '&Education=' + education : ''}${type ? '&Type=' + type : ''}${branch ? '&BranchId=' + branch : ''}${career ? '&CareerId=' + career : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );
    }
    const handleChangeEducation = async (value) => {
        setEducation(value)
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${rank ? '&Rank=' + rank : ''}${experience ? '&Experience=' + experience : ''}${salary ? '&Salary=' + salary : ''}${value ? '&Education=' + value : ''}${type ? '&Type=' + type : ''}${branch ? '&BranchId=' + branch : ''}${career ? '&CareerId=' + career : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );
    }
    const handleChangeType = async (value) => {
        setType(value)
        await axios.get(`https://localhost:5001/api/Companies/GetAllRecruitmentPaging?PageIndex=1&PageSize=10${rank ? '&Rank=' + rank : ''}${experience ? '&Experience=' + experience : ''}${salary ? '&Salary=' + salary : ''}${education ? '&Education=' + education : ''}${value ? '&Type=' + value : ''}${branch ? '&BranchId=' + branch : ''}${career ? '&CareerId=' + career : ''}`).then(
            res => {
                console.log(res.data.resultObj)
                setListRecruitments(res.data.resultObj.items)
                setTotalRecord(res.data.resultObj.totalRecords)
            }
        );
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
                if ( minuteCreated - minuteCurent <= 1) {
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
            if (  hourCurent<hourCreated ) {
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
            if (  dayCurent<dayCreated ) {
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
    return (
        <>
            {user?.role == 'company' ? <NavbarCompany /> : user?.role == "user"? <NavbarUser/> :user?.role == "admin"? <NavbarAdmin/> : <Navbar/> }
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.header_item}>
                        <Select onChange={handleChangeCareer}
                            className={styles.header_select}
                            placeholder='Ngh??nh ngh???'>
                            <Option value=''>Ng??nh ngh???</Option>
                            {careerList ? careerList.map((career) => (
                                <Option key={career.id} value={career.id}>{career.name}</Option>
                            )) : ''}

                        </Select>
                    </div>
                    <div className={styles.header_item}>
                        <Select onChange={handleChangeBranch}
                            className={styles.header_select}
                            placeholder='T???nh th??nh'>
                            <Option value=''>T???nh th??nh</Option>

                            {branchList ? branchList.map((branch) => (
                                <Option key={branch.id} value={branch.id}>{branch.city}</Option>
                            )) : ''}
                        </Select>
                    </div>
                    <div className={styles.header_item}>
                        <Select onChange={handleChangeRank}
                            className={styles.header_select}
                            placeholder='C???p b???c'>
                            <Option value=''>C???p b???c</Option>

                            {ranks.map((rank) => (
                                <Option key={rank.id} value={rank.name}>{rank.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.header_item}>
                        <Select onChange={handleChangeExperience}
                            className={styles.header_select}
                            placeholder='Kinh nghi???m'>
                            <Option value=''>Kinh nghi???m</Option>

                            {experiences.map((experience) => (
                                <Option key={experience.id} value={experience.name}>{experience.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.header_item}>
                        <Select onChange={handleChangeSalary}
                            className={styles.header_select}
                            placeholder='M???c l????ng'>
                            <Option value=''>M???c L????ng</Option>

                            {salaries.map((salary) => (
                                <Option key={salary.id} value={salary.value}>{salary.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.header_item}>
                        <Select onChange={handleChangeEducation}
                            className={styles.header_select}
                            placeholder='Tr??nh ????? h???c v???n'>
                            <Option value=''>Tr??nh ????? h???c v???n</Option>
                                
                            {educations.map((education) => (
                                <Option key={education.id} value={education.name}>{education.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.header_item}>
                        <Select onChange={handleChangeType}
                            className={styles.header_select}
                            placeholder='Lo???i c??ng vi???c'>
                            <Option value=''>Lo???i c??ng vi???c</Option>

                            {types.map((type) => (
                                <Option key={type.id} value={type.name}>{type.name}</Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <h3>K???t qu??? t??m ki???m vi???c l??m</h3>
                <p>{totalRecord} vi???c l??m</p>
                <div className={styles.recruitment_list}>
                    {listRecruitments ? listRecruitments.map((recruitment) => (
                        <Link to={'/recruitment/detail/' + recruitment.id} key={recruitment.id}>
                            <div className={styles.recruitment_item}>
                                <div className={styles.item_image}>
                                    <img src={'https://localhost:5001/avatars/' +recruitment.avatarPath}
                                        className={ styles.image} />
                                </div>
                                <div className={styles.item_content}>
                                    <div className={styles.title}>
                                        <h2>{recruitment.name}</h2>
                                        <div className={styles.date}>
                                            <MdDateRange className={styles.date_icon} />
                                            {timeCaculate(recruitment.dateCreated)}
                                        </div>
                                    </div>
                                    <div className={styles.company}>
                                        {recruitment.companyName}
                                    </div>
                                    <div className={styles.branch}>
                                        {recruitment.branches.map((city, index) => (
                                                    index == 0 ? city : ', ' + city
                                                ))}
                                       
                                    </div>
                                    <div className={styles.salary}>
                                        {tranferPrice(recruitment.salary)} VND
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : ''}


                </div>
            </div>
            <Footer/>
        </>
    )
}

export default SearchRecruitment