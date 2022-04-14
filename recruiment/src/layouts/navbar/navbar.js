import logo from '../../assets/images/logo.png'
import styles from './navbar.module.scss'
import { BsSearch,BsBuilding } from "react-icons/bs";
import { IoMdChatbubbles, IoMdNotifications,FaUserCircle} from "react-icons/io";
import { FaRegUserCircle} from "react-icons/fa";
import clsx from 'clsx';
function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <a href="#"><img src={logo} className={styles.navbar_logo} /></a>
            </div>
            <div className={styles.catalog}>
                <a href='#' className={styles.location}>
                    <BsSearch className={styles.icon_search}/>
                    <div className={styles.location_content}>Tìm kiếm việc làm</div>
                    <div className={styles.separation}>|</div>
                </a>
                
                <a href='#' className={styles.company}>
                    <BsBuilding className={styles.icon_company}/>
                    <div className={styles.company_content}>Công ty</div>
                    <div className={styles.separation}>|</div>
                </a>

                <a href='#' className={styles.chat}>
                    <IoMdChatbubbles className={styles.icon_chat}/>
                    <div className={styles.count}>1</div>
                    <div className={styles.separation}>|</div>
                </a>
                <a href='#' className={styles.notification}>
                    
                    <IoMdNotifications className={styles.icon_notification}/>
                    <div className={clsx(styles.count, styles.active)}>1</div>
                    <div className={styles.separation}>|</div>
                </a>

                <a href='#' className={styles.user}>
                    <FaRegUserCircle className={styles.icon_user}/>
                    <div className={styles.user_content}>Tài khoản</div>
                    <div className={styles.separation}>|</div>
                </a>
            </div>
        </div>
    )
}

export default Navbar;