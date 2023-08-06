import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie"
import "../Styles/nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCheck, faUserGroup, faBars, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useUserData } from "../contexts/UserContext";
import { Link } from "react-router-dom";

function NavMenu({ toggleNavMenu, isNavMenuOpen }) {
	// Local state variables saved here
	// eslint-disable-next-line
	const [cookies, setCookie, removeCookie] = useCookies()
	const navRef = useRef();
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"nav_container"
		);
	};

	const userData = useUserData()

useEffect(() => {
	if (cookies.authorization) {
		setIsLoggedIn(true)
	}
	// eslint-disable-next-line
	},[userData])

const handleLogout = () => {
	removeCookie('authorization')
	localStorage.clear()
	setIsLoggedIn(false)
}

	return (
		<header>
			<nav ref={navRef} className={isNavMenuOpen ? "nav_container" : ""}>
				<div className="nav-body">
					<p className="nav-heading">{isLoggedIn ? `Hello, ${userData.name}` : "Hello"}!</p>

					{isLoggedIn ? (
						<Link className="nav-sub-heading" to="/groups">
							GROUPS <span className="nav-sub-heading-arrow"> &#62;</span>
							<br />
							<p className="nav-sub-heading-sub-text">
							Create Groups to share your lists
							</p>
						</Link>
						) : (
						<Link className="nav-sub-heading" to="/sign-in">
							LOGIN <span className="nav-sub-heading-arrow"> &#62;</span>
							<br />
							<p className="nav-sub-heading-sub-text">
							Log in to share your lists
							</p>
						</Link>
						)}
						<Link className="nav-my-lists" to="/">
							<p className="nav-icons-my-lists">
							<FontAwesomeIcon icon={faList}/>
							</p>
								My Lists
						</Link>

						<Link className="nav-Completed" to="/completed">
							<p className="nav-icons-completed">
							<FontAwesomeIcon icon={faCheck}/>
							</p>
								Completed
						</Link>

						{/* Conditionally render the "Groups" menu item */}
						{isLoggedIn && (
							<Link className="nav-Groups" to="/groups">
								<p className="nav-icons-groups">
								<FontAwesomeIcon icon={faUserGroup} />
							</p>
							Groups
						
						</Link>
							)}
						{isLoggedIn && (
						<Link onClick={handleLogout} className="nav-logout" to="/">
							<p className="nav-icons-logout" title="Sign out">
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
							</p>
							Logout
						</Link>
							)}
				</div>	
				<button
					className="nav-btn"
					onClick={showNavbar}>
				</button>
			</nav>
			<button
                className="nav-btn"
				// Use the toggleNavMenu function from props
                onClick={toggleNavMenu}> 
                <FontAwesomeIcon icon={faBars} />
            </button>
		</header>
	);
}

export default NavMenu;