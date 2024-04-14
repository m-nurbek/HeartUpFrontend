import { useEffect, useState } from "react";
import { postECG, postUCL } from "../api/handleModels";
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default function ModelsPage() {
    const [ecgOutput, setEcgOutput] = useState(null);
    const [uclOutput, setUclOutput] = useState(null);

    const props = {
        beforeUpload: async (file) => {
            const response = await postECG(file);
            setEcgOutput(response.class);
            return false; // return false to prevent auto upload
        },
    };

    useEffect(() => {
        const callApis = async () => {
            const response = await postUCL();
            setUclOutput(response.prediction);
        }

        callApis()
    }, []);

    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

            UCL output:<br /> {uclOutput}<br /><br />
            ECG output:<br /> {ecgOutput}

        </>
    );
}
