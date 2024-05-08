import {useEffect, useState} from "react";
import {Button, Card, Descriptions, Divider, message, Spin, Typography} from "antd";
import {
    approveAppointment,
    getApprovedAppointmentsDoctor,
    getPendingAppointmentsDoctor, rejectAppointment
} from "../api/handleAppointments.jsx";
import dayjs from "dayjs";


export default function AppointmentRequests({onApprovedRequestsChange}) {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setPendingRequests(await getPendingAppointmentsDoctor());
            setApprovedRequests(await getApprovedAppointmentsDoctor());
            setLoading(false);
        }
        fetch();
    }, []);

    useEffect(() => {
        if (onApprovedRequestsChange) {
            onApprovedRequestsChange(approvedRequests);
        }
    }, [approvedRequests]);

    const handleAcceptAppointment = async (appointment_id) => {
        messageApi.loading('Approving appointment...', 0);
        const response = await approveAppointment(appointment_id);
        if (response) {
            messageApi.destroy()
            messageApi.open({
                type: 'success',
                content: 'Successfully approved the appointment!',
                duration: 5,
            });
        }
        setPendingRequests(pendingRequests.filter(request => request.id !== appointment_id));
        setApprovedRequests([...approvedRequests, pendingRequests.find(request => request.id === appointment_id)]);
    }

    const handleRejectAppointment = async (appointment_id) => {
        messageApi.loading('Rejecting appointment...', 0);
        const response = await rejectAppointment(appointment_id);
        if (response) {
            messageApi.destroy()
            messageApi.open({
                type: 'success',
                content: 'Successfully rejected the appointment!',
                duration: 5,
            });
        }
        setPendingRequests(pendingRequests.filter(request => request.id !== appointment_id));
    }

    return (
        loading ? <Spin/> :
            (<>
                {contextHolder}
                <Typography.Title level={3} style={{fontWeight: 400}}>Pending Requests</Typography.Title>
                {pendingRequests.length > 0 ? (
                    <>
                        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                            {pendingRequests.map((request, index) => (
                                <Card key={index} hoverable
                                      title={
                                          <Typography.Title level={4} style={{fontWeight: 400}}>
                                              {request.patient_first_name + " " + request.patient_last_name}
                                          </Typography.Title>}
                                      style={{width: '250px', backgroundColor: '#e0ebff', border: '1px solid #d9d9d9'}}
                                      styles={{body: {padding: '1rem'}, title: {textAlign: 'center'}}}
                                >
                                    <Descriptions>
                                        <Descriptions.Item label="Email" style={{
                                            display: 'block',
                                            width: 'fit-content',
                                            margin: '0 auto',
                                            padding: '0.2rem 0'
                                        }}>
                                            {request.patient_email}</Descriptions.Item>
                                        <Descriptions.Item label="Date" style={{
                                            display: 'block',
                                            width: 'fit-content',
                                            margin: '0 auto',
                                            padding: '0.2rem 0'
                                        }}>
                                            {dayjs(request.date).toDate().toDateString()}</Descriptions.Item>
                                        <Descriptions.Item label="Time" style={{
                                            display: 'block',
                                            width: 'fit-content',
                                            margin: '0 auto',
                                            padding: '0.2rem 0'
                                        }}>
                                            {request.start_time.slice(0, 5)} - {request.end_time.slice(0, 5)}</Descriptions.Item>
                                    </Descriptions>
                                    <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem'}}>
                                        <Button type={"primary"}
                                                onClick={() => handleAcceptAppointment(request.id)}>Accept</Button>
                                        <Button onClick={() => handleRejectAppointment(request.id)}>Reject</Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>) : (
                    <p>No pending requests</p>
                )}

                <Divider/>

                <Typography.Title level={3} style={{fontWeight: 400}}>Approved Requests</Typography.Title>
                {approvedRequests.length === 0 && <p>No approved requests</p>}
                <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                    {approvedRequests.map((request, index) => (
                        <Card key={index} hoverable
                              title={<Typography.Title level={4} style={{fontWeight: 400}}>
                                  {request.patient_first_name + " " + request.patient_last_name}
                              </Typography.Title>}
                              style={{width: '250px', backgroundColor: '#f0f0f0', border: '1px solid #d9d9d9'}}
                              styles={{body: {padding: '1rem'}, title: {textAlign: 'center'}}}
                        >
                            <Descriptions>
                                <Descriptions.Item label="Email" style={{
                                    display: 'block',
                                    width: 'fit-content',
                                    margin: '0 auto',
                                    padding: '0.2rem 0'
                                }}>
                                    {request.patient_email}</Descriptions.Item>
                                <Descriptions.Item label="Date" style={{
                                    display: 'block',
                                    width: 'fit-content',
                                    margin: '0 auto',
                                    padding: '0.2rem 0'
                                }}>
                                    {dayjs(request.date).toDate().toDateString()}</Descriptions.Item>
                                <Descriptions.Item label="Time" style={{
                                    display: 'block',
                                    width: 'fit-content',
                                    margin: '0 auto',
                                    padding: '0.2rem 0 1rem'
                                }}>
                                    {request.start_time.slice(0, 5)} - {request.end_time.slice(0, 5)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    ))}
                </div>
            </>)
    );
}