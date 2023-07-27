import SignInForm from "../../Components/account/SignInForm";
import { Link } from "react-router-dom";
//import PasswordResetEmailComponent from "../../Components/account/PasswordResetEmail";

export default function SignInPage() {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", flexDirection: "column", alignItems: "center", color:"#f2f2f2" }}>
            <h1>Sign in</h1> <br />
            <SignInForm />
            <Link to={''}>I forgot my password</Link>
        </div>
    )
}