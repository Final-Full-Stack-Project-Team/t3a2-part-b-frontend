import NavMenu from "../Components/NavMenu";
import "../Styles/pages.css";
import { useState } from "react"

export default function Completed() {

    // State to track if the navigation menu is open or closed
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

    // Function to toggle the navigation menu state
    const toggleNavMenu = () => {
        setIsNavMenuOpen(prevState => !prevState);
    };


    return ( 
        <div>
            <div>
                {/* Pass the toggleNavMenu function and isNavMenuOpen state as props to NavMenu */}
                <NavMenu toggleNavMenu={toggleNavMenu} isNavMenuOpen={isNavMenuOpen} />
            </div>
            <div className="all-content">
                <div className={isNavMenuOpen ? "nav-closed" : "nav-open" }>
                    <header className="fake-header">
                        <p className="page-title">Completed</p>
                    </header>

                    {/* IMPORTANT! All page content goes in the body class */}

                    <div className="body">
                        <p>Completed list 1 test</p>
                        <p>Completed list 2 test</p>
                        <p>Completed list 3 test</p>
                        <p>Completed list 4 test</p>
                        <p>Completed list 5 test</p>
                        <p>Completed list 6 test</p>
                        <p>Completed list 7 test</p>
                    </div>
                </div>
            </div>
        </div>
    )
}