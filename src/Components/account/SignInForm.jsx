import { useState } from "react";
import { useUserDispatch } from "../../contexts/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserServices";
import { Link } from "react-router-dom";
import "../../Styles/sign-in-up.css";


export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userDispatch = useUserDispatch()
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies()
    const navigate = useNavigate()
    const [response, setResponse] = useState(false)

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        let apiData = {
            email: email,
            password: password
        }

        const loginResult = await loginUser(apiData)
        const token = loginResult.token
        const localData = loginResult.data
        if (token) {
            userDispatch({
                type: "login",
                data: localData
            })
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7)

            // set cookie with data
            setCookie('authorization', token, {path: '/', secure: true, expires: expirationDate})
            setResponse(loginResult.message)

            setTimeout(() => {
                setResponse(false)
                navigate('/')
            }, 2000)
        } else {
            setResponse(loginResult.error)
        }
        
    }

 

    return (
        <div className="sign-in-body">
            <form onSubmit={handleFormSubmit}>
                
                <label className="credentials-label">Email</label> <br />
                <input className="credentials-field" type="text" onChange={handleEmailChange}></input> <br />

                <label className="credentials-label" >Password</label> <br />
                <input className="credentials-field" type="password" onChange={handlePasswordChange}></input> <br />
                {response && <p className="incorrect-pw" >{response} <br /> <Link className="forgot-pw" to={''}>I forgot my password</Link></p>}
                
                <Link className="cancel-link" to={`/`} >CANCEL</Link><br />
                <button className="signin-btn" type="submit">SIGN IN</button>

                <p className="dont-have-an-account" ><span className="new-to-text">New to MinimaList?</span><Link className="sign-up-link" to={`/sign-up`}>Join now</Link></p> 
            
            </form>
            
        </div>
    )
}