import { Col, Avatar, Row, Descriptions, Checkbox, Button, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const items = [
    {
        key: 'email',
        label: 'Email',
        children: 'patient@example.com',
    },
    {
        key: 'first_name',
        label: 'First Name',
        children: 'John',
    },
    {
        key: 'last_name',
        label: 'Last Name',
        children: 'Black',
    },
    {
        key: 'age',
        label: 'Age',
        children: '20',
    },
    {
        key: 'state_id',
        label: 'State Id',
        children: '292388912',
    },
    {
        key: 'sex',
        label: 'Sex',
        children: 'male',
    },
    {
        key: 'dob',
        label: 'Date of Birth',
        children: '2001-02-14',
    },
    {
        key: 'height',
        label: 'Height',
        children: '180',
    },
    {
        key: 'weight',
        label: 'Weight',
        children: '70'
    },
    {
        key: 'other',
        label: 'Other Info',
        children: <>
            <Checkbox defaultChecked={false} disabled >Alcoholic</Checkbox>
            <br />
            <Checkbox defaultChecked={false} disabled >Smoker</Checkbox>
            <br />
            <Checkbox defaultChecked={false} disabled >Heart Disease</Checkbox>
            <br />
            <Checkbox defaultChecked disabled >Hypertension</Checkbox>
            <br />
            <Checkbox defaultChecked disabled >Diabetes</Checkbox>
            <br />
            <Button>Change</Button>
        </>,
    },

];

export default function PatientPage() {
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