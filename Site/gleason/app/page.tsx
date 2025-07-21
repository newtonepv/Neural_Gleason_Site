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
        const model = await ort.InferenceSession.create('/models/resnet.onnx', {
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
      so we do the line above
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
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }
    ctx.drawImage(img, 0, 0, 224, 224);
    const imageData = ctx.getImageData(0, 0, 224, 224).data;

    const tensor = new Float32Array(1 * 3 * 224 * 224);
    // Mannually normalizyng for transforms_3 (the one that transformed for the training of resnet)
    //transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];

    for (let y = 0; y < 224; y++) {
        for (let x = 0; x < 224; x++) {
            const idx = (y * 224 + x) * 4;
            const r = imageData[idx] / 255.0;
            const g = imageData[idx + 1] / 255.0;
            const b = imageData[idx + 2] / 255.0;
            tensor[0 * 224 * 224 + y * 224 + x] = (r - mean[0]) / std[0];
            tensor[1 * 224 * 224 + y * 224 + x] = (g - mean[1]) / std[1];
            tensor[2 * 224 * 224 + y * 224 + x] = (b - mean[2]) / std[2];
        }
    }
  
    URL.revokeObjectURL(imageUrl);
    return tensor;
  }
  function softmax(arr: number[]): number[] {
      const max = Math.max(...arr);
      const exps = arr.map(x => Math.exp(x - max));
      const sum = exps.reduce((a, b) => a + b, 0);
      return exps.map(x => x / sum);
  }
  async function predict(image: File): Promise<number[]> {
    if (!model) return [0,0,0,0,0];
    
    try {
      const float32Data = await fileToFloat32Array(image);
      const tensor = new ort.Tensor('float32', float32Data, [1, 3, 224, 224]);
      const output = (await model.run({ 'input': tensor }))['output'].data as Float32Array;
      let chances_array = softmax(Array.from(output));
      chances_array = chances_array.map(x => Math.round(x * 100))
      console.log(chances_array)
      return chances_array;
    } catch(error) {
      console.error('Prediction error: ', error);
      return [0,0,0,0,0];
    }
  }

  async function handleScan(){
    var newResults = []
    for(var image of images){
      console.log('Scanning image:', image);
      var prediction = await predict(image);
      newResults.push({imageName: image.name, g_3:prediction[0].toString(), g_4:prediction[1].toString(), g_5:prediction[2].toString(), nc:prediction[3].toString()})

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