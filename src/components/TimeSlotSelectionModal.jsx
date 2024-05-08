import {Calendar, Card, message, Modal, Spin, Typography} from "antd";
import {useState} from "react";
import dayjs from "dayjs";
import {
    bookSlot,
    busySlotsByDoctorId, getAcceptedAppointmentsByPatient,
    getPendingAppointmentsByPatient, getRejectedAppointmentsByPatient,
    getTimeSlotsByDoctorIdAndDate
} from "../api/handleAppointments.jsx";


export default function TimeSlotSelectionModal({modalOpen = false, setModalOpen, doctorId}) {
    // Calendar
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // Cards
    const [selectedCard, setSelectedCard] = useState(null);

    // Time slots by date
    const [timeSlots, setTimeSlots] = useState([]);

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);

        handleFetchAvailableSlotsByDate(doctorId, newValue.format('YYYY-MM-DD'));
    };
    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleCardClick = (id) => { // Add this function
        setSelectedCard(id);
    };
    const handleFetchAvailableSlotsByDate = async (id, date) => {
        setLoading(true);

        let response = await getTimeSlotsByDoctorIdAndDate(id, date);
        if (response) {
            const busySlotsResponse = await busySlotsByDoctorId(doctorId);
            const myPendingAppointments = await getPendingAppointmentsByPatient();
            const myRejectedAppointments = await getRejectedAppointmentsByPatient();
            const myAcceptedAppointments = await getAcceptedAppointmentsByPatient();

            // Create sets using both start_time and end_time as a unique identifier for each slot
            const pendingSlots = new Set(Array.isArray(myPendingAppointments) ? myPendingAppointments.map(appointment => `${appointment.start_time}-${appointment.end_time}`) : []);
            const rejectedSlots = new Set(Array.isArray(myRejectedAppointments) ? myRejectedAppointments.map(appointment => `${appointment.start_time}-${appointment.end_time}`) : []);
            const acceptedSlots = new Set(Array.isArray(myAcceptedAppointments) ? myAcceptedAppointments.map(appointment => `${appointment.start_time}-${appointment.end_time}`) : []);
            const busySlots = new Set(Array.isArray(busySlotsResponse) ? busySlotsResponse.map(slot => `${slot.start_time}-${slot.end_time}`) : []);

            // Filter the response array once
            response = response.filter(slot => {
                const slotTime = `${slot.start_time}-${slot.end_time}`;
                return !pendingSlots.has(slotTime) && !rejectedSlots.has(slotTime) && !acceptedSlots.has(slotTime) && !busySlots.has(slotTime);
            });

            setTimeSlots(response);
        }
        setLoading(false)
    };
    const handleBookSlot = async (slot_id) => {
        await bookSlot(slot_id);
    }

    return (
        <>
            {contextHolder}
            <Modal
                title={
                    <Typography.Title level={3} style={{fontWeight: 500, textAlign: 'center', margin: '1rem 0 1.5rem'}}>
                        Select your time slot
                    </Typography.Title>
                }
                centered
                open={modalOpen}
                onOk={() => {
                    if (selectedCard === null) {
                        messageApi.destroy();
                        messageApi.error('Please select a time slot');
                        return;
                    }
                    messageApi.destroy();
                    messageApi.loading('Booking appointment', 0);
                    setModalOpen(false);
                    handleBookSlot(timeSlots[selectedCard].id);

                    messageApi.destroy();
                    messageApi.open({
                        type: 'success',
                        content: 'Appointment booked successfully. Please, wait for the doctor to confirm it.',
                        duration: 10,
                    });
                }}
                okText={'Book Appointment'}
                onCancel={() => setModalOpen(false)}
                width={800}
                height={500}
            >
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Calendar value={value} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange}
                              style={{flex: '50%'}}
                    />
                    <div style={{flex: '50%', borderLeft: '#555555 1px solid', paddingLeft: '1rem'}}>
                        <Typography.Title level={5} style={{fontWeight: 400}}>Available slots</Typography.Title>

                        {loading ?
                            <div style={{display: 'grid', placeItems: 'center', marginTop: '4rem'}}><Spin/></div> :
                            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                {timeSlots && timeSlots.length > 0 ? timeSlots.map(
                                    (slot, index) => (
                                        <Card key={index} style={{
                                            margin: '0.2rem',
                                            width: 'fit-content',
                                            backgroundColor: selectedCard === index ? '#d9d9d9' : '#f1f1f1',
                                            border: '1px solid #d9d9d9'
                                        }} styles={{body: {padding: '0.7rem'}}}
                                              hoverable
                                              onClick={() => handleCardClick(index)}
                                        >
                                            <Typography.Text
                                                style={{fontSize: '0.9rem'}}>{slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}</Typography.Text>
                                        </Card>
                                    )
                                ) : 'No available slots'}
                            </div>
                        }
                    </div>
                </div>

            </Modal>
        </>
    );
}