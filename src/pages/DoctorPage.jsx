import {
    Button,
    Card,
    Typography,
    Divider,
    Flex,
    Tabs,
    Descriptions,
    Image, Pagination
} from "antd";
import {retrieveDoctor} from "../api/handleDoctors";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import LoadingPage from "./LoadingPage";
import LayoutComponent from "../components/Layout.jsx";
import getSpecializationTitle from "../api/constants/specializations.js";
import {getMyUserInfo} from "../api/handleAuthentication.jsx";
import {CreateNewTimeSlot} from "../components/CreateNewTimeSlot.jsx";
import DoctorTimeSlot from "../components/DoctorTimeSlot.jsx";
import {getTimeSlotsByDoctorId} from "../api/handleAppointments.jsx";
import TimeSlotSelectionModal from "../components/TimeSlotSelectionModal.jsx";


const cardStyle = {
    width: 620,
};

const imgStyle = {
    display: 'block',
    border: '1px solid #f0f0f0',
    objectFit: 'cover',
};

export default function DoctorPage() {
    const [doctor, setDoctor] = useState(null);
    const {doctorId} = useParams();
    const [user, setUser] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        const fetchData = async () => {
            setUser(await getMyUserInfo());
            setTimeSlots(await getTimeSlotsByDoctorId(doctorId));
            setDoctor(await retrieveDoctor(doctorId));
        };

        fetchData();
    }, [doctorId]);

    return (
        <>
            {doctor ? (
            <LayoutComponent>
                <main>
                    <h2 style={{
                        fontWeight: '500',
                        margin: '1rem 0'
                    }}>Doctor Info</h2>
                    <Divider/>
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
                                    onClick={() => setIsModalVisible(true)}
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
                                children: <>
                                    <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                                        <CreateNewTimeSlot/>

                                        {timeSlots  && Array.isArray(timeSlots) &&
                                            timeSlots
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
                                        total={timeSlots.length}
                                        pageSize={itemsPerPage}
                                        onChange={handlePageChange}
                                    />
                                </>
                            },
                        ]}
                    />
                </main>
            </LayoutComponent>) : <LoadingPage/>}

            <TimeSlotSelectionModal setModalOpen={setIsModalVisible} modalOpen={isModalVisible} doctorId={doctorId}/>
        </>
    );
}