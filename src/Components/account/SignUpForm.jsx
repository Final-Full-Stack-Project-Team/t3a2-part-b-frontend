import { useState } from "react"
import { useUserDispatch } from "../../contexts/UserContext"
import { createUser } from "../../services/UserServices"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom";

export default function SignUp() {
    
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['auth'])
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const userDispatch = useUserDispatch()

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    function handleNameChange (event) {
        setName(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        let apiData = {
            email: email,
            name: name,
            password: password
        }
        const createUserResult = await createUser(apiData)
        const token = createUserResult.token
        const localData = createUserResult.response
        console.log(localData)
        if (token) {
            userDispatch({
                type: "login",
                data: localData
            })

            // set token into a cookie
            // create and set an expiration date
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7)

            // set cookie with data
            setCookie('authorization', token, {path: '/', secure: true, expires: expirationDate})
            navigate('/')
        } else {
            setError(createUserResult.error)
        }
    }

    return (
        <div className="sign-in-body">
            <form onSubmit={handleFormSubmit}>

                <label className="credentials-label">Name:</label> <br />
                <input className="credentials-field" type="text" onChange={handleNameChange} /> <br />

                <label className="credentials-label">Email:</label> <br />
                <input className="credentials-field" type="text" onChange={handleEmailChange} /> <br />

                <label className="credentials-label">Password:</label> <br /> 
                <input className="credentials-field" type="password" onChange={handlePasswordChange} /> <br />
                {error && <p className="incorrect-pw">{error}</p>} <br />

                <Link to={`/`} className="cancel-link">CANCEL</Link><br />
                <button className="signin-btn" type="submit">JOIN</button>
                <p className="dont-have-an-account" ><span className="new-to-text">Already have an account?</span><Link className="sign-up-link" to={'/sign-in'} >Sign In</Link> </p>

                

                
                
            </form>
            
        </div>
    )
}