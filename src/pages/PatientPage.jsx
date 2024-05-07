import {Avatar, Button, Divider, Table} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { retrievePatient } from '../api/handlePatients';
import { useEffect, useState } from 'react';
import { retrievePatientDiagnosisHistory } from '../api/handleMLs';
import { DiagnosisColumns, TransformToDiagnosisDataSource } from '../shared/PatientDiagnosisHistoryColumns';
import LoadingPage from './LoadingPage';
import LayoutComponent from "../components/Layout.jsx";
import {getMyUserInfo} from "../api/handleAuthentication.jsx";


export default function PatientPage() {
    const [patient, setPatient] = useState(null);
    const [ml_history, setMlHistory] = useState(null);
    const { patientId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await retrievePatient(patientId);
            console.log("ALL PATIENTS:", response);
            const ml_history_response = await retrievePatientDiagnosisHistory(patientId);
            let transformed_diagnosis_data = ml_history_response.map(TransformToDiagnosisDataSource);
            setPatient(response);
            setMlHistory(transformed_diagnosis_data);

            setCurrentUser(await getMyUserInfo())
        };

        fetchData();
    }, [patientId]);

    return (
            <>
                <LayoutComponent>
                    {patient && currentUser ?
                    <main>
                        <div className='patient_page__info'>
                            <Avatar size={240} className='patient_page__info__avatar' shape='square' icon={<UserOutlined />}
                                src={patient.photo && patient.photo}
                                style={{
                                    border: '1px solid var(--color6)'
                                }}
                            />
                            <div className="patient_page__info__description">
                                <div>
                                    <h1>{patient.first_name + ' ' + patient.last_name}</h1>
                                    <p>{patient.email}</p>
                                    <p><span>State ID:</span> {patient.state_id}</p>
                                    <p><span>Date Of Birth:</span> {patient.dob}</p>
                                    <p><span>Sex:</span> {patient.sex}</p>
                                </div>
                            </div>
                        </div>
                        <Divider/>
                        {currentUser.role !=='PATIENT' && <Button type='primary' style={{
                            margin: '1em',
                            padding: '0.5em 1em 2em',
                            textAlign: 'center',
                            fontSize: '1.1rem'
                        }}
                            onClick={() => navigate(`/models/${patientId}`)}
                        >
                            New Diagnosis
                        </Button>}
                        <Table layout="vertical" dataSource={ml_history} columns={DiagnosisColumns} bordered />
                    </main> : <LoadingPage />}
                </LayoutComponent>
            </>
    );
}
