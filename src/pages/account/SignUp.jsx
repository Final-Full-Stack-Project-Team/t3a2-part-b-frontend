import SignUp from "../../Components/account/SignUpForm"

export default function SignUpPage() {
    return(
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", flexDirection: "column", alignItems: "center" }}>
            <h1>Sign up</h1>

            <SignUp />
        </div>
    )
}