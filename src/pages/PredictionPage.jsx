import React, { useState } from 'react';
import axios from 'axios';
import { Button, Flex } from 'antd';


const PredictionPage = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [matFile, setMatFile] = useState(null);
  const [audioOutput, setAudioOutput] = useState('Waiting for output');
  const [jsonOutput, setJsonOutput] = useState('Waiting for output');
  const [matOutput, setMatOutput] = useState('Waiting for output');

  const handleAudioDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setAudioFile(file);
  };

  const handleJsonDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setJsonFile(file);
  };

  const handleMatDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setMatFile(file);
  };

  const handleSubmit = async () => {
    try {
      if (audioFile) {
        const audioFormData = new FormData();
        audioFormData.append('file', audioFile);
        const audioResponse = await axios.post('https://hawk-model-dingo.ngrok-free.app/predict_audio', audioFormData);
        setAudioOutput(JSON.stringify(audioResponse.data));
      }

      if (jsonFile) {
        // Read the contents of the JSON file
        const reader = new FileReader();
        reader.onload = async (event) => {
          const jsonContent = JSON.parse(event.target.result);
          try {
            const jsonResponse = await axios.post('https://d108-178-91-253-107.ngrok-free.app/predict', jsonContent);
            setJsonOutput(JSON.stringify(jsonResponse.data));
          } catch (error) {
            console.error('Error submitting data:', error);
          }
        };
        reader.readAsText(jsonFile);
      }
         

      if (matFile) {
        const matFormData = new FormData();
        matFormData.append('files', matFile);
        const matResponse = await axios.post('https://fddb-178-91-253-107.ngrok-free.app/upload', matFormData);
        setMatOutput(JSON.stringify(matResponse.data));
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
    setJsonFile(null);
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
    
    <div style={{textAlign: 'center' }}>
        
        

        <h1>Model Prediction Page</h1>

        <div style = {{
                border: '3px solid #0080FF', 
                color: 'black', 
                borderRadius: '10px', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px'}}>
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

        

        <div style = {{
                border: '3px solid #A0A0A0', 
                width: '650px',
                justifyContent: 'center',
                margin: 'auto',
                color: 'black', 
                borderRadius: '10px', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '50%' }}>
            <h2>UCL Model</h2>
            <div
                onDrop={handleJsonDrop}
                onDragOver={handleDragOver}
                style={{ border: '2px dashed #ccc', padding: '20px', width: '100%', marginBottom: '10px' }}
            >
                <h3>Drag and drop JSON file here</h3>
                {jsonFile && <p>{jsonFile.name}</p>}
            </div>
            <p>{jsonOutput}</p>
            <Button onClick={handleClearJson} style={{ marginBottom: '10px' }}>Clear submitted file</Button>

            </div>
        </div>
        <div style = {{
                border: '3px solid #A0A0A0', 
                width: '650px',
                justifyContent: 'center',
                margin: 'auto',
                color: 'black', 
                borderRadius: '10px', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>
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

        <div style = {{
                border: '3px solid #A0A0A0', 
                width: '650px',
                justifyContent: 'center',
                margin: 'auto',
                color: 'black', 
                borderRadius: '10px', 
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)'}}/>

        <Button onClick={handleSubmit} type="primary" style={{width: '200px', scale: '1.5', marginTop: '50px', marginBottom: '50px'}} block>
            Submit
        </Button>
    </div>
  );
};

export default PredictionPage;
