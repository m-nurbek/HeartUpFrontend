import React, {useState} from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const {Option} = Select;
import { Typography, Dropdown, Space, Divider, Col, Row, message, Upload, Button, Form, Input, Select, theme} from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

import '/src/assets/styles/MLPredictionPage.css';
import { handleMLs } from '../api/handleMLs';



export default function MLPredictionPage() {
  const [file, setFile] = useState(null);
  
  const handleAPIRequest = () => {
    const formData = new FormData();
    console.log("FILE", file);
    formData.append('files', file);
      handleMLs(formData).then((response) => {
          console.log(response);
      })
  }

    return (
        <div>
            <div className="ml_page_container">
                <Typography>
                    <Title>ML Prediction Models</Title>
                </Typography>
                <br />
            </div>
            <>
                    <Form>
                        <Form.Item
                            label="Select Model"
                            name="model"
                            rules={[{ required: true, message: 'Please select a model' }]}
                        >
                            <Select
                                placeholder="Select a model"
                                allowClear
                            >
                                <Option value="ucl">UCL</Option>
                                <Option value="heartbeat">Heart beat audio</Option>
                                <Option value="ecg">ECG</Option>
                                <Option value="echonet">EchoNET</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    <div>Search Result List</div>
                </>
            <div style = {{height: '20px'}}/>
            <div className = "card_container">
                <Row>
                    <Title>UCL</Title>
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

            <div style = {{height: '50px'}}/>

            <div className = "card_container">
                <Row>
                    <Title>Heart beat audio</Title>
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

            <div style = {{height: '50px'}}/>

            <div className = "card_container">
                <Row>
                    <Title>ECG</Title>
                </Row>
                <Row>
                <Dragger 
                  beforeUpload={(file) => {
                    setFile(file);
                    return false; // return false so file is not auto uploaded
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

            <div style = {{height: '50px'}}/>

            <div className = "card_container">
                <Row>
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
                <Button onClick={() => {
                  handleAPIRequest()
                }}>Click</Button>
            </div>
            
        </div>
    );
}
