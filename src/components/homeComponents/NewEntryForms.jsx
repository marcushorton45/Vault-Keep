import styles from "./homeScreen.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";


const url = "http://localhost:4004/collection"



const NewEntryForms = () => {

    const [user_id, setUser_id] = useState(null)

    const [quote_collection, set_quote_collection] = useState('');
    const [author_name_collection, set_author_name_collection] = useState('');
    const [category_collection, set_category_collection] = useState('');
    
    const [article_title_bookshelf, set_article_title_bookshelf] = useState('');
    const [author_name_bookshelf, set_author_name_bookshelf] = useState('');
    const [genre_bookshelf, set_genre_bookshelf] = useState('');
    
    const navigate = useNavigate();

  useEffect(() => {
    const fetchedUserId = sessionStorage.getItem("id");
    setUser_id(fetchedUserId);
    }, []);


    const collectionSubmitHandler = async () => {
        console.log(user_id, quote_collection, author_name_collection, category_collection)

        
        if (quote_collection === "") {
            alert("Enter a quote.");
        } else if (author_name_collection === "") {
            alert("Enter the name of the author, or enter anonymous.");
        } else if (category_collection === "") {
            alert("Please enter a category in which the quote best falls under.");
        } else if (user_id === null) {
            navigate("/login")
        } else {
            axios.post("http://localhost:4040/collection", {user_id, quote_collection, author_name_collection, category_collection})
            .then((response) => {
                console.log(response);
              })
            .catch((err) => console.log(err), alert("Quote added to your personal collection!"))
        } 
    }

    const bookshelfSubmitHandler = async () => {
        console.log(user_id, article_title_bookshelf, author_name_bookshelf, genre_bookshelf)

        if (article_title_bookshelf === "") {
            alert("Enter a book or article title.");
        } else if (author_name_bookshelf === "") {
            alert("Enter the name of the author, or enter anonymous.");
        } else if (genre_bookshelf === "") {
            alert("Please enter the genre that the book or article best falls under.");
        } else if (user_id === null) {
            navigate("/login")
        } else {
            axios.post("http://localhost:4040/bookshelf", {user_id, article_title_bookshelf, author_name_bookshelf, genre_bookshelf})
            .then((res) => console.log(res))
            .catch((err) => console.log(err), alert("Book added to your bookshelf!"))
        }
    }
    
    return (
        <div>
            <Header />
        <div className={styles.form_container}>
        <form onSubmit={collectionSubmitHandler}>
            <div className={styles.quoteForm}>
                <h1 className={styles.form_title}>Add to your Quote Collection!</h1>
                <div>
                    <h4 className={styles.input_title}>Quote:</h4>
                    <textarea 
                    name="quote" 
                    type="text" 
                    className={styles.entry_box_quote} 
                    value={quote_collection}
                    onChange={(e) => set_quote_collection(e.target.value)}
                    required
                    autocomplete="off"
                    />
                </div>
                <div>
                    <h4 className={styles.input_title}>Name of the author/writer:</h4>
                    <input 
                    name="author" 
                    type="text" 
                    className={styles.entry_box} 
                    value={author_name_collection}
                    onChange={(e) => set_author_name_collection(e.target.value)}
                    required
                    autocomplete="off"
                    />
                </div>
                <div>
                    <h4 className={styles.input_title}>Category:</h4>
                    <input 
                    name="category" 
                    type="text" 
                    className={styles.entry_box} 
                    value={category_collection
                        // .toLowerCase()
                    }
                    onChange={(e) => set_category_collection(e.target.value)}
                    required
                    autocomplete="off"
                    />
                </div> 
                <div>
                    <button className={styles.submit_btn}>Add to Collection</button>
                </div>
            </div>
        </form>
        <form onSubmit={bookshelfSubmitHandler}>
        <div className={styles.bookForm}>
            <h1 className={styles.form_title}>Add to your Bookshelf!</h1>
            <div>
                <h4 className={styles.input_title}>Title of Book/Article:</h4>
                <input 
                name="book/article" 
                type="text" 
                className={styles.entry_box}
                value={article_title_bookshelf}
                onChange={(e) => set_article_title_bookshelf(e.target.value)}
                required
                autocomplete="off"
                />
            </div>
            <div>
                <h4 className={styles.input_title}>Name of the author/writer:</h4>
                <input 
                name="author" 
                type="text" 
                className={styles.entry_box}
                value={author_name_bookshelf}
                onChange={(e) => set_author_name_bookshelf(e.target.value)}
                required
                autocomplete="off"
                />
            </div>
            <div>
                <h4 className={styles.input_title}>Genre:</h4>
                <select 
                name="genre" 
                type="text" 
                className={styles.entry_box}
                value={genre_bookshelf}
                onChange={(e) => set_genre_bookshelf(e.target.value)}
                required
                >
                    <option></option>
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
                    <option>Historicl Fiction</option>
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
            </div>
                <div>
                    <button className={styles.submit_btn}>Add to Bookshelf</button>
                </div>
        </div>
    </form>
    </div>
    </div>
    )
}

export default NewEntryForms;