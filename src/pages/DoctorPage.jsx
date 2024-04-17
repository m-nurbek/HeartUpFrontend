import { Avatar } from "antd";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { UserOutlined } from '@ant-design/icons';


export default function DoctorPage() {
    return (
        <>
            <Navbar />

            <div className="doctor_page">
                <SideMenu />
                <main className="doctor_page__info">
                    <div className="doctor_page__info__brief">
                        <Avatar size={200} shape="square" icon={<UserOutlined />} />
                        <div>
                            <h1>Doctor Name</h1>
                            <p>cardiologist</p>
                            <p>National Research Cardiac Surgery Center</p>
                        </div>
                    </div>
                    <div className="doctor_page__info__aboutme">
                        <h2>About me</h2>
                        <p>
                            Certainly, I'd be delighted to help craft an "About Me" section for you. However, I'll need a bit more information to tailor it
                            specifically to your needs. Could you provide some details such as your interests, profession, hobbies, or any unique qualities or experiences you'd like to highlight?
                            This will help me create a personalized and engaging text that reflects your true self.
                        </p>
                    </div>
                    <div className="doctor_page__info__contacts">
                        <h2>Contacts</h2>
                        <p>doctor.email@outlook.com</p>
                        <p>+7 322 121 2324</p>
                    </div>
                </main>
            </div>
        </>
    );
}