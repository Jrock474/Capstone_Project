import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
const AboutUs = () => {
  return (
    <>
    <div className='carousel-container'>
    <Carousel>
      <Carousel.Item>
        <img src = "./Eth.png" className='carousel-imgs'/>
        <Carousel.Caption>
          <h3>Ethan Shulman</h3>
          <p>Front-End Dev</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img src = "./Jordan.jpeg" className='carousel-imgs'/>
        <Carousel.Caption>
          <h3>Jordan Williams</h3>
          <p>Back-End Dev</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src = "./Sab.jpeg" className='carousel-imgs'/>
        <Carousel.Caption>
          <h3>Sababu Barashango</h3>
          <p>
            Back-End Dev
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src = "./Ant.png" className='carousel-imgs'/>
        <Carousel.Caption>
          <h3>Anthony Badila</h3>
          <p>
            Front-End Dev
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </>
  );
}

export default AboutUs