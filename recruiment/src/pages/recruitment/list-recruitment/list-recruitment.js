import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Form, Button, Table, Modal, Select, message, DatePicker } from "antd";

import NavbarCompany from "../../../layouts/navbar/navbar-company";
import styles from './list-recruitment.module.scss'
import 'antd/dist/antd.css';
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { MdOutlineAddAlarm } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { IoIosRemoveCircleOutline, IoIosRemoveCircle, IoIosAddCircleOutline, IoIosAddCircle } from "react-icons/io";



function ListRecruitment() {
    const user = JSON.parse(localStorage.getItem('user'))

    const { Option } = Select;
    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
    const [recruitmentList, setRecruitmentList] = useState();
    const [recruitmentSearchList, setRecruitmentSearchList] = useState();

    const [isShowModalAddCareer, setIsShowModalAddCareer] = useState(false);
    const [careerNotExist, setCareerNotExist] = useState();
    const [careerNotExistId, setCareerNotExistId] = useState();

    const [isShowModalRemoveCareer, setIsShowModalRemoveCareer] = useState(false);
    const [careerExist, setCareerExist] = useState();
    const [careerExistId, setCareerExistId] = useState();

    const [isShowModalAddBranch, setIsShowModalAddBranch] = useState(false);
    const [branchNotExist, setBranchNotExist] = useState();
    const [branchNotExistId, setBranchNotExistId] = useState()

    const [isShowModalRemoveBranch, setIsShowModalRemoveBranch] = useState(false);
    const [branchExist, setBranchExist] = useState();
    const [branchExistId, setBranchExistId] = useState();

    const [isShowModalExtend, setIsShowModalExtend] = useState(false);
    const [ExtendDate, setExtendDate] = useState();

    const [recruitmentId, setRecruitmentId] = useState();
    useEffect(() => {
        getRecruitmentList();
    }, []);
    const getRecruitmentList = async () => {
        await axios.get(`https://localhost:5001/api/Companies/GetAllCompanyRecruitment?companyId=${user.id}`).then(
            res => {
                setloading(false);
                setRecruitmentList(
                    res.data.resultObj.map((row, index) => ({
                        key: index,
                        name: row.name,
                        rank: row.rank,
                        experience: row.experience,
                        salary: tranferPrice(row.salary),
                        education: row.education,
                        type: row.type,
                        date: GetFormattedDate(row.dateCreated) + ' - ' + GetFormattedDate(row.expirationDate),
                        id: row.id,
                        careers: row.careers,
                        branches: row.branches,
                    }))
                );
                setRecruitmentSearchList(
                    res.data.resultObj.map((row, index) => ({
                        key: index,
                        name: row.name,
                        rank: row.rank,
                        experience: tranferPrice(row.experience),
                        salary: row.salary,
                        education: row.education,
                        type: row.type,
                        date: GetFormattedDate(row.dateCreated) + ' - ' + GetFormattedDate(row.expirationDate),
                        id: row.id,
                        careers: row.careers,
                        branches: row.branches,
                    }))
                );
            }
        );
    };

    const columns = [
        {
            title: "T??n",
            dataIndex: "name",
            // width: 300
        },
        {
            title: "Ngh??nh ngh???",
            dataIndex: "careers",
            // width: 300,
            render: careers => (
                <>
                    {careers.map((career, index) => {
                        return (
                            <span key={index}>{index === careers.length - 1 ? career : career + ', '} </span>
                        );
                    })}
                </>
            ),
        },
        {
            title: "C???p b???c",
            dataIndex: "rank",
            // width: 300
        },
        {
            title: "Kinh nghi???m",
            dataIndex: "experience",
            // width: 300
        },
        {
            title: "M???c L????ng",
            dataIndex: "salary",
            // width: 300
        },
        {
            title: "H???c V???n",
            dataIndex: "education",
            // width: 300
        },
        {
            title: "Lo???i c??ng vi???c",
            dataIndex: "type",
            // width: 300
        },
        {
            title: "Chi nh??nh",
            dataIndex: "branches",
            // width: 300,
            render: branches => (
                <>
                    {branches.map((branch, index) => {
                        return (
                            <span index={index}>{index === branches.length - 1 ? branch : branch + ', '} </span>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Th???i h???n ???ng tuy???n",
            dataIndex: "date",
            // width: 300
        },
        {
            title: "H??nh ?????ng",
            width: 300,
            render: (key) => {
                return (
                    <>
                        <CgMoreO
                            style={{ fontSize: "1.2rem" }}
                            onClick={() => navigate(`detail/${key.id}`)} />
                        <GoListOrdered
                            onClick={() => navigate(`list-cv/${key.id}`)}
                            style={{ fontSize: "1.3rem", marginLeft: 18 }}
                        />
                        <IoIosAddCircleOutline
                            style={{ fontSize: "1.3rem", marginLeft: 18 }}
                            onClick={() => showModalAddCareer(key.id)} />
                        <IoIosRemoveCircleOutline
                            style={{ fontSize: "1.3rem", marginLeft: 18 }}
                            onClick={() => showModalRemoveCareer(key.id)} />
                        <IoIosAddCircle
                            style={{ fontSize: "1.3rem", marginLeft: 18 }}
                            onClick={() => showModalAddBranch(key.id)} />
                            <IoIosRemoveCircle
                            style={{ fontSize: "1.3rem", marginLeft: 18 }}
                            onClick={() => showModalRemoveBranch(key.id)} />
                        
                            <MdOutlineAddAlarm style={{ fontSize: "1.3rem", marginLeft: 18 }}
                            onClick={() => showModalExtenddDate(key.id)} />
                        <AiTwotoneDelete
                            onClick={() => {
                                 onDeleteRecruitment(key.id);
                            }}
                            style={{ color: "red", marginLeft: 18, fontSize: "1.2rem" }}
                        />
                    </>
                );
            }
        }
    ]
    const onDeleteRecruitment = (id) => {
        Modal.confirm({
          title: `B???n c?? ch???c ch???n mu???n x??a b??i tuy???n d???ng n??y`,
          okText: "C??",
          cancelText:"Kh??ng",
          okType: "danger",
          onOk: () => {
            handleDelete(id);
          },
        });
      };
      const handleDelete = async (id) => {
        const { data } = await axios.delete(
           `https://localhost:5001/api/companies/DeleteRecruitment?id=${id}`
        )
        if (data.isSuccessed){
            message.success('X??a th??nh c??ng')
            navigate('/recruitment');
        }
        else{
            message.error(data.message)
        }
        getRecruitmentList();
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
    function handleSearch(keyword) {
        if (keyword) {
            const newData = recruitmentSearchList.filter(function (item) {
                const name = item.name ? item.name.toUpperCase() : "".toUpperCase();
                const textData = keyword.toUpperCase();
                return name.indexOf(textData) > -1;
            });
            setRecruitmentList(newData)
        } else {
            setRecruitmentList(recruitmentSearchList);
        }
    }

    const showModalAddCareer = async (id) => {

        setIsShowModalAddCareer(true);
        setRecruitmentId(id)
        await axios.get(`https://localhost:5001/api/Companies/GetCareerRecruitmentNotExist?id=${id}`).then(
            res => {
                setCareerNotExist(res.data)
                console.log(res.data)
            }
        );
    };
    const handleCancelAddCareer = () => {
        setIsShowModalAddCareer(false);
    };
    const handleOkAddCareer = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/AddCareerToRecruitment?recruimentId=${recruitmentId}&careerId=${careerNotExistId}`,
            config
        );
        if (data.isSuccessed) {
            message.success('Th??m th??nh c??ng')
            getRecruitmentList();

            setIsShowModalAddCareer(false);
        }
        else {
            message.error(data.message)
        }

    };



    const showModalRemoveCareer = async (id) => {
        console.log(id)
        setIsShowModalRemoveCareer(true);
        setRecruitmentId(id)
        await axios.get(`https://localhost:5001/api/Companies/GetCareerRecruitmentExist?id=${id}`).then(
            res => {
                setCareerExist(res.data)
                console.log(res.data)
            }
        );
    };
    const handleCancelRemoveCareer = () => {
        setIsShowModalRemoveCareer(false);
    };
    const handleOkRemoveCareer = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/RemoveCareerFromRecruitment?recruitmentId=${recruitmentId}&careerId=${careerExistId}`,
            config
        );
        if (data.isSuccessed) {
            message.success('X??a th??nh c??ng')
            getRecruitmentList();

            setIsShowModalRemoveCareer(false);
        }
        else {
            message.error(data.message)
        }

    };


    const showModalAddBranch = async (id) => {

        setIsShowModalAddBranch(true);
        setRecruitmentId(id)
        await axios.get(`https://localhost:5001/api/Companies/GetBranchesRecruitmentNotExist?id=${id}`).then(
            res => {
                setBranchNotExist(res.data)
                console.log(res.data)
            }
        );
    };
    const handleCancelAddBranch = () => {
        setIsShowModalAddBranch(false);
    };
    const handleOkAddBranch = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/AddBranchToRecruitment?recruimentId=${recruitmentId}&branchId=${branchNotExistId}`,
            config
        );
        if (data.isSuccessed) {
            message.success('Th??m th??nh c??ng')
            getRecruitmentList();

            setIsShowModalAddBranch(false);
        }
        else {
            message.error(data.message)
        }

    };

    const showModalRemoveBranch = async (id) => {
        setIsShowModalRemoveBranch(true);
        setRecruitmentId(id)
        await axios.get(`https://localhost:5001/api/Companies/GetBranchesRecruitmentExist?id=${id}`).then(
            res => {
                setBranchExist(res.data)
                console.log(res.data)
            }
        );
    };
    const handleCancelRemoveBranch = () => {
        setIsShowModalRemoveBranch(false);
    };
    const handleOkRemoveBranch = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/RemoveBranchFromRecruitment?recruitmentId=${recruitmentId}&branchId=${branchExistId}`,
            config
        );
        if (data.isSuccessed) {
            message.success('X??a th??nh c??ng')
            getRecruitmentList();

            setIsShowModalRemoveBranch(false);
        }
        else {
            message.error(data.message)
        }

    };

    const showModalExtenddDate = async (id) => {

        setIsShowModalExtend(true);
        setRecruitmentId(id)
    };
    const handleCancelExtenddDate = () => {
        setIsShowModalExtend(false);
    };
    const handleOkExtenddDate = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post(
            `https://localhost:5001/api/Companies/ExtendRecruitment`,
            { id: recruitmentId, newExpirationDate: ExtendDate },
            config
        );
        if (data.isSuccessed) {
            message.success('Gia h???n th??nh c??ng th??nh c??ng')
            getRecruitmentList();

            setIsShowModalExtend(false);
        }
        else {
            message.error(data.message)
        }

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

    return (
        <>
            <NavbarCompany />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Qu???n l?? Tuy???n d???ng</h1>
                <div className={styles.search_bar}>
                    <div >
                        <Button type='primary' size='large' onClick={() => navigate('create')}>
                            t???o m???i
                        </Button>
                    </div>
                    <div className={styles.search}>
                        <input type="text" placeholder="T??m ki???m" className={styles.search_input} onChange={e => handleSearch(e.target.value)} />
                    </div>
                </div>
                <div>
                    {loading ? (
                        "Loading"
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={recruitmentList}
                            pagination={{ pageSize: 5 }}
                            scroll={{ y: 300 }}
                        />
                    )}
                </div>
            </div>

            <Modal
                title="Th??m Ngh??nh ngh???"
                visible={isShowModalAddCareer}
                onCancel={handleCancelAddCareer}
                footer={[
                    <Button key="back" onClick={handleCancelAddCareer}>
                        quay l???i
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOkAddCareer}>
                        Th??m
                    </Button>

                ]}>
                <Form.Item
                    label='Ch???n ng??nh ngh???'
                >
                    <Select style={{ width: '100%' }} onChange={(value) => setCareerNotExistId(value)}>
                        {careerNotExist ? careerNotExist.map((career, index) =>
                        (
                            <Option key={index} value={career.id}>{career.name}</Option>
                        )) : ""}
                    </Select>

                </Form.Item>
            </Modal>

            <Modal
                title="Lo???i b??? ngh??nh ngh???"
                visible={isShowModalRemoveCareer}
                onCancel={handleCancelRemoveCareer}
                footer={[
                    <Button key="back" onClick={handleCancelRemoveCareer}>
                        quay l???i
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOkRemoveCareer}>
                        Lo???i b???
                    </Button>

                ]}>
                <Form.Item
                    label='Ch???n ng??nh ngh???'
                >
                    <Select style={{ width: '100%' }} onChange={(value) => setCareerExistId(value)}>
                        {careerExist ? careerExist.map((career, index) =>
                        (
                            <Option key={index} value={career.id}>{career.name}</Option>
                        )) : ""}
                    </Select>

                </Form.Item>
            </Modal>

            <Modal
                title="Th??m chi nh??nh"
                visible={isShowModalAddBranch}
                onCancel={handleCancelAddBranch}
                footer={[
                    <Button key="back" onClick={handleCancelAddBranch}>
                        quay l???i
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOkAddBranch}>
                        Th??m
                    </Button>

                ]}>
                <Form.Item
                    label='Ch???n chi nh??nh'
                >
                    <Select style={{ width: '100%' }} onChange={(value) => setBranchNotExistId(value)}>
                        {branchNotExist ? branchNotExist.map((branch, index) =>
                        (
                            <Option key={index} value={branch.id}>{branch.city}</Option>
                        )) : ""}
                    </Select>

                </Form.Item>
            </Modal>
            <Modal
                title="Lo???i b??? chi nh??nh"
                visible={isShowModalRemoveBranch}
                onCancel={handleCancelRemoveBranch}
                footer={[
                    <Button key="back" onClick={handleCancelRemoveBranch}>
                        quay l???i
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOkRemoveBranch}>
                        Lo???i b???
                    </Button>

                ]}>
                <Form.Item
                    label='Ch???n Chi nh??nh'
                >
                    <Select style={{ width: '100%' }} onChange={(value) => setBranchExistId(value)}>
                        {branchExist ? branchExist.map((branch, index) =>
                        (
                            <Option key={index} value={branch.id}>{branch.city}</Option>
                        )) : ""}
                    </Select>

                </Form.Item>
            </Modal>
            <Modal
                title="Gia h???n ng??y"
                visible={isShowModalExtend}
                onCancel={handleCancelExtenddDate}
                footer={[
                    <Button key="back" onClick={handleCancelExtenddDate}>
                        quay l???i
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOkExtenddDate}>
                        Gia h???n
                    </Button>

                ]}>
                <Form.Item
                    label='Ch???n ng??y'
                >
                    <DatePicker onChange={(value) => setExtendDate(value._d.toISOString())} />

                </Form.Item>
            </Modal>
        </>
    )
}

export default ListRecruitment