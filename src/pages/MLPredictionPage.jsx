import React, {useState} from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const {Option} = Select;
import { Typography, Dropdown, Space, Divider, Col, Row, message, Upload, Button, Form, Input, Select, theme, Flex} from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

import '/src/assets/styles/MLPredictionPage.css';
import { handleMLs } from '../api/handleHeartBeat';

var output = null;

export default function MLPredictionPage() {
  const [file, setFile] = useState(null);

  const handleAPIRequest = () => {
    const formData = new FormData();
    console.log("FILE", file);
    formData.append('file', file);
      handleMLs(formData).then((response) => {
        console.log(response);
        output = response;
        return output;
      })
  }

    return (
        <div >
            <div className="ml_page_container">
                <Typography>
                    <Title>ML Prediction Models</Title>
                </Typography>
                <br />
            </div>
            <div className = "model_container">      
                <div style = {{height: '40px'}}/>
                        <Form>
                            <Form.Item style = {{width: '60%', margin: 'auto', }}
                                label="Select Model"
                                name="model"
                                rules={[{ required: true, message: 'Please select a model' }]}>
                                <Select 
                                    placeholder="Select a model"
                                    allowClear>
                                    <Option value="ucl">UCL</Option>
                                    <Option value="heartbeat">Heart beat audio</Option>
                                    <Option value="ecg">ECG</Option>
                                    <Option value="echonet">EchoNET</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    
                <div style = {{height: '30px'}}/>
                
                <div style = {{
                    border: '3px solid #0080FF', 
                    color: 'black', 
                    borderRadius: '10px', 
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>
                <div/>

                <div style = {{height: '50px'}}/>


                <div className = "card_container">
                    <Row style={{width: '40rem'}}>
                        <Col span={12}>
                            <Title>UCL</Title>
                        </Col>
                        
                        <Col span={12}>
                        <div className="form_container">
                            <Form name="trigger" style={{ maxWidth:2000}} layout="vertical" autoComplete="off">
                                <Form.Item
                                    label="Age"
                                    name="field_age"
                                    >
                                    <Input placeholder="Enter the age" />
                                </Form.Item>

                                <Form.Item
                                    label="Pericardial Effusion (True/False)"
                                    name="field_pericardial_effusion"
                                    >
                                    <Input placeholder="Enter True/False" />
                                </Form.Item>

                                <Form.Item
                                    label="Fractional Shortening"
                                    name="field_fractional_shortening"
                                    >
                                    <Input placeholder="Enter the number" />
                                </Form.Item>

                                <Form.Item
                                    label="EPSS"
                                    name="field_epss"
                                    >
                                    <Input placeholder="Enter the number" />
                                </Form.Item>

                                <Form.Item
                                    label="LVDD"
                                    name="field_lvdd"
                                    >
                                    <Input placeholder="Enter the number" />
                                </Form.Item>

                                <Form.Item
                                    label="Wallmotion Score"
                                    name="field_wallmotion_score"
                                    >
                                    <Input placeholder="Enter the score" />
                                </Form.Item>

                                <Form.Item
                                    label="Wallmotion Index"
                                    name="field_wallmotion_index"
                                    >
                                    <Input placeholder="Enter the index" />
                                </Form.Item>
                                
                            </Form>
                        </div>
                        </Col>
                        
                    </Row>
                    
                    
                </div>     

                <div style = {{height: '30px'}}/>

                <div style = {{
                    border: '3px solid #E0E0E0', 
                    color: 'black', 
                    width: '950px',
                    margin: 'auto',
                    borderRadius: '10px', 
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>
                <div style = {{height: '30px'}}/>
                
        
                <div className = "card_container">
                    <Row style = {{margin: '10em', display: 'flex', alignItems: 'start', justifyContent: 'left'}}>
                        <Title>Heart beat audio</Title>
                    </Row>
                    <Row>
                    <Dragger 
                    beforeUpload={(file) => {
                        setFile(file);
                        return false;
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
                    <Row style={{alignItems: 'center', marginLeft: '5em', fontSize: '46px'}}>
                        <div>{JSON.stringify(output)}</div>
                    </Row>
                </div>  

                <div style = {{height: '30px'}}/>
 
                <div style = {{
                    border: '3px solid #E0E0E0', 
                    color: 'black', 
                    width: '950px',
                    margin: 'auto',
                    borderRadius: '10px',      
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>

                <div style = {{height: '30px'}}/>
                

                <div className = "card_container">
                    <Row style = {{margin: '8em', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        <Title>ECG</Title>
                    </Row>
                    <Row>
                    <Dragger 
                    beforeUpload={(file) => {
                        setFile(file);
                        return false;
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

                <div style = {{height: '30px'}}/>

                <div style = {{
                    border: '3px solid #E0E0E0', 
                    color: 'black', 
                    width: '950px',
                    margin: 'auto',
                    borderRadius: '10px', 
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>

                <div style = {{height: '30px'}}/>

                <div className = "card_container">
                    <Row style = {{margin: '8em', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                        <Title>EchoNET</Title>
                    </Row>
                    <Row>
                        <Dragger >
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
            </div>
            <div style = {{height: '30px'}}/>

            <div style = {{
                border: '3px solid #E0E0E0', 
                color: 'black', 
                width: '950px',
                margin: 'auto',
                borderRadius: '10px', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>

            <div style={{height: '80px'}}/>

            <Flex
                vertical
                style={{alignItems: 'center', width: '20%',justifyContent: 'center', margin: 'auto', marginTop: '70px', scale: '1.7'
                }}
            >
                <Button onClick={handleAPIRequest()}
                    type="primary" style={{height: '60px', scale: '1.1', fontSize: '18px'}} block>
                    SUBMIT FOR PREDICTION
                    
                </Button>
                
            </Flex>
            <div style={{height: '120px'}}/>

            <div style = {{
                border: '3px solid #0080FF', 
                color: 'black', 
                borderRadius: '10px', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>
            
        </div>
    );
}
