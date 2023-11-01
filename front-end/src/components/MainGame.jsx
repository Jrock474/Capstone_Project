import React from 'react'
import Kaiju1 from "../images/DinoStill.gif";
import MoodAngry from "../images/MoodAngry.png";
import MoodHungry from "../images/MoodDiscomfort.png";
import MoodSick from "../images/MoodSick.png";
import ActFight from "../images/FightIcon.png";
import ActFood from "../images/FoodIcon.png";
import ActMedicine from "../images/MedicineIcon.png";
import ActBath from "../images/BathIcon.png";
import ActPlay from "../images/PlayIcon.png";
import Poop from "../images/Poop.png";




const MainGame = () => {
  return (
    <div>

      <div className="GameBody">

        <div className="Pet" id="Pet">
          <img src={Kaiju1} style= {{ height: 350 }} /> 
        </div>

        <div className="MoodBox">
          <img src={MoodAngry} style= {{ height: 100 }} />
            <img src={MoodHungry} style= {{ height: 100 }} />
              <img src={MoodSick} style= {{ height: 100 }} />
              </div>

              <div className="ActivityBox">
                <img src={ActFight} style= {{ height: 100 }} />
                  <img src={ActFood} style= {{ height: 100 }} />
                    <img src={ActMedicine} style= {{ height: 100 }} />
                      <img src={ActBath} style= {{ height: 100 }} />
                        <img src={ActPlay} style= {{ height: 100 }} />
                        </div>

                        <img src={Poop} id="Poop" style= {{ height: 100 }} />

                        </div>
                      </div>
                      )
}

                      export default MainGame