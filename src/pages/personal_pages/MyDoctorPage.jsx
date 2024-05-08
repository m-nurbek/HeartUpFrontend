import LayoutComponent from "../../components/Layout.jsx";
import {useEffect, useState} from "react";
import {getPersonalDoctorInfo} from "../../api/handleDoctors.jsx";
import {Button, Card, Descriptions, Divider, Flex, Image, Pagination, Tabs, Typography} from "antd";
import LoadingPage from "../LoadingPage.jsx";
import getSpecializationTitle from "../../api/constants/specializations.js";
import {useParams} from "react-router-dom";
import {getMyUserInfo} from "../../api/handleAuthentication.jsx";
import {ChangePersonalInfoModal} from "../../components/ChangePersonalInfoModal.jsx";
import DoctorTimeSlot from "../../components/DoctorTimeSlot.jsx";
import {CreateNewTimeSlot} from "../../components/CreateNewTimeSlot.jsx";
import {getMyTimeSlotsDoctor} from "../../api/handleAppointments.jsx";


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
    const [myTimeSlots, setMyTimeSlots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            setUser(await getMyUserInfo());
            setDoctor(await getPersonalDoctorInfo());
            const timeSlots = await getMyTimeSlotsDoctor();
            setMyTimeSlots(Array.isArray(timeSlots) ? timeSlots : []);
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
                    <Card hoverable style={cardStyle}
                          styles={{body: {padding: 0, overflow: 'hidden', cursor: 'default'}}}>
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
                        defaultActiveKey="3"
                        type="card"
                        size={'large'}
                        style={{
                            fontSize: '1.1rem',
                            marginTop: '3rem',
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
                                label: 'Time Slots',
                                children: <>
                                    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                                        <CreateNewTimeSlot/>

                                        {myTimeSlots &&
                                            myTimeSlots
                                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                                .map((timeSlot, index) => (
                                                    <DoctorTimeSlot
                                                        key={index}
                                                        date={timeSlot.date}
                                                        start_time={timeSlot.start_time}
                                                        end_time={timeSlot.end_time}
                                                    />
                                                ))
                                        }
                                    </div>
                                    <Pagination
                                        style={{marginTop: '1rem', textAlign: 'center'}}
                                        current={currentPage}
                                        total={myTimeSlots.length}
                                        pageSize={itemsPerPage}
                                        onChange={handlePageChange}
                                    />
                                </>
                            },
                        ]}
                    />
                </main>
            ) : <LoadingPage/>
            }
        </LayoutComponent>
    );
}