import { useState } from "react";
import { Button, Collapse, Divider, message, Spin, Table, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import UclFormFields from "../components/UclFormFields";
import { postMLDiagnosis } from "../api/handleMLs";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;

const diagnosisTable = [
    {
        title: 'Model Name',
        dataIndex: 'model',
        key: 'model',
    },
    {
        title: 'Prediction',
        dataIndex: 'prediction',
        key: 'prediction',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
]

export default function ModelsPage() {
    const [ecgFile, setEcgFile] = useState(null);
    const [heartBeatAudioFile, setHeartBeatAudioFile] = useState(null);
    const [echoNetFile, setEchoNetFile] = useState(null);
    const [uclData, setUclData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [diagnosisData, setDiagnosisData] = useState([]);
    const { patientId } = useParams();

    const handleSubmitButton = async () => {
        setIsLoading(true);
        if (!heartBeatAudioFile || !ecgFile || !uclData || !echoNetFile) {
            message.error("Please fill in all the required fields and upload all the necessary files.");
            setIsLoading(false);
            return;
        }

        const response = await postMLDiagnosis(patientId, uclData, ecgFile, echoNetFile, heartBeatAudioFile)
        console.log(response);
        setIsLoading(false);
        if (response == 'undefined') {
            message.error("Sorry, an error has occured");
            return;
        }
        setDiagnosisData([
            {
                key: '1',
                model: 'UCL',
                prediction: response.ucl_prediction,
                date: new Date(response.ucl_prediction_on).toLocaleDateString(),
            },
            {
                key: '2',
                model: 'ECG',
                prediction: response.ecg_prediction,
                date: new Date(response.ecg_prediction_on).toLocaleDateString(),
            },
            {
                key: '3',
                model: 'Heart Beat',
                prediction: response.heart_beat_prediction,
                date: new Date(response.heart_beat_prediction_on).toLocaleDateString(),
            },
            {
                key: '4',
                model: 'Echo Net',
                prediction: response.echo_net_prediction,
                date: new Date(response.echo_net_prediction_on).toLocaleDateString(),
            }
        ]);
    }

    const handleUclFormChange = (changedValues, allValues) => {
        setUclData(allValues);
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const diagnosisResults = [
        {
            key: '1',
            label: <h3 style={{ margin: '0' }}>Diagnosis Results</h3>,
            children: <Table columns={diagnosisTable} dataSource={diagnosisData} />,
        },
    ]

    return (
        <div className="models_page">

            {isLoading && <Spin fullscreen />}

            <h1>Smart Diagnosis</h1>
            <Divider><h2> UCL Model </h2></Divider>
            <div className="models_page__model">
                <div className="models_page__model__about">
                    <h3>About the model</h3>
                    <p>
                        The following model predicts and classifies whether the patient after the
                        first congestive heart attack will survive within one year or not.
                    </p>
                    <img src="/TempImage.png" alt="" />
                    <h3>Instructions</h3>
                    <p>
                        Please provide the necessary information listed in the form on the right side of the page
                        After entering the required data, press the “Submit” button to get the prediction
                    </p>
                </div>
                <UclFormFields
                    onValuesChange={handleUclFormChange}
                    className="models_page__model__form"
                />
            </div>

            <Divider><h2> Heart Beat Model </h2></Divider>

            <div className="models_page__model">
                <div className="models_page__model__form">
                    <Dragger style={{
                        width: '400px'
                    }} height={400}
                        beforeUpload={(file) => {
                            setHeartBeatAudioFile(file);
                            return false;
                        }}
                        {...uploadProps}
                        onRemove={() => {
                            setHeartBeatAudioFile(null);
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </div>
                <div className="models_page__model__about">
                    <h3>About the model</h3>
                    <p>
                        The following model is able to distinguish the heart sounds
                        between the normal, murmur, extrastole, artifact and extrhals
                    </p>
                    <img src="/TempImage.png" alt="" />
                    <h3>Instructions</h3>
                    <p>
                        Please provide the heart sound data in the format of MP3 or WAV audio file by clicking on the “Upload” icon
                        After the submission of the audio file, please press the “Submit” button to get the prediction
                    </p>
                </div>
            </div>

            <Divider><h2> ECG Model </h2></Divider>

            <div className="models_page__model">
                <div className="models_page__model__about">
                    <h3>About the model</h3>
                    <p>
                        The following model is able to distinguish the heart rhythms
                        between the normal, atrial fibrillation, noise and other
                    </p>
                    <img src="/TempImage.png" alt="" />
                    <h3>Instructions</h3>
                    <p>
                        Please provide the ECG heart image in the format of PDF, JPG or MAT file by clicking on the “Upload” icon
                        After the submission of the audio file, please press the “Submit” button to get the prediction
                    </p>
                </div>
                <div className="models_page__model__form">
                    <Dragger style={{
                        width: '400px'
                    }} height={400}
                        beforeUpload={(file) => {
                            setEcgFile(file);
                            return false;
                        }}
                        {...uploadProps}
                        onRemove={() => {
                            setEcgFile(null);
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </div>
            </div>

            <Divider><h2> Echo Net Model </h2></Divider>

            <div className="models_page__model">
                <div className="models_page__model__form">
                    <Dragger style={{
                        width: '400px'
                    }} height={400}
                        beforeUpload={(file) => {
                            setEchoNetFile(file);
                            return false;
                        }}
                        {...uploadProps}
                        onRemove={() => {
                            setEchoNetFile(null);
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </div>
                <div className="models_page__model__about">
                    <h3>About the model</h3>
                    <p>
                        Echonet was trained on 10030 samples of echocardiography videos
                        obtained from the Stanford University Hospital between 2016 and 2018.
                        Its inputs are preprocessed black-white echocardiography videos of 112 by 112 pixels resolution.
                    </p>
                    <img src="/TempImage.png" alt="" />
                    <h3>Instructions</h3>
                    <p>
                        Please provide the heart sound data in the format of AVI file by clicking on the “Upload” icon
                        After the submission of the audio file, please press the “Submit” button to get the prediction
                    </p>
                </div>
            </div>

            <Button onClick={handleSubmitButton} className="submit_button" type="primary">
                Submit
            </Button>
            <Collapse items={diagnosisResults} style={{ margin: "2em 0 5em" }} />
        </div >
    );
}
