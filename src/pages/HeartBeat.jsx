import React, {useState} from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const {Option} = Select;

import { Typography, Dropdown, Space, Divider, Col, Row, message, Upload, Button, Form, Input, Select, theme, Flex} from 'antd';
const { Title} = Typography;
import '/src/assets/styles/MLPredictionPage.css';
import { handleHeartBeat } from '../api/handleHeartBeat';

var output = null;

export default function HeartBeat() {
  const [file, setFile] = useState(null);

  const handleAPIRequest = () => {

    const formData = new FormData();
    console.log("FILE", file);
    formData.append('file', file);
      handleHeartBeat(formData).then((response) => {
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
                        <Title>Heart Beat</Title>
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
                </div>
            <Flex
                vertical
                style={{alignItems: 'center', width: '20%',justifyContent: 'center', margin: 'auto', marginTop: '70px', scale: '1.7'
                }}
            >
                <Button onClick={handleHeartBeat()}
                    type="primary" style={{height: '60px', scale: '1.1', fontSize: '18px'}} block>
                    SUBMIT FOR PREDICTION
                    
                </Button>
                <div>{JSON.stringify(output)}</div>
                
            </Flex>
            <div style={{height: '120px'}}/>

            <div style = {{
                border: '3px solid #0080FF', 
                color: 'black', 
                borderRadius: '10px', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>
            
            </div>
          
        </div>
    );
}
