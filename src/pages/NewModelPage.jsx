import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Typography} from 'antd';
import axios from 'axios';
import { postECG } from '../api/handleModels';

const NewModelPage = () => {

    const { Text, Title} = Typography;


    const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [matFile, setMatFile] = useState(null);
  const [audioOutput, setAudioOutput] = useState('Waiting for output...');
  const [jsonOutput, setJsonOutput] = useState('Waiting for output...');
  const [matOutput, setMatOutput] = useState('Waiting for output...');

  const [jsonFormData, setJsonFormData] = useState({
    survival: '',
    age: '',
    pericardialeffusion: '',
    fractionalshortening: '',
    epss: '',
    lvdd: '',
    wallmotion_score: '',
    wallmotion_index: '',
    mult: ''
  });

  const handleAudioDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setAudioFile(file);
  };



  const handleMatDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setMatFile(file);
  };

  const handleJsonFieldChange = (field, value) => {
    setJsonFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (matFile) {
        const matFormData = new FormData();
        matFormData.append('files', matFile);
        const matResponse = await axios.post('https://3709-178-91-253-107.ngrok-free.app/upload', matFormData);
        const class_val = matResponse.data.class;
        const probability = matResponse.data.probability;
        const output_val = class_val + ' with probability: ' + probability;
        setMatOutput(JSON.stringify(output_val));
      }
      
      if (audioFile) {
        const audioFormData = new FormData();
        audioFormData.append('file', audioFile);
        const audioResponse = await axios.post('https://hawk-model-dingo.ngrok-free.app/predict_audio', audioFormData);
        const prediction = audioResponse.data.prediction;
        setAudioOutput(JSON.stringify(prediction));
      }
      
      if (jsonFormData) {

        const jsonResponse = await axios.post('https://a0c9-178-91-253-107.ngrok-free.app/predict', jsonFormData);
        const prediction = jsonResponse.data.prediction;
        setJsonOutput(JSON.stringify(prediction));
      }

    
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleClearAudio = () => {
    setAudioFile(null);
    setAudioOutput('Waiting for output');
  };

  const handleClearJson = () => {
    setJsonFormData({
      survival: '',
      age: '',
      pericardialeffusion: '',
      fractionalshortening: '',
      epss: '',
      lvdd: '',
      wallmotion_score: '',
      wallmotion_index: '',
      mult: ''
    });
    setJsonOutput('Waiting for output');
  };

  const handleClearMat = () => {
    setMatFile(null);
    setMatOutput('Waiting for output');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };



  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{fontSize: '40px'}}>SMART DIAGNOSIS</h1>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Row gutter={[16, 16]} style={{justifyContent: 'center', width: '100%' }}>
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10em'}}>
                    <Title >About the model</Title>
                    <Title style={{width: '80%', fontWeight: 'normal'}}level={3}>The following model predicts and classifies whether the patient after the first congestive heart attack will survive within one year or not.</Title>
                

                    <Title >Instructions</Title>
                    <Title style={{width: '80%', fontWeight: 'normal'}}level={3}>Please provide the necessary information listed in the form on the right side of the page. <br/> <br/>
                    After entering the required data, press the <span style={{fontWeight: 'bold'}}>“Submit”</span> button to get the prediction</Title>
                
                </Col>
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3em'}}>
                    <div style={{marginLeft: '8em', width: '70%', marginBottom: '20px', borderRadius: '10px', padding: '20px' }}>
                        <Form layout="vertical" style={{ width: '40%', marginLeft: '60px'}}>
                            {/* Form fields */}
                            <Form.Item label="Survival" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.survival} onChange={e => handleJsonFieldChange('survival', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Age" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.age} onChange={e => handleJsonFieldChange('age', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Pericardial Effusion" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.pericardialeffusion} onChange={e => handleJsonFieldChange('pericardialeffusion', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Fractional Shortening" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.fractionalshortening} onChange={e => handleJsonFieldChange('fractionalshortening', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="EPSS" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.epss} onChange={e => handleJsonFieldChange('epss', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="LVDD" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.lvdd} onChange={e => handleJsonFieldChange('lvdd', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Wall Motion Score" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.wallmotion_score} onChange={e => handleJsonFieldChange('wallmotion_score', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Wall Motion Index" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.wallmotion_index} onChange={e => handleJsonFieldChange('wallmotion_index', e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Mult" style={{scale: '1.2'}}>
                            <Input value={jsonFormData.mult} onChange={e => handleJsonFieldChange('mult', e.target.value)} />
                            </Form.Item>
                            <Button onClick={handleSubmit} type="primary" style={{ width: '200px', scale: '1.5', marginTop: '50px', marginLeft: '20px'}} block>
                                Submit
                            </Button>

                        </Form>
                    
                        <Row align="middle" style={{marginLeft:'-14em', marginTop: '4em', justifyContent: 'center'}}>
                            <Col>
                                <Text style={{fontSize:'20px', marginRight: '10px'}}>Output: </Text>
                            </Col>
                            <Col>
                                <p style={{marginRight: '2em', textAlign: 'right', fontSize: '20px'}}>{jsonOutput}</p>
                            </Col>
                            
                        </Row>
                        <Button onClick={handleClearJson} style={{ marginBottom: '10px', marginLeft: '6em', scale: '1.3' }}>Clear submitted file</Button>

                    </div>
                    
                </Col>
            </Row>
        </div>

        <div style={{height: '15em'}}> </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Row gutter={[16, 16]} style={{justifyContent: 'center', width: '100%' }}>
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10em'}}>
                    <Title >About the model</Title>
                    <Title style={{width: '80%', fontWeight: 'normal'}}level={3}>The following model is able to distinguish the heart sounds between the <span style={{fontWeight: 'bold', color: '#BB2E2E'}}>normal, murmur, extrastole, artifact and extrhals</span></Title>
                

                    <Title >Instructions</Title>
                    <Title style={{width: '80%', fontWeight: 'normal'}}level={3}>Please provide the heart sound data in the format of MP3 or WAV audio file by clicking on the “Upload” icon <br/> <br/>
                        After the submission of the audio file, please press the <span style={{fontWeight: 'bold'}}>“Submit”</span>button to get the prediction</Title>
                
                </Col>
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <div
                        onDrop={handleAudioDrop}
                        onDragOver={handleDragOver}
                        style={{ border: '2px dashed #ccc', padding: '20px', marginRight: '75px', width: '40%', marginBottom: '10px', textAlign: 'center' }}
                    >
                        <h3>Drag and drop audio file here</h3>
                        {audioFile && <p>{audioFile.name}</p>}
                    </div>
                    <Button onClick={handleSubmit} type="primary" style={{ width: '200px', scale: '1.5', marginRight:'5em', marginTop: '50px', marginBottom: '10px' }} block>
                        Submit
                    </Button>
                    <Row align="middle" style={{marginLeft:'-2em', marginTop: '4em', justifyContent: 'center'}}>
                        <Col>
                            <Text style={{fontSize:'20px', marginRight: '10px'}}>Output: </Text>
                        </Col>
                        <Col>
                            <p style={{marginRight: '2em', textAlign: 'right', fontSize: '20px'}}>{audioOutput}</p>
                        </Col>
                    </Row>
                    <Button onClick={handleClearAudio} style={{ marginBottom: '10px', marginRight: '5em', scale: '1.3' }}>Clear submitted file</Button>

                </Col>
            </Row>
        </div>

        <div style={{height: '15em'}}> </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Row gutter={[16, 16]} style={{justifyContent: 'center', width: '100%' }}>
            
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <div
                        onDrop={handleMatDrop}
                        onDragOver={handleDragOver}
                        style={{ border: '2px dashed #ccc', padding: '20px', marginRight: '75px', width: '40%', marginBottom: '10px', textAlign: 'center' }}
                    >
                        <h3>Drag and drop audio file here</h3>
                        {matFile && <p>{matFile.name}</p>}
                    </div>
                    <Button onClick={handleSubmit} type="primary" style={{ width: '200px', scale: '1.5', marginRight:'5em', marginTop: '50px', marginBottom: '10px' }} block>
                        Submit
                    </Button>
                    <Row align="middle" style={{marginLeft:'-2em', marginTop: '4em', justifyContent: 'center'}}>
                        <Col>
                            <Text style={{fontSize:'20px', marginRight: '10px'}}>Output: </Text>
                        </Col>
                        <Col>
                            <p style={{marginRight: '2em', textAlign: 'right', fontSize: '20px'}}>{matOutput}</p>
                        </Col>
                    </Row>
                    <Button onClick={handleClearMat} style={{ marginBottom: '10px', marginRight: '5em', scale: '1.3' }}>Clear submitted file</Button>

                </Col>

                <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10em'}}>
                    <Title >About the model</Title>
                    <Title style={{width: '80%', fontWeight: 'normal'}}level={3}>The following model is able to distinguish the heart sounds between the normal, murmur, extrastole, artifact and extrhals</Title>
                

                    <Title >Instructions</Title>
                    <Title style={{width: '80%', fontWeight: 'normal'}}level={3}>Please provide the ECG heart image in the format of PDF, JPG or MAT file by clicking on the “Upload” icon <br/> <br/>
                        After the submission of the file, please press the <span style={{fontWeight: 'bold'}}>“Submit”</span>button to get the prediction</Title>
                
                </Col>
            </Row>
        </div>

    </div>
    );
};

export default NewModelPage;
