import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import imageJson from './images.json'
import './App.css';

function App() {
  let [images, setImages] = useState([]);

  useEffect(() => {
    function getMeta(url) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = url;
        });
    }
    Promise.all(imageJson.map(async (image) => await getMeta(image.url)))
    .then(imageData => {
        imageData.forEach(image => {
          console.log(image)
          console.log(image.naturalWidth, image.naturalHeight, image.src)
        })
        setImages(imageData.map(image => ({
          src: image.src,
          isPortrait: image.naturalWidth < image.naturalHeight
        })))
      }
    )
  }, [])
  console.log(images)
  return (
    <div className="App">
      <div className="wrapper">
        {
          images.map((image) => <img src={image} />)
        }
      </div>
    </div>
  );
}

export default App;
