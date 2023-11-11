import { useState } from "react";
import axios from "axios";
import styles from "./auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";


function Login() {
  const navigate = useNavigate()

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  let user = sessionStorage.getItem("username");
  let user_id = sessionStorage.getItem("id");
  
  const login = (e) => {
    e.preventDefault();
    console.log(username, password)
    
    
    if (username === "") {
      alert("Enter username.")
    } else if (password === "") {
      alert("Must enter password.")
    } else {
      axios.post("http://localhost:4040/login", { username, password })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("id", res.data.id);
        navigate("/homeScreen", { state: { key: Math.random() } });
      })
      .catch((err) => {
        if (err.response && err.response.request && err.response.request.response) {
          alert(err.response.request.response);
        } else {
          alert("An error occurred while making the request.");
        }
      });
    }
    
    
  }
  


    return (
      <main>
        <Header />
      <div className={styles.login_form}>
        <div className={styles.form_container}> 
          <form className={styles.form} onSubmit={login}>
            <h1 className={styles.welcome}>WELCOME</h1>
            <input 
            className={styles.form_input}
            placeholder="Username"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            autocomplete="off"
            />
            <input 
            className={styles.form_input}
            placeholder="Password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="off"
            />
            <button className={styles.login_btn}>Login</button>
          </form>
      </div>
        <nav>
            <Link to="/signup">
                <button className={styles.question_btn}>
                Click here to Sign-Up
                </button>
            </Link>
        </nav>
      </div>
      </main>
    )
}

export default Login;