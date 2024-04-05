import React, {useState} from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const {Option} = Select;
import { Typography, Dropdown, Space, Divider, Col, Row, message, Upload, Button, Form, Input, Select, theme, Flex} from 'antd';
const { Title} = Typography;
import '/src/assets/styles/MLPredictionPage.css';
import { handleEcg } from '../api/handleEcg';

var output = null;

export default function Ecg() {
  const [file, setFile] = useState(null);

  const handleAPIRequest = () => {

    const formData = new FormData();
    console.log("FILE", file);
    formData.append('file', file);
      handleEcg(formData).then((response) => {
          console.log(response);
          output = response;
          return output;
      })
  }


    return (
        <div >
            <div className="ml_page_container">
                <div className = "card_container">
                    <Row style = {{margin: '8em', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        <Title>ECG</Title>
                    </Row>
                    <Row>
                    <Dragger 
                        beforeUpload={(file) => {
                            setFile(file);
                            return false ;
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload
                        </p>
                    </Dragger>
                    </Row>
                <details></details>
           
        </div>
    );
}
