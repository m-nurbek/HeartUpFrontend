import React, {useState} from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {useNavigate} from "react-router-dom";


const {Header, Content, Sider} = Layout;

const navbarItems = [
    {
        key: '1',
        label: 'Personal Page',
    },
    {
        key: '2',
        label: 'Log out',
    },
];

const sidebarItems = [
    {
        key: 'dashboard',
        icon: React.createElement(UserOutlined),
        label: 'Dashboard',
    },
    {
        key: 'patients',
        icon: React.createElement(LaptopOutlined),
        label: 'Patients',
        children: [
            {
                key: '5',
                label: 'Appointments',
            },
            {
                key: '6',
                label: 'All Patients',
            },
        ],
    },
    {
        key: 'sub3',
        icon: React.createElement(NotificationOutlined),
        label: 'Notifications',
    },
];

export default function LayoutComponent({children}) {
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
                        minWidth: '200px',
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
                        defaultSelectedKeys={['dashboard']}
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
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}