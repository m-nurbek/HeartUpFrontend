import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar({ className, linkText, navigateTo = "/login" }) {
    const navigate = useNavigate();
    return (
        <>
            <nav className={className ? "navbar " + className : "navbar"} >
                <div className="navbar__logo">
                    <img className="navbar__logo__img" src="/HeartUpLogo.svg" alt="HeartUp Logo" />
                    <p className="navbar__logo__text" onClick={() => { navigate("/") }}>EARTUP</p>
                </div>
                <ul>
                    <li><Link type="link" style={{ fontSize: '1.1rem' }} to={navigateTo}>{linkText}</Link></li>
                </ul>
            </nav>
        </>
    );
}