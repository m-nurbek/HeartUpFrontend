import LayoutComponent from "../components/Layout.jsx";
import {Button, Card, Divider, Steps, theme, Typography} from "antd";
import {useEffect, useState} from "react";
import {
    getAcceptedAppointmentsByPatient,
    getPendingAppointmentsByPatient,
    getRejectedAppointmentsByPatient
} from "../api/handleAppointments.jsx";


function formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toDateString(undefined, options);
}

export default function PatientAppointmentsPage() {
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [rejectedRequests, setRejectedRequests] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setPendingRequests(await getPendingAppointmentsByPatient());
            setApprovedRequests(await getAcceptedAppointmentsByPatient());
            setRejectedRequests(await getRejectedAppointmentsByPatient());
        }
        fetch();
    }, [])

    const steps = [
        {
            title: 'Pending Requests',
            content: <>
                <div style={{display:'flex', flexWrap:'wrap', gap:'1rem', padding: '1rem', minHeight: '200px'}}>
                    {pendingRequests && pendingRequests.length > 0 ? pendingRequests.map((request, index) => {
                        return (
                            <Card key={index} hoverable style={{height:'fit-content'}}>
                                <Typography.Title level={4} style={{fontWeight:400}}>{request.doctor_first_name} {request.doctor_last_name}</Typography.Title>
                                <Typography.Text style={{display:'block', padding:'0.5rem 0'}}>{formatDate(request.date)}</Typography.Text>
                                <Typography.Text style={{display:'block'}}>{request.start_time.slice(0, 5)} - {request.end_time.slice(0, 5)}</Typography.Text>
                            </Card>
                        )
                    }) : <Typography.Text style={{display:'block'}}>No pending requests</Typography.Text>}
                </div>
            </>,
        },
        {
            title: 'Approved Requests',
            content: <>
                <div style={{display:'flex', flexWrap:'wrap', gap:'1rem', padding: '1rem', minHeight: '200px'}}>
                    {approvedRequests && approvedRequests.length > 0 ? approvedRequests.map((request, index) => {
                        return (
                            <Card key={index} hoverable style={{height:'fit-content', backgroundColor: '#d4edda', border:'2px solid #c3e6cb'}}>
                                <Typography.Title level={4} style={{fontWeight:400}}>{request.doctor_first_name} {request.doctor_last_name}</Typography.Title>
                                <Typography.Text style={{display:'block', padding:'0.5rem 0'}}>{formatDate(request.date)}</Typography.Text>
                                <Typography.Text style={{display:'block'}}>{request.start_time.slice(0, 5)} - {request.end_time.slice(0, 5)}</Typography.Text>
                            </Card>
                        )
                    }) : <Typography.Text style={{display:'block'}}>No approved requests</Typography.Text>}
                </div>
            </>,
        },
        {
            title: 'Rejected Requests',
            content: <>
                <div style={{display:'flex', flexWrap:'wrap', gap:'1rem', padding: '1rem', minHeight: '200px'}}>
                    {rejectedRequests && rejectedRequests.length > 0 ? rejectedRequests.map((request, index) => {
                        return (
                            <Card key={index} hoverable style={{height:'fit-content', backgroundColor: '#f8d7da', border:'2px solid #f5c6cb'}}>
                                <Typography.Title level={4} style={{fontWeight:400}}>{request.doctor_first_name} {request.doctor_last_name}</Typography.Title>
                                <Typography.Text style={{display:'block', padding:'0.5rem 0'}}>{formatDate(request.date)}</Typography.Text>
                                <Typography.Text style={{display:'block'}}>{request.start_time.slice(0, 5)} - {request.end_time.slice(0, 5)}</Typography.Text>
                            </Card>
                        )
                    }) : <Typography.Text style={{display:'block'}}>No rejected requests</Typography.Text>}
                </div>
            </>,
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <LayoutComponent>
                <h2 style={{
                    fontWeight: '500',
                    margin: '1rem 0'
                }}>Appointments</h2>
                <Divider/>

                <Steps current={current} items={items}/>
                <div style={contentStyle}>{steps[current].content}</div>
                <div style={{marginTop: 24}}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </LayoutComponent>
        </>
    );
}