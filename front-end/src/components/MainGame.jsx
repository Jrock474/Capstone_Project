import React, {useState, useEffect, useContext, createContext} from 'react'
import Music1 from './Music1'
import { WeatherContext } from '../App';

const MainGame = () => {
  ///weather context
  const weatherData = useContext(WeatherContext);

  //Character Data

  const [monoData, setMonoData] = useState({
  health: 100,
  hunger: 100,
  cleanliness: 100,
  happiness: 100
  })

  // Determines the state of character based off of data
  let isMonoSick = false
  let isMonoAngry = false
  let isPoopActive = false
  
  // Changes animation based off of selected activity
  const [monoState, setMonoState] = useState("/gifs/Dino_Still.gif")

  const handleMonoChange = () =>{
    
    // Checks to see if Mono health is below 26
    if(monoData.health <= 25){
      isMonoSick = true
    } else {
      isMonoSick = false
    }

    // Checks to see if Mono happiness is below 26
    if(monoData.happiness <= 25){
      isMonoAngry = true
    } else {
      isMonoAngry = false
    }

    // Changes Mono animation based off its state
    if(isMonoSick){
      return setMonoState("/gifs/Dino_Sick.gif")
    } else if (isMonoAngry){
      return setMonoState("/gifs/DinoAngry.gif")
    } 
  }
  
  // Runs every time Mono's data is changed
  useEffect(()=>{
    handleMonoChange()
    console.log(weatherData)
  },[monoData])

  const handleClick = (e) =>{
    setMonoState(e)
  }
  

  return (
  
    <div>
        <div className="wDetails">
            <img
              src={weatherData[0].icon}
              alt="Weather Icon"
              className="weather-icon"
            />
             <p >Weather Condition: {weatherData[0].condition}</p>
          </div>
      <div className="GameBody">
        <div className="Pet" id="Pet">
          <img src={monoState} style= {{ height: 500 }} /> 
        </div>
        <div className="MoodBox">
          <img src={"/images/MoodAngry.png"} style= {{ height: 100 }} />
            <img src={"/images/MoodDiscomfort.png"} style= {{ height: 100 }} />
              <img src={"/images/MoodSick.png"} style= {{ height: 100 }} />
              </div>
              <div className="ActivityBox">
                {/* <img src={"/images/FightIcon.png"} style= {{ height: 100 }} /> */}
                  <img onClick={() =>{handleClick("/gifs/Dino_Eating.gif")}} src={"/images/FoodIcon.png"} style= {{ height: 100 }} />
                    <img onClick={() =>{handleClick("/gifs/Dino_Pill.gif")}} src={"/images/MedicineIcon.png"} style= {{ height: 100 }} />
                      <img src={"/images/BathIcon.png"} style= {{ height: 100 }} />
                        <img onClick={() =>{handleClick("/gifs/Dino_Play.gif")}} src={"/images/PlayIcon.png"} style= {{ height: 100 }} />
                        </div>
                        <img src={isPoopActive ? "/images/Poop.png" : null} id="Poop" style= {{ height: 100 }} />
                        </div>
                        <Music1/>
                        
                      </div>
                      )
}
                      export default MainGame