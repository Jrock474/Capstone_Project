import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
const AboutUs = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img src = "./Eth.png"/>
        <Carousel.Caption>
          <h3>Ethan Shulman</h3>
          <p>front end dev</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img src = "./Jordan.jpeg"/>
        <Carousel.Caption>
          <h3>Jordan Williams</h3>
          <p>backend dev</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src = "./Sab.jpeg"/>
        <Carousel.Caption>
          <h3>Sababu Barashango</h3>
          <p>
            backend dev
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src = "./Ant.png"/>
        <Carousel.Caption>
          <h3>Anthony Badila</h3>
          <p>
            front end dev
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default AboutUs