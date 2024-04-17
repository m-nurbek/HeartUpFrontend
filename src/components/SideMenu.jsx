import { Link } from "react-router-dom";


export default function SideMenu({ activeItem = "myprofile" }) {

    return (
        <>
            <ul className="sidemenu">
                <li className={`sidemenu__item ${activeItem === "myprofile" ? "sidemenu__item--focused" : ""}`} name="myprofile">
                    <Link to="/doctor">My Profile</Link>
                </li>
                <li className={`sidemenu__item ${activeItem === "schedule" ? "sidemenu__item--focused" : ""}`} name="schedule">
                    <Link>Schedule</Link>
                </li>
                <li>
                    <Link> </Link>
                </li>
                <li className={`sidemenu__item ${activeItem === "patients" ? "sidemenu__item--focused" : ""}`} name="patients">
                    <Link to="/patients">Patients</Link>
                </li>
                <li className={`sidemenu__item ${activeItem === "support" ? "sidemenu__item--focused" : ""}`} name="support">
                    <Link>Support</Link>
                </li>
            </ul>
        </>
    );
}