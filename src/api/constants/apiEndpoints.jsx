

export const PATIENTS = '/core-app/patients';
export const DOCTORS = '/core-app/doctors';

export const ML_DIAGNOSIS = '/api/ml/ml-diagnosis-history/';
export const ML_DIAGNOSIS_BY_ID = (diagnosis_id) => '/api/ml/ml-diagnosis-history/' + diagnosis_id;
export const ML_DIAGNOSIS_BY_PATIENT = (patient_id) => '/api/ml/ml-diagnosis-history/patient/' + patient_id; 
