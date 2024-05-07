import {useRef, useState, useEffect} from 'react';
import {Button, Divider, Flex, Form, Image, Input, Modal, Select, Tabs} from 'antd';
import Draggable from 'react-draggable';
import {getPersonalDoctorInfo, updatePersonalDoctorInfo} from "../api/handleDoctors.jsx";
import getSpecializationTitle, {specializations} from "../api/constants/specializations.js";


export const ChangePersonalInfoModal = () => {
    const [changeGeneralForm] = Form.useForm();
    const [changePhotoForm] = Form.useForm();
    const [imageURL, setImageURL] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });

    const [doctorInfo, setDoctorInfo] = useState({
        id: '',
        photo: '',
        phone: '',
        specialization: '',
        aboutme: '',
        work_location: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    useEffect(() => {
        const fetch = async () => {
            setDoctorInfo(await getPersonalDoctorInfo());

            changeGeneralForm.setFieldsValue({
                phone: doctorInfo.phone,
                specialization: doctorInfo.specialization,
                aboutme: doctorInfo.aboutme,
                work_location: doctorInfo.work_location,
                first_name: doctorInfo.first_name,
                last_name: doctorInfo.last_name,
                email: doctorInfo.email,
            });
        }
        fetch();
    }, [doctorInfo.phone, doctorInfo.specialization, doctorInfo.aboutme, doctorInfo.work_location, doctorInfo.first_name, doctorInfo.last_name, doctorInfo.email]);

    const draggleRef = useRef(null);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = async () => {
        await updatePersonalDoctorInfo(
            changeGeneralForm.getFieldValue('phone'),
            changeGeneralForm.getFieldValue('specialization'),
            changeGeneralForm.getFieldValue('aboutme'),
            changeGeneralForm.getFieldValue('work_location'),
            changeGeneralForm.getFieldValue('first_name'),
            changeGeneralForm.getFieldValue('last_name'),
            changeGeneralForm.getFieldValue('email'),
            imageFile === undefined || imageFile === null ? null : imageFile
        )
        setOpen(false);

        window.location.reload();
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
    return (
        <>
            <Button onClick={showModal} style={{margin: '0.4rem 0'}}>Change Personal Information</Button>
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
                        Change Personal Information
                    </div>
                }
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
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
                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    size={'small'}
                    style={{
                        fontSize: '1.1rem',
                        marginTop: '1.4rem',
                    }}
                    items={[
                        {
                            key: '1',
                            label: 'General',
                            children:
                                <Form layout={"vertical"} form={changeGeneralForm}>
                                    <Flex gap={"middle"} style={{width: "100%"}}>
                                        <Form.Item label="First Name" name="first_name" style={{flexGrow: 1}}>
                                            <Input type="text" className="ant-input"/>
                                        </Form.Item>
                                        <Form.Item label="Last Name" name="last_name" style={{flexGrow: 1}}>
                                            <Input type="text" className="ant-input"/>
                                        </Form.Item>
                                    </Flex>
                                    <Flex gap={"middle"} style={{width: "100%"}}>
                                        <Form.Item label="Email Name" name="email" style={{flexGrow: 1}}>
                                            <Input type="text" className="ant-input"/>
                                        </Form.Item>
                                        <Form.Item label="Phone Number" name="phone" style={{flexGrow: 1}}>
                                            <Input type="text" className="ant-input"/>
                                        </Form.Item>
                                    </Flex>
                                    <Form.Item label="Specialization" name="specialization">
                                        <Select>
                                            {specializations.map(specialization => (
                                                <Select.Option key={specialization} value={specialization}>
                                                    {getSpecializationTitle(specialization)}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Work Location" name="work_location">
                                        <Input type="text" className="ant-input"/>
                                    </Form.Item>
                                    <Form.Item label="About Me" name="aboutme">
                                        <Input.TextArea type="text" className="ant-input"/>
                                    </Form.Item>
                                </Form>
                        },
                        {
                            key: '2',
                            label: 'Photo',
                            children:
                                <Form layout={"vertical"} form={changePhotoForm}>
                                    <h3 style={{fontWeight: '500'}}>Image Preview</h3>
                                    <Image width={300} height={300} style={{objectFit: 'cover'}}
                                           src={imageURL ? imageURL : '/doctorImage.jpg'} alt="Preview"/>
                                    <Divider/>
                                    <Form.Item label="Profile Photo" name="photo">
                                        <Input type="file" className="ant-input" onChange={(e) => {
                                            setImageFile(e.target.files[0]);
                                            setImageURL(URL.createObjectURL(e.target.files[0]));
                                        }}/>
                                    </Form.Item>
                                </Form>
                        },
                    ]}
                />
            </Modal>
        </>
    );
};
