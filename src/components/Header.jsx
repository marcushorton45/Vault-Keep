import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
    
    const username = sessionStorage.getItem("username")

    const logout = () => {
        window.location.reload(false);

        sessionStorage.clear()
    }


    return (
        <body>
        <header className={styles.header}>
            <nav>
                {
                   username == null ? (
                <div className={styles.login_container}>
                    <Link to="/login">
                        <button className={styles.login_btn}>Login/Sign-up</button>
                    </Link>
                </div>
                         ):(
                <div className={styles.logout_container}>
                    <form onSubmit={logout}>
                        <input
                        className={styles.logout_btn}
                        type="submit"
                        value="Logout"/>
                    </form>
                        <p className={styles.logged_in}>Hi, {username}!</p>
                </div>
                   )
                }
            </nav>
            <Link className={styles.site_name_link} to="/homeScreen">
                Vault Keep
            </Link>
            <nav className={styles.header_btns}>
                <Link to="/homeScreen">
                    <button className={styles.home_btn}>Home</button>
                </Link>
                <Link to="/collection">
                    <button className={styles.collection_btn}>Collection</button>
                </Link>  
                <Link to="/bookshelf"> 
                    <button className={styles.bookshelf_btn}>Bookshelf</button>
                </Link> 
            </nav>
        </header>
        </body>
    )
}

export default Header;