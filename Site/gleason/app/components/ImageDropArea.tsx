import Marco from "./Marco";
import DropImageLabel from "./DropImageLabel";

interface ImageDroperProps {
    styles: any,
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void,
    handleDragOver: (e: React.DragEvent<HTMLInputElement>) => void,
    handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    images: any;
    setImages: React.Dispatch<React.SetStateAction<any[]>>;
}

import React, { useRef } from 'react';

export default function ImageDroper({styles, handleDrop, handleDragOver, handleFileInput, images, setImages}: ImageDroperProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Div clicked');
    console.log('Opening file dialog');
    fileInputRef.current?.click();
  };

  const handleXClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImages([]);
  };

  const dropZoneClass = images.length > 0 ? `${styles.dropZone} ${styles.row}` : `${styles.dropZone} ${styles.column}`;
    return(
      <div 
          className={dropZoneClass}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleDivClick}
        >
          <input 
            type="file"
            accept="image/*"
            className={styles.fileInput}
            id="file-upload"
            onChange={handleFileInput}
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          {images.length>0&& (
            <div className={styles.dropZoneExibition}>
            <div className={styles.imageTable}>
            {images.map((image: any, index: number) => (
              <Marco imagem={image} setImages={setImages} key={index} styles={styles}/>
            ))}
          </div>
          <div className={styles.removeAllimages} onClick={handleXClick}>
            x
          </div>
          </div>
          )}
          {images.length==0&& (
            <DropImageLabel htmlFor="file-upload" styles={styles}/>
          )}

          
        </div>
    )
}