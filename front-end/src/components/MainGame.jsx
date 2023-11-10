import React, {useState, useEffect, useContext, useRef} from 'react'
import Music1 from './MusicFolder/Music1'
import { WeatherContext } from '../App';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { UserData } from '../App';
import { useNavigate } from "react-router-dom";

const MainGame = () => {
  const userData = useContext(UserData)
  const userID = userData[0].id

  const [initialPageLoad, setInitalPageLoad] = useState(true)
  
  ///weather context
  const weatherData = useContext(WeatherContext);

  //Character Data Initialization
  const [monoData, setMonoData] = useState({
    health: 75,
    hunger: 75,
    cleanliness: 75,
    happiness: 75,
    exp: 0
  })

  let monoExp = monoData.exp

  // Mono Idle States
  const dinoIdle = "/gifs/Dino_Still.gif"
  const dinoAngry = "/gifs/DinoAngry.gif"
  const dinoSick = "/gifs/Dino_Sick.gif"

  // Pet Animations based off buttons clicks
  const dinoEating = "/gifs/Dino_Eating2.gif"
  const dinoPill = "/gifs/Dino_Pill.gif"
  const dinoWash = "/gifs/Dino_Wash.gif"
  const dinoPlay = "/gifs/Dino_Play2.gif"

  // Determines the state of Mono based off of data
  const [isMonoSick, setIsMonoSick] = useState(false)
  const [isMonoAngry, setIsMonoAngry] = useState(false)
  const [isMonoHungry, setIsMonoHungry] = useState(false)
  let isPoopActive = false
  
  // Renders Mono based off of selected activity and or state
  const [monoState, setMonoState] = useState(null)
  const [isActivityActive, setIsActivityActive] = useState(false);

  // Runs on page startup
  useEffect(()=>{

    // Gets existing Mono data if possible
    const getSaveData = async() =>{
      const saveDataFetch = await fetch(`https://capstone-project-1cyy.vercel.app/monostats/${userID}`)
      const saveData = await saveDataFetch.json()
      console.log(saveData)

      if (saveData != null){
        const storedData = saveData.monoData
        setMonoData({...monoData, exp: storedData.exp, hunger: storedData.hunger, health: storedData.health, cleanliness: storedData.cleanliness, happiness: storedData.happiness})
        monoData
      }
      console.log(saveData.monoData)
    }

    // Checks to see if Mono stats are below a certain threshold when monoData is changed
    const handleMonoChange = () => {

      if(monoData.health <= 25){
        setIsMonoSick(true)
      } else {
        setIsMonoSick(false)
      }

      if(monoData.happiness <= 25){
        setIsMonoAngry(true)
      } else {
        setIsMonoAngry(false)
      }

      if(monoData.hunger <= 25){
        setIsMonoHungry(true)
      } else {
        setIsMonoHungry(false)
      }
    }


    // Changes Mono idle animation based off its state
    const handleMonoStateChange = () =>{ 

      if(isMonoSick){
        setMonoState(dinoSick)
      } else if (isMonoAngry){
        setMonoState(dinoAngry)
      } else if(isMonoHungry){
        setMonoState(dinoIdle)
      } else {
        setMonoState(dinoIdle)
      }
    }

    console.log("called Use Effect 1")
    getSaveData()
    handleMonoChange()
    handleMonoStateChange()
  },[])
  
  // Runs every time Mono's data is changed
  useEffect(()=>{

    // Stops code from running on initialized to avoid confliction
    if (!initialPageLoad){

      // Checks to see if Mono stats are below a certain threshold when monoData is changed
      const handleMonoChange = () => {

        if(monoData.health <= 25){
          setIsMonoSick(true)
        } else {
          setIsMonoSick(false)
        }

        if(monoData.happiness <= 25){
          setIsMonoAngry(true)
        } else {
          setIsMonoAngry(false)
        }

        if(monoData.hunger <= 25){
          setIsMonoHungry(true)
        } else {
          setIsMonoHungry(false)
        }
      }

      // Saves Mono data to database
      const saveMonoData = async() => {
        const saveRespone = await fetch(`https://capstone-project-1cyy.vercel.app/save/${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(monoData),
        });
        const saveData = await saveRespone.json();
        console.log(saveData);
      };



      // Changes Mono idle animation based off its state
      const handleMonoStateChange = () =>{ 

        if(isMonoSick){
          setMonoState(dinoSick)
        } else if (isMonoAngry){
          setMonoState(dinoAngry)
        } else if(isMonoHungry){
          setMonoState(dinoIdle)
        } else {
          setMonoState(dinoIdle)
        }
      }

      console.log("called Use Effect2")
      handleMonoChange()
      saveMonoData()
      handleMonoStateChange()
    } else {
      // After page initialization, changes variable to allow the conditional statement to run the code
      console.log("initial load")
      setInitalPageLoad(false)
    }
  },[monoData])

  const handleActivityClick = (e) =>{
    if (isActivityActive === false){
      // Makes sure animations can't overlap
      // When the timer ends, sets animation back to idle
      setIsActivityActive(true)
      setMonoState(e)
      var sec = 3;
      var timer = setInterval(function(){
        sec--;
        if (sec < 0) {
          clearInterval(timer);
          setIsActivityActive(false)

          // Gives Mono exp and changes stats based off of activity if the corresponding data is less than 100
          if (e == dinoEating && monoData.hunger < 100){
            setMonoData({...monoData, exp: monoData.exp + 25, hunger: monoData.hunger + 25})
          }
          if (e == dinoPill && monoData.health < 100){
            setMonoData({...monoData, health: monoData.health + 30, exp: monoData.exp + 10})
          }

          if (e == dinoPlay && monoData.happiness < 100){
            setMonoData((previousData) =>({...previousData, happiness: previousData.happiness + 25, exp: previousData.exp + 15}))
          }
          console.log(monoData)

          // Checks for the state of Mono and displays corresponding animation
          if(isMonoSick){
            setMonoState(dinoSick)
          } else if (isMonoAngry){
            setMonoState(dinoAngry)
          } else {
            setMonoState(dinoIdle)
          }
        }
      }, 1000);
    }
  }
  //Adds animation and Eating sfx on burger click
  const [eatsfx] = useSound('/music/Eating.mp3')
  // const handleEatingSound = () => {
  //   handleClick("/gifs/Dino_Eating.gif");
  //   eatsfx();
  // };
  //Adds animation and playing sfx on ball click
  const [playsfx] = useSound('/music/BallBouncesfx.mp3')
  // const handlePlayingSound = () => {
  //   handleClick("/gifs/Dino_Play.gif");
  //   playsfx();
  // };

  // Re routes for game options 
  let nav = useNavigate()
  const reRouteMainMenu = () => {
    nav("/Home")
  }
  const reRouteCredits = () => {
    nav("/AboutUs")
  }
  const reRouteTutorial = () => {
    nav("/Tutorial")
  }
  

  return (
  
    <div>
       <div>
      <div className="wDetails">
        {weatherData[0].icon && (
          <img
            src={weatherData[0].icon}
            alt="Weather Icon"
            className="weather-icon"
          />
        )}
        {weatherData[0].condition && (
          <p>Weather Condition: {weatherData[0].condition}</p>
        )}
        {!(weatherData[0].icon && weatherData[0].condition) && (
           <Link to="/Weather" className='links-for-reRoutes'>
           <p>Click Here to Enter Weather Data</p>
         </Link>
        )}
      </div>
    </div>

{/* GAME LOGIC BELOW */}
      <div className="GameBody">
        <div>{monoExp}</div>
          <div className='game-options'>
          <h3 onClick={reRouteMainMenu}>Main Menu</h3>
          <h3 onClick={reRouteCredits}>Credits</h3>
          <h3 onClick={reRouteTutorial}>Tutorial</h3>
          </div>
        <div className="Pet" id="Pet">
          <img src={monoState} style= {{ height: 500 }}  />
        </div>
        <div className="MoodBox">
          {isMonoAngry ? <img src={"/images/MoodAngry.png"} style= {{ height: 100 }} /> : null}
            {isMonoHungry ? <img src={"/images/MoodDiscomfort.png"} style= {{ height: 100 }} /> : null}
              {isMonoSick ? <img src={"/images/MoodSick.png"} style= {{ height: 100 }} /> : null}
              </div>
              <div className="ActivityBox">
                {/* <img src={"/images/FightIcon.png"} style= {{ height: 100 }} /> */}
                <img onClick={() =>{handleActivityClick(dinoEating)}}  src={"/images/FoodIcon.png"}  style={{ height: 100 }}  />
                    <img onClick={() =>{handleActivityClick(dinoPill)}} src={"/images/MedicineIcon.png"} style= {{ height: 100 }} />
                    <img onClick={() =>{handleActivityClick(dinoWash)}} src={"/images/BathIcon.png"} style= {{ height: 100 }} />
                        <img onClick={() =>{ handleActivityClick(dinoPlay)}} src={"/images/PlayIcon.png"} style= {{ height: 100 }} />
                        </div>
                        {/* <Timer /> */}
                        <img src={isPoopActive ? "/images/Poop.png" : null} id="Poop" style= {{ height: 100 }} />
                        </div>
                        <Music1/>                 
                      </div>
                      )
}
                      export default MainGame
