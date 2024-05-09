import React, {useEffect, useState} from 'react';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {getMyUserInfo, useLogout} from "../api/handleAuthentication.jsx";


const {Header, Content, Sider, Footer} = Layout;

export default function LayoutComponent({children}) {
    const logout = useLogout();
    const [myInfo, setMyInfo] = useState(null);
    const [siderSelectedKey, setSiderSelectedKey] = useState(['dashboard']);
    const [personalPageLink, setPersonalPageLink] = useState('/my/doctors/');
    const [appointmentLink, setAppointmentLink] = useState('/appointments/');


    const sidebarItems = [
        {
            key: 'dashboard',
            icon: React.createElement(UserOutlined),
            label: <Link to={personalPageLink} onClick={() => {
                setSiderSelectedKey(['dashboard']);
            }}>Profile</Link>,
        },
        {
            key: 'patients',
            icon: React.createElement(LaptopOutlined),
            label: 'Hospital',
            children: myInfo && myInfo.role === 'DOCTOR' ? [
                {
                    key: '5',
                    label: <Link to={appointmentLink} onClick={() => {
                        setSiderSelectedKey(['5']);
                    }}>My Appointments</Link>,
                },
                {
                    key: '6',
                    label: <Link to={"/patients"} onClick={() => {
                        setSiderSelectedKey(['6']);
                    }}>Patients</Link>,
                },
                {
                    key: '7',
                    label: <Link to={"/doctors"} onClick={() => {
                        setSiderSelectedKey(['7']);
                    }}>Doctors</Link>,
                },
            ] : [
                {
                    key: '5',
                    label: <Link to={appointmentLink} onClick={() => {
                        setSiderSelectedKey(['5']);
                    }}>My Appointments</Link>,
                },
                {
                    key: '7',
                    label: <Link to={"/doctors"} onClick={() => {
                        setSiderSelectedKey(['7']);
                    }}>Doctors</Link>,
                },
            ],
        },
        // {
        //     key: 'sub3',
        //     icon: React.createElement(NotificationOutlined),
        //     label: 'Notifications',
        // },
    ];

    const getMyUserInfoFunc = () => {
        const func = async () => {
            const user = await getMyUserInfo();
            setMyInfo(user);
            if (user.role === 'DOCTOR') {
                setPersonalPageLink('/my/doctors/');
                setAppointmentLink('/appointments/')
            } else {
                setPersonalPageLink('/my/patients/');
                setAppointmentLink('/patient/appointments/')
            }
        }

        func();
    }

    useEffect(() => {
        getMyUserInfoFunc();
    }, []);

    const navbarItems = [
        {
            key: '1',
            label: myInfo && `Hello, ${myInfo.role === 'DOCTOR' ? 'Dr.' : ''} ${myInfo.first_name}!`,
        },
        {
            key: '2',
            label: 'Log out',
            onClick: async () => {
                await logout()
            },
        },
    ];

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div className="navbar__logo navbar__logo--white">
                    <img className="navbar__logo__img" src="/HeartUpLogo.svg" alt="HeartUp Logo"/>
                    <p className="navbar__logo__text" onClick={() => {
                        navigate("/")
                    }}>EARTUP</p>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={navbarItems}
                    style={{
                        minWidth: '300px',
                        width: 'fit-content',
                        display: 'flex',
                        justifyContent: 'end',
                        gap: '0.5rem',
                        fontSize: '1rem',
                    }}
                />
            </Header>
            <Layout>
                <Sider
                    collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                    width={240}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        theme={'dark'}
                        mode="inline"
                        defaultSelectedKeys={siderSelectedKey}
                        defaultOpenKeys={['patients']}
                        style={{
                            height: '100%',
                            borderRight: 0,
                            fontSize: '1rem',
                        }}
                        items={sidebarItems}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            marginTop: '1.6rem',
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            fontSize: '1rem',
                        }}
                    >
                        {children}
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        ©{new Date().getFullYear()} Created by Nurbek Malikov
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}