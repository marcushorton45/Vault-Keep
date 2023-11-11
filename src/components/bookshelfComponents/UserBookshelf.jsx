import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./bookshelf.module.css";
import axios from "axios";
import Header from "../Header";
import bookshelfIcon from "../../assets/bookshelf.png";


function UserBookshelf() {
    
    let username = sessionStorage.getItem("username")
    let user_id = sessionStorage.getItem("id")

    const [bookshelf, setBookshelf] = useState([])

    const getArticles = () => {
        
        axios.get("http://localhost:4040/bookshelf")
        .then((res) => {
            console.log((res.data))

            const filteredArticles = res.data[0].filter((item) => item.user_id === user_id)
            setBookshelf(filteredArticles)


        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (username) {
            getArticles()
        }
    }, [username]
    )

    return (
        <div> 
            <Header />
            { username == null  ? (
                <div className={styles.login_container}>
                    <h1 className={styles.no_user}>No user logged in. If you'd like to view your Bookshelf, please click below to Login or Sign-up</h1>
                    <Link to="/login">
                        <button className={styles.login_btn}>Login/Sign-Up</button>
                    </Link>
                </div>
            ) : (  
           <div>
            <div className={styles.bookshelf_title_container}>
            <div className={styles.titleAndPicture}>
                <h1 className={styles.bookshelf_title}>Bookshelf</h1>
                <img className={styles.bookshelfIcon} src={bookshelfIcon}/>
            </div>
            {/* <div className={styles.dropdown}>
                <label className={styles.dropdown_label}>Select a genre:</label>
                <select className={styles.dropdown_box}>
                    <option>All</option>
                    <option>Adventure Fiction</option>
                    <option>Arts & New Media</option>
                    <option>Biographies & Memoirs</option>
                    <option>Business Literature</option>
                    <option>Classic Literature</option>
                    <option>Classic Foreign Literature</option>
                    <option>Crime</option>
                    <option>Criticism</option>
                    <option>Detective Fiction</option>
                    <option>Fantasy</option>
                    <option>Health, Fitness, & Dieting</option>
                    <option>Historical Fiction</option>
                    <option>History</option>
                    <option>Horror</option>
                    <option>Humor & Entertainment</option>
                    <option>Modern Literature</option>
                    <option>Mystery, Thriller, & Suspense</option>
                    <option>Nonfiction</option>
                    <option>Plays</option>
                    <option>Poetry</option>
                    <option>Psychology</option>
                    <option>Religion</option>
                    <option>Romance</option>
                    <option>Science & Philosophy</option>
                    <option>Science Fiction</option>
                    <option>Self Help</option>
                    <option>Short Stories</option>
                    <option>Spirituality</option>
                    <option>Sports</option>
                    <option>Travel</option>
                    <option>Other</option>
                </select>
            </div> */}
            </div>


            <div className={styles.bookshelf_container}>
                <div className={styles.post_container}>
                    {

                    bookshelf.length == 0 ? (
                        <p className={styles.noPosts}>No posts yet</p>
                    ) : (
                    
                    bookshelf.map((item, index) => (
                        <div className={styles.post_card}>
                            <div className={styles.post_article_title}>
                                <p className={styles.article_title_text} key={index}>{item.article_title_bookshelf}
                                </p>
                            </div>
                            <div className={styles.post_details}>
                                <p className={styles.author_name} key={index}>
                                {item.author_name_bookshelf}    
                                </p>
                                <p className={styles.genre} key={index}>
                                {item.genre_bookshelf}
                                </p>
                            </div>
                        </div>
                    )))}
                </div>
            </div>


           </div>
                )
            }
        </div>
    )
}

export default UserBookshelf;