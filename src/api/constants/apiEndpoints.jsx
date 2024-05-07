/*      Authentication API Endpoints    */
// POST
// Accepts: JSON object with "username", "password"
// Returns: JSON object with "email", "full_name", "role", "access_tokens", "refresh_tokens" | STATUS 200
export const LOGIN = '/api/auth/login/';

// POST
// Accepts: JSON object with "email", "first_name", "last_name", "password", "password2"
// Returns: JSON object with "email", "first_name", "last_name"  | STATUS 201
export const REGISTER = '/api/auth/register/';

// POST
// Accepts: JSON object with "otp"
// Returns: Empty body | STATUS 204
export const VERIFY = '/api/auth/verify/';

// POST
// Accepts: JSON object with "refresh"
// Returns: JSON object with "access"
export const REFRESH = '/api/auth/refresh-token/';

// POST
// Accepts: JSON object with "email"
// Returns: JSON object with "message" | STATUS 200
export const PASSWORD_RESET = '/api/auth/password-reset/';

// GET
// Accepts: Empty body
// Returns: JSON object with "success", "message", "uidb64", "token" | STATUS 200
export const PASSWORD_RESET_CONFIRM = (uidb64, token) => '/api/auth/password-reset-confirm/' + uidb64 + "/" + token + "/";

// PATCH
// Accepts: JSON object with "password", "confirm_password", "uidb64", "token"
// Returns: JSON object with "message" | STATUS 200
export const SET_NEW_PASSWORD = '/api/auth/set-new-password/';

// POST
// Accepts: JSON object with "refresh_token"
// Returns: Empty body | STATUS 204
export const LOGOUT = '/api/auth/logout/';

// GET
// Accepts: Empty body
// Returns: JSON object with "id", "email", "first_name", "last_name", "role" | STATUS 200
export const USERS = '/api/auth/users/';


/*      Users API Endpoints     */
// GET, POST
// Accepts: Empty body, JSON object
// Returns: JSON array of patient objects [{ "id", "state_id", "photo", "age", "dob", "sex", "height", "user", "first_name", "last_name", "email", "role" }, ...]
export const PATIENTS = '/users/patients/';

// GET, POST, PUT/PATCH, DELETE
// Accepts: Empty body, JSON object, JSON object, Empty body
// Returns: JSON patient object { "id", "state_id", "photo", "age", "dob", "sex", "height", "user", "first_name", "last_name", "email", "role" }
export const PATIENTS_BY_ID = (patient_id) => '/users/patients/' + patient_id;

// GET, POST
// Accepts: Empty body, JSON object
// Returns: JSON array of doctor objects [{ "id", "photo", "phone", "specialization", "aboutme", "work_location", "user", "first_name", "last_name", "email", "role" }, ...]
export const DOCTORS = `/users/doctors/`;

// GET, POST, PUT/PATCH, DELETE
// Accepts: Empty body, JSON object, JSON object, Empty body
// Returns: JSON doctor object { "id", "photo", "phone", "specialization", "aboutme", "work_location", "user", "first_name", "last_name", "email", "role" }
export const DOCTORS_BY_ID = (doctor_id) => '/users/doctors/' + doctor_id;

export const PERSONAL_DOCTOR_INFO = '/users/personal-info/doctor/';
export const PERSONAL_PATIENT_INFO = '/users/personal-info/patient/';


/*      ML API Endpoints     */
// POST /api/ml/ml-diagnosis-history/
// Accepts: JSON object with diagnosis data
// { "patient", "ucl.survival", "ucl.age", "ucl.pericardialeffusion", "ucl.fractionalshortening", "ucl.epss", "ucl.lvdd",
// "ucl.wallmotion_score", "ucl.wallmotion_index", "ucl.mult", "heart_beat.heart_beat_audio", "ecg.ecg_file", "echo_net.echo_net_file" }
// Returns: JSON object with diagnosis result
// {"id", "patient", "heart_beat", "ecg", "ucl", "echo_net",
//  "ecg_prediction", "echo_net_prediction", "ucl_prediction", "heart_beat_prediction",
//  "ecg_prediction_on", "echo_net_prediction_on", "ucl_prediction_on", "heart_beat_prediction_on"}
export const ML_DIAGNOSIS = '/api/ml/ml-diagnosis-history/';
export const ML_DIAGNOSIS_BY_ID = (diagnosis_id) => '/api/ml/ml-diagnosis-history/' + diagnosis_id;
export const ML_DIAGNOSIS_BY_PATIENT = (patient_id) => '/api/ml/ml-diagnosis-history/patient/' + patient_id; 
