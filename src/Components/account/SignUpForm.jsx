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
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Email:</label> <br />
                <input type="text" onChange={handleEmailChange} /> <br />

                <label>Password:</label> <br /> 
                <input type="password" onChange={handlePasswordChange} /> <br />

                <label>Name:</label> <br />
                <input type="text" onChange={handleNameChange} /> <br />

                <p>Already have an account?</p>
                <Link to={'/sign-in'} >SIGN IN</Link> 

                <Link to={`/`} style={{ display:"flex", justifyContent:"end", marginTop:"-20px" }}>CANCEL</Link><br />
                <button type="submit">SIGN UP</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}