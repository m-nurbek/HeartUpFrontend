import { Button } from "antd";


export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar__logo">
                    <img className="navbar__logo__img" src="/HeartUpLogo.svg" alt="HeartUp Logo" />
                    <p className="navbar__logo__text">EARTUP</p>
                </div>
                <ul>
                    <li><Button type="link" style={{ fontSize: '1.1rem' }}>Logout</Button></li>
                </ul>
            </nav>
        </>
    );
}