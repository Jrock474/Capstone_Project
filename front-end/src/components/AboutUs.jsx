
import React from 'react'
import { useState } from 'react';
import Music8 from './MusicFolder/AboutUsOst';
const AboutUs = () => {
  return (
    <>

      <div>
<Music8/>
        <div className='AnthonyContainer'>

          <div className='AnthonyPfp'>
            <img src={"../images/AboutMe_Anthony.PNG"} style={{ height: 500 }} />
          </div>

          <div className='AnthonyText'>
            <p style={{alignSelf:'center'}}>Hello my name is Anthony. kdjfbvksdjbgkjsdbhgkjbhsdogbksdgbksdjbgosd
              sdkfvkasdhbfkajsdhfbkasdbgkasjbgkasjdbgkjwf
            </p>
          </div>
          </div>

          <div className='SababuContainer'>

          <div className='SababuPfp'>
            <img src={"../images/AboutMe_Sababu.PNG"} style={{ height: 500 }} />
          </div>

          <div className='SababuText'>
            <p style={{alignSelf:'center'}}>My name is Sababu Barashango and I am a Fullstack Computer Software Developer with a background in creativity. I've been writing code since I was very young using Lego Mindstorms and eventually coding for my family's buisness site. After graduating college I went to work as an actor and was able to follow my passion both there and in coding. Gave development is also one of my passions and I'm proud to introduce the first fully functional game i worked on. 
            <a href="https://portfolio-ivory-delta-98.vercel.app/">Portfolio</a>       <a href="https://drive.google.com/file/d/18SQ9YnNfsLhL2dW3GMwAMqSKOnxu1Qew/view">Resume</a>       <a href="https://github.com/sababu1">Github</a>          <a href="https://www.linkedin.com/in/sababu-barashango-482b2714b/">LinkedIn</a>
</p>
          </div>
          </div>

          <div className='JordanContainer'>

          <div className='JordanPfp'>
            <img src={"../images/AboutMe_Jordan.PNG"} style={{ height: 500 }} />
          </div>

          <div className='JordanText'>
            <p style={{alignSelf:'center'}}>Hello my name is Jordan. kdjfbvksdjbgkjsdbhgkjbhsdogbksdgbksdjbgosd
              sdkfvkasdhbfkajsdhfbkasdbgkasjbgkasjdbgkjwf
            </p>
          </div>
          </div>

          <div className='EthanContainer'>

          <div className='EthanPfp'>
            <img src={"../images/AboutMe_Ethan.PNG"} style={{ height: 500 }} />
          </div>

          <div className='EthanText'>
            <p style={{alignSelf:'center'}}>Hello my name is Ethan. kdjfbvksdjbgkjsdbhgkjbhsdogbksdgbksdjbgosd
              sdkfvkasdhbfkajsdhfbkasdbgkasjbgkasjdbgkjwf
            </p>
          </div>
          </div>
          

      </div>

    </>
  );
}

export default AboutUs
