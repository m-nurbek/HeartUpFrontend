import {Avatar, Divider, Table, Typography} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {getPersonalPatientInfo} from '../../api/handlePatients';
import {useEffect, useState} from 'react';
import {retrievePatientDiagnosisHistory} from '../../api/handleMLs';
import {DiagnosisColumns, TransformToDiagnosisDataSource} from '../../shared/PatientDiagnosisHistoryColumns';
import LoadingPage from '../LoadingPage';
import LayoutComponent from "../../components/Layout.jsx";


export default function MyPatientPage() {
    const [patient, setPatient] = useState(null);
    const [ml_history, setMlHistory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPersonalPatientInfo();
            const ml_history_response = await retrievePatientDiagnosisHistory(response.id);
            let transformed_diagnosis_data = ml_history_response.map(TransformToDiagnosisDataSource);
            setPatient(response);
            setMlHistory(transformed_diagnosis_data);
        };

        fetchData();
    }, []);

    return (
        <>
            <LayoutComponent>
                {patient ?
                    <main>
                        <div className='patient_page__info'>
                            <Avatar size={240} className='patient_page__info__avatar' shape='square'
                                    icon={<UserOutlined/>}
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
                        <Typography.Title level={3} style={{fontWeight:400}}>Diagnosis History</Typography.Title>
                        <Table layout="vertical" dataSource={ml_history} columns={DiagnosisColumns} bordered/>
                    </main> : <LoadingPage/>}
            </LayoutComponent>
        </>
    );
}
