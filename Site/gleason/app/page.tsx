'use client';
import { useState, useEffect } from 'react';
import styles from "./styles/page.module.css"; // Ensure this file exists in the same directory
import ImageDropArea from "./components/ImageDropArea"; // Ensure this file exists in the same directory
import ResultTable from "./components/ResultTable"; // Ensure this file exists in the same directory
import * as ort from 'onnxruntime-web';
import {Resultado} from './tipos';
import './styles/globals.css';

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [results, setResults] = useState<Array<Resultado>>([]);
  const [model, setModel] = useState<ort.InferenceSession | null>(null);
  useEffect(() => {
    async function init() {
      try {
        // Set WebAssembly paths
        ort.env.wasm.wasmPaths = {
          'ort-wasm.wasm': '/static/chunks/ort-wasm.wasm',
          'ort-wasm-simd.wasm': '/static/chunks/ort-wasm-simd.wasm',
          'ort-wasm-threaded.wasm': '/static/chunks/ort-wasm-threaded.wasm'
        };

        // Load model using absolute path
        const model = await ort.InferenceSession.create('/models/model_example.onnx', {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'all'
        });
        
        setModel(model);
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    }
    init();
  }, []);

   

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(prev => [...prev, ...files]);// next images are images + e.target.files
    console.log('Updated images list:', files);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    /*
      Browser tries to open files in a new tab/window
      Browser might try to navigate away from the page
      Browser might try to display the image directly 
    */
    const files = Array.from(e.dataTransfer.files);
    setImages(prev => [...prev, ...files]);
    console.log('Dropped images:', files);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  async function fileToFloat32Array(image: File): Promise<Float32Array> {
    const img = new Image();
    const imageUrl = URL.createObjectURL(image);
    
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = imageUrl;
    });
  
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, 128, 128);
  
    const imageData = ctx?.getImageData(0, 0, 128, 128);
    const pixels = imageData?.data;
  
    // Reshape to [1, 128, 128, 3]
    const float32Data = new Float32Array(128 * 128 * 3);
    for (let y = 0; y < 128; y++) {
      for (let x = 0; x < 128; x++) {
        const pixelIndex = (y * 128 + x) * 4;
        const tensorIndex = (y * 128 + x) * 3;
        float32Data[tensorIndex] = pixels![pixelIndex] / 255.0;     // R
        float32Data[tensorIndex + 1] = pixels![pixelIndex + 1] / 255.0; // G
        float32Data[tensorIndex + 2] = pixels![pixelIndex + 2] / 255.0; // B
      }
    }
  
    URL.revokeObjectURL(imageUrl);
    return float32Data;
  }
  
  async function predict(image: File): Promise<number[]> {
    if (!model) return [0,0,0,0,0];
    
    try {
      const float32Data = await fileToFloat32Array(image);
      // Create tensor with correct shape [1, 128, 128, 3]
      const tensor = new ort.Tensor('float32', float32Data, [1, 128, 128, 3]);
      const feeds = { 'conv2d_input': tensor };
      const outputMap = await model.run(feeds);
      const outputTensor = outputMap[Object.keys(outputMap)[0]];

      const data = outputTensor.data as Float32Array;
      const array = Array.from(data);
      const arredondado = array.map(value => Number((value*100).toFixed(3)));
      return arredondado;
    } catch(error) {
      console.error('Prediction error: ', error);
      return [0,0,0,0,0];
    }
  }

  async function handleScan(){
    var newResults = []
    for(var image of images){
      console.log('Scanning image:', image);
      var prediction = await predict(image)
      newResults.push({imageName: image.name, g_1:prediction[0].toString(), g_2:prediction[1].toString(), g_3:prediction[2].toString(), g_4:prediction[3].toString(), g_5:prediction[4].toString()})

    }
    setResults(newResults)
  }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.titleContainer}>
            <p className="mb-3"style={{ fontSize: '3rem' }}></p>
            <img src='/logo-placeholder.webp' alt='Logo' className='w-20 h-20'/>
            <div className="text-4xl font-bold pb-2 border-b border-gleason-blue shadow-sm">ProstaScan AI – Análise Inteligente de Biópsias</div>
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionText}>
            Carregue suas imagens de lâminas de biópsia na caixa abaixo e clique em "Analisar". Nossa IA avalia automaticamente a classificação de Gleason, auxiliando no diagnóstico com rapidez e precisão.
          </div>
        </div>
        <ImageDropArea styles={styles} handleDragOver={handleDragOver} handleDrop={handleDrop} handleFileInput={handleFileInput} images={images} setImages = {setImages}></ImageDropArea>
        {images.length > 0 &&
          <button onClick={handleScan} className={styles.scanButton}>
            Ver predição feita pela rede neural
          </button>
        } 
        <ResultTable styles={styles} results={results}></ResultTable>
      </main>
    </div>
  );
}