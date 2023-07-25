import { useState } from "react";
import { useUserDispatch } from "../../contexts/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserServices";
import { Link } from "react-router-dom";


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
            console.log(loginResult.response)
        }
        
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Email:</label>
                <input type="text" onChange={handleEmailChange}></input>
                <label>Password:</label>
                <input type="password" onChange={handlePasswordChange}></input> <br />
                <label>Don't have an account?</label> <br />
                <Link to={`/sign-up`}>SIGN UP</Link> <br />
                <Link to={`/`}>CANCEL</Link>
                <button type="submit">SIGN IN</button>
            </form>
            {response && <p>{response}</p>}
        </div>
    )
}