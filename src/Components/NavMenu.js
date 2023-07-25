import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie"
import "../Styles/nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCheck, faUserGroup, faBars } from '@fortawesome/free-solid-svg-icons'
import { useUserData } from "../contexts/UserContext";
import { Link } from "react-router-dom";




function NavMenu() {
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
			<nav ref={navRef}>
				<div className="nav-body">
					<p className="nav-heading">{isLoggedIn ? `Hello, ${userData.name}` : "Hello"}!</p>

					{isLoggedIn ? (
						<Link className="nav-sub-heading" to="/">
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
						<a className="nav-my-lists" href="/#">
							<p className="nav-icons-my-lists">
							<FontAwesomeIcon icon={faList}/>
							</p>
								My Lists
						</a>

						<a className="nav-Completed" href="/completed">
							<p className="nav-icons-completed">
							<FontAwesomeIcon icon={faCheck}/>
							</p>
								Completed
						</a>

						{/* Conditionally render the "Groups" menu item */}
						{isLoggedIn && (
							<a className="nav-Groups" href="/groups">
							<p className="nav-icons-groups">
								<FontAwesomeIcon icon={faUserGroup} />
							</p>
							Groups
						</a>
							)}
						{isLoggedIn && (
							<a onClick={handleLogout} className="nav-Groups" href="/#">
							<p className="nav-icons-groups">
							</p>
							Logout
						</a>
							)}
				</div>	
				<button
					className="nav-btn"
					onClick={showNavbar}>
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FontAwesomeIcon icon={faBars} />
			</button>
		</header>
	);
}

export default NavMenu;