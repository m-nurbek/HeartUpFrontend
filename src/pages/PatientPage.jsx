import { Col, Avatar, Row, Descriptions, Checkbox, Button, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { retrievePatient } from '../api/handlePatients';
import { useEffect, useState } from 'react';


export default function PatientPage() {
    const [items, setItems] = useState([]);
    const { patientId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await retrievePatient(patientId);

            setItems([
                {
                    key: 'email',
                    label: 'Email',
                    children: response.email,
                },
                {
                    key: 'first_name',
                    label: 'First Name',
                    children: response.first_name,
                },
                {
                    key: 'last_name',
                    label: 'Last Name',
                    children: response.last_name,
                },
                {
                    key: 'age',
                    label: 'Age',
                    children: response.age,
                },
                {
                    key: 'state_id',
                    label: 'State Id',
                    children: response.state_id,
                },
                {
                    key: 'sex',
                    label: 'Sex',
                    children: response.sex,
                },
                {
                    key: 'dob',
                    label: 'Date of Birth',
                    children: response.dob,
                },
                {
                    key: 'height',
                    label: 'Height',
                    children: response.height,
                },
                {
                    key: 'weight',
                    label: 'Weight',
                    children: response.weight
                },
                {
                    key: 'other',
                    label: 'Other Info',
                    children: <>
                        <Checkbox defaultChecked={response.alcoholic} disabled >Alcoholic</Checkbox>
                        <br />
                        <Checkbox defaultChecked={response.smoker} disabled >Smoker</Checkbox>
                        <br />
                        <Checkbox defaultChecked={response.heart_disease} disabled >Heart Disease</Checkbox>
                        <br />
                        <Checkbox defaultChecked={response.hypertension} disabled >Hypertension</Checkbox>
                        <br />
                        <Checkbox defaultChecked={response.diabetes} disabled >Diabetes</Checkbox>
                        <br />
                        <Button>Change</Button>
                    </>,
                },
            ]);
        }

        fetchData();
    }, []);

    return (
        <>
            <Divider plain>Patient Info</Divider>
            <Row gutter={[16, 16]}>
                <Col span={6} >
                    <Avatar shape="square" size={320} icon={<UserOutlined />} />

                    <Button
                        size="large"
                        style={{ margin: '1em', alignItems: 'middle' }}
                        onClick={() => { }}
                    >
                        Change Picture
                    </Button>
                </Col>
                <Col span={18} >
                    <Descriptions bordered items={items} />
                </Col>
            </Row>
            <Divider plain>Appointments</Divider>
        </>
    );
}