import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./userCollection.module.css";
import axios from "axios";
import Header from "../Header";
import quotationOpening from "../../assets/quotationOpening.png";
import quotationClosing from "../../assets/quotationClosing.png";
import speechBubble from "../../assets/speechBubble.png";



function UserCollection() {

    let username = sessionStorage.getItem("username");
    let user_id = sessionStorage.getItem("id");

    const [collection, setCollection] = useState([]);
    const [categories, setCategories] = useState([]);

    const getQuotes = () => {
        
        axios.get("http://localhost:4040/collection")
        .then((res) => {
            console.log((res.data))

            const filteredQuotes = res.data[0].filter((item) => item.user_id === user_id);
            setCollection(filteredQuotes)

            const filteredCategories = []
            
            for (let i = 0; i < filteredQuotes.length; i++){
                console.log(filteredQuotes[i])
                if (!filteredCategories.includes(filteredQuotes[i].category_collection)) {
                    filteredCategories.push(filteredQuotes[i].category_collection)
                }
            }
            setCategories(filteredCategories)
            console.log(filteredCategories)

        }).catch(err => {
            console.log(err)
        })
    }

    
    useEffect(() => {
        if (username) {
            getQuotes()
        }
    }, [username]
    )


    return (
        <div>
            <Header />
            {username == null ? (
                <div className={styles.login_container}>
                    <h1 className={styles.no_user}>No user logged in. If you'd like to view your Collection, please click below to Login or Sign-up</h1>
                    <Link to="/login">
                        <button className={styles.login_btn}>Login/Sign-Up</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <div className={styles.collection_title_container}>
                    <div className={styles.titleAndPicture}>
                        <h1 className={styles.collection_title}>Collection</h1>
                        <img className={styles.speechBubble} src={speechBubble}/>
                    </div>
                    {/* <div className={styles.dropdown}>
                        <label className={styles.dropdown_label}>Select a category:</label>
                        <select className={styles.dropdown_box}>
                            <option>All</option>
                            {categories.sort().map((item, index) => (
                                <option key={index}>
                                    {item}
                                </option>
                                ))}
                        </select>
                        <button>Search</button>
                    </div> */}
                    </div>


                    <div className={styles.collection_container}>
                        <div className={styles.post_container}>
                                 
                                
                                {
                                    
                                    collection.length == 0 ? (
                                        
                                    <p className={styles.noPosts}>No posts yet</p>
                                    
                                
                                    ) : (

                                        
                                
                                collection.map((item, index) => (
                                <div className={styles.post_card}>
                                    <div className={styles.post_quote}>
                                        <img className={styles.quotation_opening} src={quotationOpening} />
                                        <p className={styles.quote_text} key={index}>
                                        {item.quote_collection}
                                        </p>
                                        <img className={styles.quotation_closing} src={quotationClosing} /> 
                                    </div>
                                    <div  className={styles.post_details}>
                                        <p className={styles.author_name} key={index}>
                                        {item.author_name_collection}
                                        </p>
                                        <p className={styles.category} key={index}>
                                        {item.category_collection}
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

export default UserCollection;