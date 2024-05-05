import axiosRequest from './axiosConfig';
import { ML_DIAGNOSIS, ML_DIAGNOSIS_BY_PATIENT } from './constants/apiEndpoints';
import { message } from 'antd';


export const retrievePatientDiagnosisHistory = async (patient_id) => {
    try {
        const response = await axiosRequest.get(ML_DIAGNOSIS_BY_PATIENT(patient_id));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

/*
    ucl {
        survival,
        age,
        pericardialeffusion
        fractionalshortening
        epss
        lvdd
        wallmotion_score
        wallmotion_index
        mult
    }
*/
//  REQUEST DATA: <QueryDict: 
//  {'csrfmiddlewaretoken': ['7hwGTAdG2Bs7nG6F4IL5CPw41nWk2SIREJMmJHkD3cuU1MWFiAIjsZdPFIsZltPH'], 
//  'patient': ['3'], 'ucl.survival': ['2'], 'ucl.age': ['50'], 'ucl.pericardialeffusion': ['true'], 'ucl.fractionalshortening': ['0.4'], 'ucl.epss': ['24'], 'ucl.lvdd': ['3'], 'ucl.wallmotion_score': ['7'], 'ucl.wallmotion_index': ['1'], 'ucl.mult': ['0.5'], 
//  'heart_beat.heart_beat_audio': [<InMemoryUploadedFile:normal1.wav(audio / wav) >], 
//  'ecg.ecg_file': [<InMemoryUploadedFile:A00003.mat(application / octet - stream) >]}>

// REQUEST: <QueryDict: 
// {
//  'patient': ['1'], 'ucl.survival': ['2'], 'ucl.age': ['50'], 'ucl.pericardialeffusion': ['true'], 'ucl.fractionalshortening': ['0.5'], 'ucl.epss': ['27'], 'ucl.lvdd': ['3'], 'ucl.wallmotion_score': ['7'], 'ucl.wallmotion_index': ['1'], 'ucl.mult': ['0.5'], 
// 'heart_beat.heart_beat_audio': [<InMemoryUploadedFile: [object Object](audio / wav) >]}>
// 'ecg.ecg_file': [<InMemoryUploadedFile: [object Object](application / octet - stream) >], 


export const postMLDiagnosis = async (patient_id, ucl, ecg_file, echo_net_file, heart_beat_audio) => {
    try {
        let data = new FormData();
        data.append('patient', patient_id);
        data.append('ucl.survival', ucl.survival);
        data.append('ucl.age', ucl.age);
        data.append('ucl.pericardialeffusion', ucl.pericardialeffusion === 'true' ? true : false);
        data.append('ucl.fractionalshortening', ucl.fractionalshortening);
        data.append('ucl.epss', ucl.epss);
        data.append('ucl.lvdd', ucl.lvdd);
        data.append('ucl.wallmotion_score', ucl.wallmotion_score);
        data.append('ucl.wallmotion_index', ucl.wallmotion_index);
        data.append('ucl.mult', ucl.mult);
        data.append('heart_beat.heart_beat_audio', heart_beat_audio, heart_beat_audio.name);
        data.append('ecg.ecg_file', ecg_file, ecg_file.name);
        data.append('echo_net.echo_net_file', echo_net_file, echo_net_file.name);

        console.log("RESPONSE " +  patient_id)

        const response = await axiosRequest.post(ML_DIAGNOSIS,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );

        message.success("Success");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}