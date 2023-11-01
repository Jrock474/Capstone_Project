
import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const AboutUs = () => {
  return (
    <>
    <div className='carousel-container'>
    <Carousel>
      <Carousel.Item>
        <img src = "./eth1.jpg" className='carousel-imgs'/>
        <Carousel.Caption className='carousel-captionsEth'>
          <h1>Ethan Shulman</h1>
          <h3>Front-End Dev</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
          <p>hello world whats goooood</p>
       <img src = "./Jor1.jpg" className='carousel-imgs'/>
        <Carousel.Caption className='carousel-captionsJor'>
          <h1>Jordan Williams</h1>
          <h3>Back-End Dev</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src = "./Sab1.jpg" className='carousel-imgs'/>
        <Carousel.Caption className='carousel-captionsSab'>
          <h1>Sababu Barashango</h1>
          <h3>Back-End Dev</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src = "./Ant1.jpg" className='carousel-imgs'/>
        <Carousel.Caption className='carousel-captionsAnt'>
          <h1>Anthony Badila</h1>
          <h3>Front-End Dev</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </>
  );
}

export default AboutUs
