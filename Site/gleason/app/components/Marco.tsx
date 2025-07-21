  import React from 'react';
    interface MarcoParams {
    imagem: File;
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    styles: any,
  }
  const Marco: React.FC<MarcoParams> = ({ imagem, setImages, styles }) => {
    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('Removing image:', imagem);
        setImages(prevImages => prevImages.filter(img => img !== imagem));
    };
    return (
      <div className={styles.marco} >
        <div className={styles.marcoImageContainer}>
          <img src={URL.createObjectURL(imagem)} alt={imagem.name} />
        </div>
        <button className={styles.buttonInsideDropzone} onClick={handleRemove}>Remover</button>
      </div>
    );
  };
  export default Marco;