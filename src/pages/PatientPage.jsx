import { Col, Avatar, Row, Descriptions, Button, Divider, Typography} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { retrievePatient } from '../api/handlePatients';
import { useEffect, useState } from 'react';

export default function PatientPage() {
    const [patient, setPatient] = useState(null);
    const { patientId } = useParams();
    const { Text, Title} = Typography;

    useEffect(() => {
        const fetchData = async () => {
            const response = await retrievePatient(patientId);
            setPatient(response);
        };

        fetchData();
    }, [patientId]);

    return (
        <div style={{margin:'40px', widht: '100%'}}>
            <Row justify="center" style={{marginBottom: '5em', justifyContent: 'left'}}>
                <Col>
                    {patient && (
                        <Avatar shape="square" size={180} icon={<UserOutlined />}  src={patient.profilePicture} />
                    )}
                </Col>
                <Col style={{marginLeft: '2em', display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                    <Title style={{color: '#1269CB'}} level={2}>Jessica Alba</Title>
                    <Row justify="space-between" style={{ width: '100%'}}>
                        <Col><Text style={{fontSize: '20px'}}>15.01.2001</Text></Col>
                        <Col><Text style={{fontSize: '20px', marginRight: '6px', marginLeft: '6px'}}>|</Text></Col>
                        <Col><Text style={{fontSize: '20px'}}>203029424</Text></Col>
                    </Row>
                    <Row>
                        <Text style={{fontSize: '20px'}}>Almaty st 32, apt. 99</Text>
                    </Row>
                        <Button size="large" onClick={() => { }}>
                            Change Picture
                        </Button>
                </Col>
                <Row style={{marginTop: '-10em', marginLeft: '85em', display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                    <Col style={{justifyContent: 'right', alignItems: 'right', margin: 'auto'}}>
                        <Col><Title level={3}>Supervised by:</Title></Col>
                        <Col><Title level={2} style={{color: '#1269CB'}}>Dr. James Harden</Title></Col>
                    </Col>
                </Row>
            </Row>
            
                
            

            {patient && (
                <div style={{margin: '0px'}}>
                    <Descriptions 
                        bordered column={10}
                        layout="vertical"
                        labelStyle={{ fontSize: '18px', fontWeight: 'bold'}}
                        contentStyle={{ fontSize: '18px'}}
                    >
                        <Descriptions.Item style={{textAlign: 'center'}} label="Date"></Descriptions.Item>
                        <Descriptions.Item style={{textAlign: 'center'}} label="Doctor"></Descriptions.Item>
                        <Descriptions.Item style={{textAlign: 'center'}} label="UCL"></Descriptions.Item>
                        <Descriptions.Item style={{textAlign: 'center'}} label="ECG"></Descriptions.Item>
                        <Descriptions.Item style={{textAlign: 'center'}} label="Heartbeat"></Descriptions.Item>
                        <Descriptions.Item style={{textAlign: 'center'}} label="Echonet"></Descriptions.Item>

                    </Descriptions>
             
                    
                </div>
                
            )}

        </div>
    );
}
