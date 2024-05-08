import {Button, Card, Form, Input} from "antd";
import Navbar from "../components/Navbar";
import {useLogin} from "../api/handleAuthentication.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export default function LoginPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const login = useLogin();


    const onFinish = async (values) => {
        const {email, password} = values;
        try {
            const response = await login(email, password);

            if (response.role === 'DOCTOR') {
                navigate("/my/doctors")
            } else if (response.role === "PATIENT") {
                navigate("/my/patients")
            }
        } catch (error) {
            setErrorMessage('Incorrect email or password. Please try again.')
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Navbar className='navbar--fixed'/>
            <div className="login_form">
                <Card
                    title={<p style={{textAlign: 'center', fontSize: '1.2rem'}}>Login</p>}
                    className="login_form__card"
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        {errorMessage && <div style={{
                            color: 'red',
                            margin: '0 auto',
                            marginTop: '10px',
                            width: 'fit-content'
                        }}>{errorMessage}</div>}
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        </>
    );
}