import logo from '../../assets/images/logo.png'
import styles from './navbarCompany.module.scss'
import { IoMdChatbubbles, IoMdNotifications, FaUserCircle } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import clsx from 'clsx';
function NavbarCompany() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <a href="#"><img src={logo} className={styles.navbar_logo} /></a>
            </div>
            <div className={styles.category}>
                <a href='#' className={clsx(styles.home, styles.active_category)}>
                    <div className={styles.content}>Trang chủ</div>
                </a>
                <a href='#' className={styles.recruitment}>
                    <div className={styles.content}>Tuyển dụng</div>
                </a>
                
            </div>


            <div className={styles.catalog}>


                <a href='#' className={styles.chat}>
                    <div className={styles.separation}>|</div>
                    <IoMdChatbubbles className={styles.icon_chat} />
                    <div className={styles.count}>1</div>
                    <div className={styles.separation}>|</div>
                </a>
                <a href='#' className={styles.notification}>

                    <IoMdNotifications className={styles.icon_notification} />
                    <div className={clsx(styles.count, styles.active)}>1</div>
                    <div className={styles.separation}>|</div>
                </a>

                <a href='#' className={styles.user}>
                    <FaRegUserCircle className={styles.icon_user} />
                    <div className={styles.user_content}>Tài khoản</div>
                    <div className={styles.separation}>|</div>
                </a>
            </div>
        </div>
    )
}

export default NavbarCompany;