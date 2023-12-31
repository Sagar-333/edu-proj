import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Saly10 from "../../assets/login_register/Saly-10.svg";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import './login.css'

const login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
 })

 const {dispatch} = useContext(AuthContext)
 const navigate = useNavigate()

 const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
 }

 const handleClick = async e => {
    e.preventDefault()

    dispatch({type:'LOGIN_START'})

    try {
       const res = await fetch(`${BASE_URL}/auth/login`, {
          method:'post',
          headers: {
             'content-type':'application/json'
          },
          credentials:'include',
          body: JSON.stringify(credentials)
       })

       const result = await res.json()
       if(!res.ok) alert(result.message)
       console.log(result.data)

       dispatch({type:"LOGIN_SUCCESS", payload:result.data})
       navigate('/')
    } catch(err) {
       dispatch({type:"LOGIN_FAILURE", payload:err.message})
    }
 }
  return (
    <div className="container__login">
      <div className="login__row">
        <div className="login__col">
          <div className="login__col__1">
            <img src={Saly10} alt="Login illustration" />
          </div>
        </div>
        <div className="login__col">
          <div className="login__col__2">
            <h2>Sign in to your account</h2>
            <form onSubmit={ handleClick }>
              <div className="name">
                <label htmlFor="email">Your Email</label><br />
                <input type="email" name="email" id="email" placeholder="abc@example.com" onChange={handleChange} required />
                <div className="iconName"><i className="fa-solid fa-envelope"></i></div>
              </div>
              <br />
              <div className="name">
                <label htmlFor="password">Password</label><br />
                <input type="password" name="password" id="password" placeholder="password" onChange={handleChange} required />
                <div className="iconName"><i className="fa-solid fa-lock"></i></div>
              </div>
              <br />
              <div className="checkbox">
                <input type="checkbox" id="checkbox" name="checkbox" required />
                <label htmlFor="checkbox">Remember me </label>
                <input id="submit" type="submit" value="Sign in →" />
              </div>
              <br />
              <div className="signup-section">
                <hr className="signup-line" />
                <span className="signup-text">SIGNIN WITH</span>
                <hr className="signup-line" />
              </div>
              <div className="login__links">
                <a href="#" className="google-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google google-logo"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  Google
                </a>
                <a href="#" className="facebook-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </form>
            <p>Don't have an account? <Link to='/register'>Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
