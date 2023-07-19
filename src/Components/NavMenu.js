import { useRef } from "react";
import "../Styles/nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCheck, faUserGroup, faBars } from '@fortawesome/free-solid-svg-icons'


function NavMenu() {
	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"nav_container"
		);
	};
	return (
		<header>
			<nav ref={navRef}>
				<div className="nav-body">
					<p className="nav-heading">Hi, User!</p>

						<a className="nav-sub-heading" href="/#">
								GROUPS
							<span className="nav-sub-heading-arrow">&#62;</span>
							<br />
							<p className="nav-sub-heading-sub-text">
								Log in to share your lists
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

						<a className="nav-Groups" href="/#">
							<p className="nav-icons">
							<FontAwesomeIcon icon={faUserGroup}/>
							</p>
								Groups
						</a>
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