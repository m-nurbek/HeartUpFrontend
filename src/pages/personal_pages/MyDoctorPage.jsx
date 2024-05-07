import LayoutComponent from "../../components/Layout.jsx";
import {useEffect, useState} from "react";
import {getPersonalDoctorInfo} from "../../api/handleDoctors.jsx";
import {Button, Card, Descriptions, Divider, Flex, Image, Tabs, Typography} from "antd";
import LoadingPage from "../LoadingPage.jsx";
import getSpecializationTitle from "../../api/constants/specializations.js";
import {useParams} from "react-router-dom";
import {getMyUserInfo} from "../../api/handleAuthentication.jsx";
import {ChangePersonalInfoModal} from "../../components/ChangePersonalInfoModal.jsx";


const cardStyle = {
    width: 620,
};

const imgStyle = {
    display: 'block',
    border: '1px solid #f0f0f0',
    objectFit: 'cover',
};

export default function MyDoctorPage() {
    const [doctor, setDoctor] = useState(null);
    const {doctorId} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setUser(await getMyUserInfo());

            const response = await getPersonalDoctorInfo();
            console.log("PERSONAL DOCTOR", response)
            setDoctor(response);
        };

        fetchData();
    }, [doctorId]);

    return (
        <LayoutComponent>
            {doctor ? (
                <main>
                    <h2 style={{
                        fontWeight: '500',
                        margin: '1rem 0'
                    }}>Personal Information</h2>
                    <Divider/>
                    <ChangePersonalInfoModal/>
                    <Card hoverable style={cardStyle} styles={{body: {padding: 0, overflow: 'hidden', cursor:'default'}}}>
                        <Flex justify="space-between">
                            <Image
                                width={300}
                                height={300}
                                alt="avatar"
                                src={doctor.photo ? doctor.photo : '/doctorImage.jpg'}
                                style={imgStyle}
                            />
                            <Flex vertical align="flex-end" justify="space-between" style={{padding: 32}}>
                                <Typography.Title level={2}>
                                    {doctor.first_name} {doctor.last_name}
                                </Typography.Title>
                                <Typography.Text>
                                    {getSpecializationTitle(doctor.specialization)}
                                </Typography.Text>
                                <Typography.Text>
                                    {doctor.work_location}
                                </Typography.Text>

                                <Button
                                    type="primary"
                                    disabled={user.role === "DOCTOR" || user.role === "ADMIN"}
                                >
                                    Book An Appointment
                                </Button>
                            </Flex>
                        </Flex>
                    </Card>
                    <Tabs
                        defaultActiveKey="1"
                        type="card"
                        size={'large'}
                        style={{
                            fontSize: '1.1rem',
                            marginTop: '1.4rem',
                        }}
                        items={[
                            {
                                key: '1',
                                label: 'Overview',
                                children: <p>{doctor.aboutme}</p>
                            },
                            {
                                key: '2',
                                label: 'Contacts',
                                children:
                                    <Descriptions title=""
                                                  layout={"vertical"}
                                                  bordered
                                                  contentStyle={{
                                                      fontSize: '1rem',
                                                  }}
                                    >
                                        <Descriptions.Item label="Phone Number">{doctor.phone}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{doctor.email}</Descriptions.Item>
                                    </Descriptions>,
                            },
                            {
                                key: '3',
                                label: 'Available Appointments',
                                children: <p>Monday - Friday<br/>(9am - 6pm)</p>
                            },
                        ]}
                    />
                </main>
            ) : <LoadingPage/>
            }
        </LayoutComponent>
    );
}