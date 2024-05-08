import {useState} from "react";
import {Button, Card, Collapse, Image, message, Steps, Table, theme, Typography, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import UclFormFields from "../components/UclFormFields";
import {postMLDiagnosis} from "../api/handleMLs";
import {useParams} from "react-router-dom";
import LayoutComponent from "../components/Layout.jsx";

const {Dragger} = Upload;

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
    const [diagnosisData, setDiagnosisData] = useState([]);
    const {patientId} = useParams();
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmitButton = async () => {
        messageApi.loading('Approving appointment...', 0);

        if (!heartBeatAudioFile || !ecgFile || !uclData || !echoNetFile) {
            messageApi.destroy()
            messageApi.error("Please fill in all the required fields and upload all the necessary files.");
            return;
        }

        const response = await postMLDiagnosis(patientId, uclData, ecgFile, echoNetFile, heartBeatAudioFile)
        messageApi.destroy()
        messageApi.open({
            type: 'success',
            content: 'Diagnosis completed successfully',
            duration: 5,
        });

        if (response == 'undefined') {
            messageApi.destroy()
            messageApi.error("Sorry, an error has occured");
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
            const {status} = info.file;
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
            label: <Typography.Title level={5} style={{margin: '0', fontWeight:500}}>Diagnosis Results</Typography.Title>,
            children: <Table columns={diagnosisTable} dataSource={diagnosisData}/>,
        },
    ]

    const steps = [
        {
            title: 'UCL',
            content: <>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', minHeight: '620px'}}>
                    <Card style={{flex: 1, minWidth: '400px'}}>
                        <Typography.Title level={2}>About the model</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            The following model predicts and classifies whether the patient after the
                            first congestive heart attack will survive within one year or not.
                        </Typography.Text>
                        <Image src="/TempImage.png" alt="" style={{
                            objectFit: 'cover',
                            width: '90%',
                            aspectRatio: '2/1',
                            display: 'block',
                            margin: '0 auto'
                        }}/>
                        <Typography.Title level={3}>Instructions</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            Please provide the necessary information listed in the form on the right side of the page
                            After entering the required data, press the “Submit” button to get the prediction
                        </Typography.Text>
                    </Card>
                    <div style={{flex: 1, minWidth: '400px', display:'grid', placeItems:'center'}}>
                        <UclFormFields
                            onValuesChange={handleUclFormChange}
                        />
                    </div>
                </div>
            </>,
        },
        {
            title: 'Heart Beat',
            content: <>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', minHeight: '620px'}}>
                    <div style={{flex: 1, minWidth: '400px', display: 'grid', placeItems: 'center'}}>
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
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </div>
                    <Card style={{flex: 1, minWidth: '400px'}}>
                        <Typography.Title level={2}>About the model</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            The following model is able to distinguish the heart sounds
                            between the normal, murmur, extrastole, artifact and extrhals
                        </Typography.Text>
                        <Image src="/TempImage.png" alt="" style={{
                            objectFit: 'cover',
                            width: '90%',
                            aspectRatio: '2/1',
                            display: 'block',
                            margin: '0 auto'
                        }}/>
                        <Typography.Title level={3}>Instructions</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            Please provide the heart sound data in the format of MP3 or WAV audio file by clicking on
                            the “Upload” icon
                            After the submission of the audio file, please press the “Submit” button to get the
                            prediction
                        </Typography.Text>
                    </Card>
                </div>
            </>,
        },
        {
            title: 'ECG',
            content: <>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', minHeight: '620px'}}>
                    <Card style={{flex: 1, minWidth: '400px'}}>
                        <Typography.Title level={2}>About the model</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            The following model is able to distinguish the heart rhythms
                            between the normal, atrial fibrillation, noise and other
                        </Typography.Text>
                        <Image src="/TempImage.png" alt="" style={{
                            objectFit: 'cover',
                            width: '90%',
                            aspectRatio: '2/1',
                            display: 'block',
                            margin: '0 auto'
                        }}/>
                        <Typography.Title level={3}>Instructions</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            Please provide the ECG heart image in the format of PDF, JPG or MAT file by clicking on the
                            “Upload” icon
                            After the submission of the audio file, please press the “Submit” button to get the
                            prediction
                        </Typography.Text>
                    </Card>
                    <div style={{flex: 1, minWidth: '400px', display: 'grid', placeItems: 'center'}}>
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
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </div>
                </div>
            </>,
        },
        {
            title: 'EchoNet',
            content: <>
                <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', minHeight: '620px'}}>
                    <div style={{flex: 1, minWidth: '400px', display: 'grid', placeItems: 'center'}}>
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
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </div>
                    <Card style={{flex: 1, minWidth: '400px'}}>
                        <Typography.Title level={2}>About the model</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            Echonet was trained on 10030 samples of echocardiography videos
                            obtained from the Stanford University Hospital between 2016 and 2018.
                            Its inputs are preprocessed black-white echocardiography videos of 112 by 112 pixels
                            resolution.
                        </Typography.Text>
                        <Image src="/TempImage.png" alt="" style={{
                            objectFit: 'cover',
                            width: '90%',
                            aspectRatio: '2/1',
                            display: 'block',
                            margin: '0 auto'
                        }}/>
                        <Typography.Title level={2}>Instructions</Typography.Title>
                        <Typography.Text style={{display: 'block'}}>
                            Please provide the heart sound data in the format of AVI file by clicking on the “Upload”
                            icon
                            After the submission of the audio file, please press the “Submit” button to get the
                            prediction
                        </Typography.Text>
                    </Card>
                </div>
            </>,
        }
    ];
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({key: item.title, title: item.title}));

    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <LayoutComponent>
            {contextHolder}
            <Steps current={current} items={items}/>
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{margin: '2rem auto', width:'fit-content'}}>
                {current < steps.length - 1 && (
                    <Button type="primary" style={{fontSize: '1rem', padding: '0.4rem 1.2rem 2rem'}} onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" style={{fontSize: '1rem', padding: '0.4rem 1.2rem 2rem'}} onClick={handleSubmitButton}>
                        Submit
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px', fontSize: '1rem', padding: '0.4rem 1.2rem 2rem'}} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>

            <Collapse items={diagnosisResults} style={{margin: "2em 0 5em"}}/>

        </LayoutComponent>
    );
}
