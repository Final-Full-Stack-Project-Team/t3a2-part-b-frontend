import { useRef } from "react";
import "../Styles/nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCheck, faUserGroup, faBars } from '@fortawesome/free-solid-svg-icons'


function NavMenu() {
	const navRef = useRef();
	const isLoggedIn = userData(9, 1);
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"nav_container"
		);
	};
function userData(z, y) {
  if (z + y === 10) {
    return true;
  } else {
    return false;
  }
}

	return (
		<header>
			<nav ref={navRef}>
				<div className="nav-body">
					<p className="nav-heading">{isLoggedIn ? "Hello, Luke" : "Hello"}!</p>

						<a className="nav-sub-heading" href="/#">
								{isLoggedIn ? "GROUPS " : "LOGIN "}
							<span className="nav-sub-heading-arrow"> &#62;</span>
							<br />
							<p className="nav-sub-heading-sub-text">
								{isLoggedIn ? "Create Groups to share your lists" : "Log in to share your lists "}	
							</p>
						</a>

						<a className="nav-my-lists" href="/#">
							<p className="nav-icons">
							<FontAwesomeIcon icon={faList}/>
							</p>
								My Lists
						</a>

						<a className="nav-Completed" href="/#">
							<p className="nav-icons">
							<FontAwesomeIcon icon={faCheck}/>
							</p>
								Completed
						</a>

						{/* Conditionally render the "Groups" menu item */}
						{isLoggedIn && (
							<a className="nav-Groups" href="/#">
							<p className="nav-icons">
								<FontAwesomeIcon icon={faUserGroup} />
							</p>
							Groups
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