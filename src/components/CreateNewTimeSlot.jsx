import {useRef, useState, useEffect} from 'react';
import {Calendar, Card, Modal, TimePicker, Typography} from 'antd';
import Draggable from 'react-draggable';
import dayjs from 'dayjs';


import kkKZ from 'antd/lib/locale/kk_KZ.js';
import {createTimeSlots} from "../api/handleAppointments.jsx";

export const CreateNewTimeSlot = () => {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs());
    const [timeSlots, setTimeSlots] = useState({'start_time': '', 'end_time': ''});
    const [error, setError] = useState(false);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    useEffect(() => {
        const fetch = async () => {

        }
        fetch();
    }, [timeSlots.start_time, timeSlots.end_time]);

    const createTimeSlot = async () => {
        const formattedDate = dayjs(selectedValue.toDate()).format('YYYY-MM-DD');
        const response = await createTimeSlots(formattedDate, timeSlots.start_time, timeSlots.end_time);
    }

    const draggleRef = useRef(null);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        if (timeSlots.start_time === '' || timeSlots.end_time === '') {
            setError(true);
            return;
        }

        createTimeSlot();
        setOpen(false);
    };
    const handleCancel = (e) => {
        console.log(e);
        setOpen(false);
    };
    const onStart = (_event, uiData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };
    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Card
                hoverable
                style={{
                    width: 180, height: 120,
                    display: 'grid',
                    placeItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: '#1890ff',
                }}
                styles={{body: {padding: 0}}}
                onClick={() => {
                    showModal();
                }}
            >
                <Typography.Title level={4}
                                  style={{
                                      margin: '0',
                                      textAlign: "center",
                                      color: 'white',
                                      fontWeight: '400'
                                  }}
                >Add Time Slot</Typography.Title>
            </Card>
            <Modal
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (disabled) {
                                setDisabled(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabled(true);
                        }}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }}
                    >
                        New Time Slot
                    </div>
                }
                open={open}
                okText={'Submit'}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                height={400}
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        nodeRef={draggleRef}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Calendar value={value} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange}
                              style={{flex: '60%'}}
                    />
                    <div style={{flex: '40%', borderLeft: '#555555 1px solid', paddingLeft: '1rem'}}>
                        <Typography.Title level={5} style={{fontWeight: 400}}>Select time for your
                            slot</Typography.Title>
                        <TimePicker.RangePicker
                            format="HH:mm"
                            needConfirm={false} locale={kkKZ}
                            hideDisabledOptions
                            disabledTime={() => {
                                return {
                                    disabledHours: () => {
                                        // Disable hours from 12 AM to 6 AM
                                        return Array.from({length: 7}, (_, i) => i);
                                    },
                                    disabledMinutes: () => {
                                        // Disable minutes that are not multiples of 30
                                        return Array.from({length: 60}, (_, i) => i).filter(i => i % 30 !== 0);
                                    }
                                };
                            }}
                            onChange={(value, timeString) => {
                                setTimeSlots({
                                    'start_time': timeString[0],
                                    'end_time': timeString[1]
                                });
                            }}
                        />
                        <Card style={{margin: '1rem 0'}}>
                            <Typography.Text>{selectedValue.toDate().toDateString()}</Typography.Text>
                            <br/>
                            <Typography.Text><strong>Start Time:</strong> {timeSlots.start_time}</Typography.Text>
                            <br/>
                            <Typography.Text><strong>End Time:</strong> {timeSlots.end_time}</Typography.Text>
                        </Card>
                        <Typography.Text style={{color: 'red'}}>
                            {error ? 'Please select a valid time slot' : ''}
                        </Typography.Text>
                    </div>
                </div>
            </Modal>
        </>
    );
};
