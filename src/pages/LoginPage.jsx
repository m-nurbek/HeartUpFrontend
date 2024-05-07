import {Button, Card, Form, Input} from "antd";
import Navbar from "../components/Navbar";
import {useLogin} from "../api/handleAuthentication.jsx";
import {useNavigate} from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate();

    const login = useLogin();


    const onFinish = async (values) => {
        const {email, password} = values;
        try {
            const response = await login(email, password);
            console.log("Success:", response);

            if (response.role === 'DOCTOR') {
                navigate("/my/doctors")
            } else if (response.role === "PATIENT") {
                navigate("/my/patients")
            }
        } catch (error) {
            console.log("Failed:", error);
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