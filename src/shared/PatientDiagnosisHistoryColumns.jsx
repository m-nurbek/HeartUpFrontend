export const DiagnosisColumns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'ECG',
        dataIndex: 'ecg_prediction',
        key: 'ecg_prediction',
    },
    {
        title: 'Heart Beat',
        dataIndex: 'heart_beat_prediction',
        key: 'heart_beat_prediction',
    },
    {
        title: 'UCL',
        dataIndex: 'ucl_prediction',
        key: 'ucl_prediction',
    },
    {
        title: 'EchoNet',
        dataIndex: 'echo_net_prediction',
        key: 'echo_net_prediction',
    },
];

export const TransformToDiagnosisDataSource = (item, index) => ({
    key: index,
    date: new Date(item.ecg_prediction_on).toLocaleDateString(),
    ecg_prediction: item.ecg_prediction,
    heart_beat_prediction: item.heart_beat_prediction,
    ucl_prediction: item.ucl_prediction,
    echo_net_prediction: item.echo_net_prediction,
});

// ecg:
//     ecg_file:"http://localhost:8000/media/ecg_files/A00003_bB0XFDX.mat"
//     ecg_file_upload_on:"2024-04-07T08:00:12.501803Z"
//     id:35
// ecg_prediction:"Normal"
// ecg_prediction_on:"2024-04-07T08:00:16.672828Z"

// heart_beat:
//     heart_beat_audio:"http://localhost:8000/media/audio/normal_143_1306763822290_C_PxeThGS.wav"
//     heart_beat_audio_upload_on:"2024-04-07T08:00:12.474252Z"
//     id:39

// heart_beat_prediction:"Normal heartbeat"
// heart_beat_prediction_on:"2024-04-07T08:00:16.672828Z"
// id:4
// patient:1

// ucl:
//     age:50
//     epss:27
//     fractionalshortening:0.5
//     id:33
//     lvdd:3
//     mult:0.5
//     pericardialeffusion:false
//     survival:2
//     wallmotion_index:1
//     wallmotion_score:7
// ucl_prediction:"The model predicts that the patient will not survive within one year."
// ucl_prediction_on : "2024-04-07T08:00:16.672828Z"