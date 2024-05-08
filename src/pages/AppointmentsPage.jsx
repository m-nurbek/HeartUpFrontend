import LayoutComponent from "../components/Layout.jsx";
import {Calendar, Card, Divider, Typography, Spin} from "antd";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {getTimeSlotByDate} from "../api/handleAppointments.jsx";
import AppointmentRequests from "../components/AppointmentRequests.jsx";

export default function AppointmentsPage() {
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    const [timeSlotsByDate, setTimeSlotsByDate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [approvedRequests, setApprovedRequests] = useState([]);

    const handleApprovedRequestsChange = (approvedRequests) => {
        setApprovedRequests(approvedRequests);
    };

    useEffect(() => {
    }, [selectedValue]);

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
        const fetch = async () => {
            setIsLoading(true);

            const timeSlotsByDate = await getTimeSlotByDate(newValue.format('YYYY-MM-DD'));
            const filteredTimeSlots = timeSlotsByDate.filter(timeSlot =>
                !approvedRequests.some(approvedSlot =>
                    approvedSlot.start_time === timeSlot.start_time && approvedSlot.end_time === timeSlot.end_time
                )
            );
            setTimeSlotsByDate(filteredTimeSlots);
            setIsLoading(false);
        };
        fetch();
    };
    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <LayoutComponent>
                <h2 style={{
                    fontWeight: '500',
                    margin: '1rem 0'
                }}>Appointments</h2>
                <Divider/>

                <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', height: 'fit-content'}}>
                    <Calendar value={value} mode={"month"} fullscreen={false} onSelect={onSelect}
                              onPanelChange={onPanelChange}
                              style={{minWidth: '400px', maxWidth: '400px', flex: '30%', height: 'fit-content'}}
                    />
                    <div style={{flex: '70%', height: '100%', paddingLeft: '1rem'}}>
                        <Typography.Title level={4} style={{fontWeight: 400}}>Available slots</Typography.Title>

                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                            {isLoading ? <Spin style={{margin: '3rem'}}/> : (
                                timeSlotsByDate ? (timeSlotsByDate.length > 0 ? timeSlotsByDate.map((timeSlot, index) => (
                                    <Card
                                        key={index}
                                        style={{
                                            border: '1px solid #f0f0f0',
                                            padding: '1rem',
                                            borderRadius: '5px',
                                            width: '165px'
                                        }}
                                        hoverable
                                    >
                                        <Typography.Text>{timeSlot.start_time.slice(0, 5)} - {timeSlot.end_time.slice(0, 5)}</Typography.Text>
                                    </Card>)) : 'No available slots') : 'No available slots'

                            )}
                        </div>

                    </div>
                </div>

                <Divider/>

                <AppointmentRequests onApprovedRequestsChange={handleApprovedRequestsChange}/>
            </LayoutComponent>
        </>
    );
}