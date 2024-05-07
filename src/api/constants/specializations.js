function getSpecializationTitle(specialization) {
    const specializationMap = {
        'cardiologist': 'Cardiology specialist',
        'dermatologist': 'Dermatology specialist',
        'endocrinologist': 'Endocrinology specialist',
        'gastroenterologist': 'Gastroenterology specialist',
        'nephrologist': 'Nephrology specialist',
        'neurologist': 'Neurology specialist',
        'oncologist': 'Oncology specialist',
        'ophthalmologist': 'Ophthalmology specialist',
        'pediatrician': 'Pediatric specialist',
        'psychiatrist': 'Psychiatry specialist',
        'pulmonologist': 'Pulmonology specialist',
        'radiologist': 'Radiology specialist',
        'rheumatologist': 'Rheumatology specialist',
        'urologist': 'Urology specialist'
    };

    return specializationMap[specialization] || 'Unknown Specialist';
}

export const specializations = [
    'cardiologist',
    'dermatologist',
    'endocrinologist',
    'gastroenterologist',
    'nephrologist',
    'neurologist',
    'oncologist',
    'ophthalmologist',
    'pediatrician',
    'psychiatrist',
    'pulmonologist',
    'radiologist',
    'rheumatologist',
    'urologist'
]

export default getSpecializationTitle;