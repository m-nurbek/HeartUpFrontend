import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';

const PredictionPage = () => {
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
        const matResponse = await axios.post('https://fddb-178-91-253-107.ngrok-free.app/upload', matFormData);
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

        const jsonResponse = await axios.post('https://d108-178-91-253-107.ngrok-free.app/predict', jsonFormData);
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
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1>Model Prediction Page</h1>

      <div style={{height: '50px'}}></div>

      <div style={{ border: '3px solid #0080FF', color: 'black', borderRadius: '10px', width: '100%',boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)' }} />

      <div style={{height: '100px'}}></div>
      {/* Heart Beat Model */}
      <div style={{ width: '50%', marginBottom: '20px', border: '4px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <h2 style={{ marginRight: '20px', textAlign: 'left', transform: 'translateX(-60px)', fontSize: '36px'}}>Heart Beat Model</h2>
          <div
            onDrop={handleAudioDrop}
            onDragOver={handleDragOver}
            style={{ border: '2px dashed #ccc', padding: '20px', marginRight: '75px', width: '40%', marginBottom: '10px', textAlign: 'center' }}
          >
            <h3>Drag and drop audio file here</h3>
            {audioFile && <p>{audioFile.name}</p>}
          </div>
          <p style={{ textAlign: 'right', transform: 'translateX(50px)', fontSize: '20px'}}>{audioOutput}</p>
      </div>
      <Button onClick={handleClearAudio} style={{ marginBottom: '10px', marginLeft: 'auto', scale: '1.5' }}>Clear submitted file</Button>
    </div>

      {/* Divider */}
      <hr style={{ width: '50%', marginBottom: '25px'}} />

      {/* UCL Model */}
      <div style={{ width: '50%', marginBottom: '20px', border: '4px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center'}}>
          <h2 style={{ marginRight: '20px', textAlign: 'left', marginLeft: '60px', transform: 'translateX(-250px)', fontSize: '36px'}}>UCL Model</h2>
          <Form layout="vertical" style={{ width: '20%', marginRight: '20px'}}>
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
            </Form>
          <p style={{ textAlign: 'right', transform: 'translateX(220px)', fontSize: '20px'}}>{jsonOutput}</p>
        </div>
        <Button onClick={handleClearJson} style={{ marginBottom: '10px', scale: '1.5'}}>Clear submitted file</Button>
      </div>

      {/* Divider */}
      <hr style={{ width: '50%', marginBottom: '25px'}} />

      {/* ECG Model */}
      <div style={{ width: '50%', marginBottom: '20px', border: '4px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
          <h2 style={{ marginRight: '20px', textAlign: 'left', transform: 'translateX(-80px)', fontSize: '36px'}}>ECG Model</h2>
          <div
            onDrop={handleAudioDrop}
            onDragOver={handleDragOver}
            style={{ border: '2px dashed #ccc', padding: '20px', width: '40%', marginBottom: '10px', textAlign: 'center' }}
          >
            <h3>Drag and drop audio file here</h3>
            {audioFile && <p>{audioFile.name}</p>}
          </div>
          <p style={{ textAlign: 'right', transform: 'translateX(90px)', fontSize: '20px'}}>{matOutput}</p>
        </div>
        <Button onClick={handleClearMat} style={{ marginBottom: '10px', marginLeft: 'auto', scale: '1.5'}}>Clear submitted file</Button>
      </div>

      <Button onClick={handleSubmit} type="primary" style={{ width: '200px', scale: '1.5', marginTop: '50px', marginBottom: '50px' }} block>
        Submit
      </Button>
    </div>
  );
};

export default PredictionPage;
