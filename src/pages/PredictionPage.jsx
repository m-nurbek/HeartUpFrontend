import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';

const PredictionPage = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [matFile, setMatFile] = useState(null);
  const [audioOutput, setAudioOutput] = useState('Waiting for output');
  const [jsonOutput, setJsonOutput] = useState('Waiting for output');
  const [matOutput, setMatOutput] = useState('Waiting for output');

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
    <div style={{ textAlign: 'center' }}>
      <h1>Model Prediction Page</h1>

      <div style={{ border: '3px solid #0080FF', color: 'black', borderRadius: '10px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)' }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '50%' }}>
          <h2>Heart Beat Model</h2>
          <div
            onDrop={handleAudioDrop}
            onDragOver={handleDragOver}
            style={{ border: '2px dashed #ccc', padding: '20px', width: '100%', marginBottom: '10px' }}
          >
            <h3>Drag and drop audio file here</h3>
            {audioFile && <p>{audioFile.name}</p>}
          </div>
          <p>{audioOutput}</p>
          <Button onClick={handleClearAudio} style={{ marginBottom: '10px' }}>Clear submitted file</Button>
        </div>
      </div>

      <div style={{ border: '3px solid #A0A0A0', width: '650px', justifyContent: 'center', margin: 'auto', color: 'black', borderRadius: '10px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)' }} />
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '50%' }}>
          <h2>UCL Model</h2>
          <Form layout="vertical">
            <Form.Item label="Survival">
              <Input value={jsonFormData.survival} onChange={e => handleJsonFieldChange('survival', e.target.value)} />
            </Form.Item>
            <Form.Item label="Age">
              <Input value={jsonFormData.age} onChange={e => handleJsonFieldChange('age', e.target.value)} />
            </Form.Item>
            <Form.Item label="Pericardial Effusion">
              <Input value={jsonFormData.pericardialeffusion} onChange={e => handleJsonFieldChange('pericardialeffusion', e.target.value)} />
            </Form.Item>
            <Form.Item label="Fractional Shortening">
              <Input value={jsonFormData.fractionalshortening} onChange={e => handleJsonFieldChange('fractionalshortening', e.target.value)} />
            </Form.Item>
            <Form.Item label="EPSS">
              <Input value={jsonFormData.epss} onChange={e => handleJsonFieldChange('epss', e.target.value)} />
            </Form.Item>
            <Form.Item label="LVDD">
              <Input value={jsonFormData.lvdd} onChange={e => handleJsonFieldChange('lvdd', e.target.value)} />
            </Form.Item>
            <Form.Item label="Wall Motion Score">
              <Input value={jsonFormData.wallmotion_score} onChange={e => handleJsonFieldChange('wallmotion_score', e.target.value)} />
            </Form.Item>
            <Form.Item label="Wall Motion Index">
              <Input value={jsonFormData.wallmotion_index} onChange={e => handleJsonFieldChange('wallmotion_index', e.target.value)} />
            </Form.Item>
            <Form.Item label="Mult">
              <Input value={jsonFormData.mult} onChange={e => handleJsonFieldChange('mult', e.target.value)} />
            </Form.Item>
          </Form>
          <p>{jsonOutput}</p>
          <Button onClick={handleClearJson} style={{ marginBottom: '10px' }}>Clear submitted file</Button>
        </div>
      </div>

      <div style={{ border: '3px solid #A0A0A0', width: '650px', justifyContent: 'center', margin: 'auto', color: 'black', borderRadius: '10px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ width: '50%' }}>
          <h2>ECG Model</h2>
          <div
            onDrop={handleMatDrop}
            onDragOver={handleDragOver}
            style={{ border: '2px dashed #ccc', padding: '20px', width: '100%', marginBottom: '10px' }}
          >
            <h3>Drag and drop .mat file here</h3>
            {matFile && <p>{matFile.name}</p>}
          </div>
          <p>{matOutput}</p>
          <Button onClick={handleClearMat} style={{ marginBottom: '10px' }}>Clear submitted file</Button>
        </div>
      </div>

      <Button onClick={handleSubmit} type="primary" style={{ width: '200px', scale: '1.5', marginTop: '50px', marginBottom: '50px' }} block>
        Submit
      </Button>
    </div>
  );
};

export default PredictionPage;
