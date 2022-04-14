import logo from '../../assets/images/logo.png'
import styles from './navbarAdmin.module.scss'
import { IoLogOut } from "react-icons/io5";
import {Link} from 'react-router-dom'
import clsx from 'clsx';
function NavbarAdmin() {
    function logOut(){
        localStorage.removeItem('user')
        
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_icon}>
                <a href="#"><img src={logo} className={styles.navbar_logo} /></a>
            </div>
            <div className={styles.category}>
                <Link to='/' className={clsx(styles.career, styles.active_category)}>
                    <div className={styles.content}>việc làm</div>
                </Link>
                <Link to='/branch' className={styles.branch}>
                    <div className={styles.content}>Tỉnh/ Thành phố</div>
                </Link>
                <Link to='/account' className={styles.account}>
                    <div className={styles.content}>Tài khoản</div>
                </Link>
            </div>


            <div className={styles.catalog} onClick={logOut}>
                <a href='#' className={styles.user}>
                    <IoLogOut className={styles.icon_user} />
                    <div className={styles.user_content}>Đăng xuất</div>
                </a>
            </div>
        </div>
    )
}

export default NavbarAdmin;