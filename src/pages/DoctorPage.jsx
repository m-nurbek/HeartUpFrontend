import { Avatar, Button, DatePicker, Form, Input, TimePicker } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { retrieveDoctor } from "../api/handleDoctors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import LayoutComponent from "../components/Layout.jsx";


export default function DoctorPage() {
    const [doctor, setDoctor] = useState(null);
    const { doctorId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await retrieveDoctor(doctorId)
            console.log("DOCTOR RESPONSE:", response)
            setDoctor(response);
        };

        fetchData();
    }, [doctorId]);

    return (
        doctor ?
            <>
                <LayoutComponent>
                    <main className="doctor_page__info">
                        <div className="doctor_page__info__brief">
                            <Avatar size={200} shape="square" icon={<UserOutlined />} src={doctor.photo && doctor.photo}
                                style={{
                                    border: '1px solid var(--color6)'
                                }}
                            />
                            <div>
                                <h1>{doctor.first_name} {doctor.last_name}</h1>
                                <p>{doctor.specialization}</p>
                                <p>{doctor.work_location}</p>
                                <Button
                                    type="default"
                                    style={{
                                        marginTop: '1rem',
                                        fontSize: '1rem',
                                        paddingBottom: '2rem',
                                    }}
                                >Make An Appointment</Button>
                            </div>
                        </div>
                        <section>
                            <div className="doctor_page__info__aboutme">
                                <h2>About me</h2>
                                <p>
                                    {doctor.aboutme}
                                </p>
                            </div>
                            <div className="doctor_page__info__contacts">
                                <h2>Contacts</h2>
                                <p>{doctor.email}</p>
                                <p>{doctor.phone}</p>
                            </div>
                            <div className="doctor_page__info__workinghours">
                                <h2>Working hours</h2>
                                <p>Monday - Friday<br />(9am - 6pm)</p>
                            </div>
                            <div className="appointment_booking">
                                <h2>Book An Appointment</h2>
                                <Form variant="filled" style={{ maxWidth: 600 }}>
                                    <Form.Item
                                        label="Pick date"
                                        name="DatePicker"
                                        rules={[{ required: true, message: 'Please input!' }]}
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                        label="Pick time"
                                        name="PickTime"
                                        rules={[{ required: true, message: 'Please input!' }]}
                                    >
                                        <TimePicker minuteStep={30} hourStep={1} format={'HH:mm a'}
                                            disabledHours={() => {
                                                const hours = [];
                                                for (let i = 0; i < 9; i++) {
                                                    hours.push(i);
                                                }
                                                for (let i = 18; i < 24; i++) {
                                                    hours.push(i);
                                                }
                                                return hours;
                                            }}
                                            disabledMinutes={(selectedHour) => {
                                                if (selectedHour < 9 || selectedHour >= 18) {
                                                    return Array.from({ length: 60 }, (_, i) => i);
                                                }
                                                return [];
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Comments" name="Input">
                                        <Input.TextArea />
                                    </Form.Item>
                                    <Button size={'large'} type="primary" htmlType="submit">
                                        Send
                                    </Button>
                                </Form>
                            </div>
                        </section>
                    </main>

                </LayoutComponent>
            </>
            : <LoadingPage />
    );
}