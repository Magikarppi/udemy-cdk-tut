import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const baseURL: string = process.env.REACT_APP_API_URL!;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/photos`);
        console.log(data);
        setPhotos(data);
        return;
      } catch (error) {
        return;
      }
    };
    fetchPhotos();
  }, [baseURL]);

  const getCarouselImg = (photo: any) => {
    return (
      <Carousel.Item interval={2000} style={{ height: 400 }}>
        <img src={photo.url} alt={photo.filename} className="h-100" />
        <Carousel.Caption>{photo.filename}</Carousel.Caption>
      </Carousel.Item>
    );
  };

  return (
    <div className="App bg-secondary min-vh-100">
      <Carousel>{photos.map((photo) => getCarouselImg(photo))}</Carousel>
    </div>
  );
}

export default App;
