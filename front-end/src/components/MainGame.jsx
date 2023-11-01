import React from 'react'
import Kaiju1 from "../images/DinoStill.GIF";
import MoodAngry from "../images/MoodAngry.PNG";
import MoodHungry from "../images/MoodDiscomfort.PNG";
import MoodSick from "../images/MoodSick.PNG";
import ActFight from "../images/FightIcon.PNG";
import ActFood from "../images/FoodIcon.PNG";
import ActMedicine from "../images/MedicineIcon.PNG";
import ActBath from "../images/BathIcon.PNG";
import ActPlay from "../images/PlayIcon.PNG";
import Poop from "../images/Poop.PNG";


const MainGame = () => {
  return (
    <div>

      <div className="GameBody">

        <div className="Pet" id="Pet">
          <img src={Kaiju1} style="width: 500px;" />
        </div>

        <div className="MoodBox">
          <img src={MoodAngry} style="height: 150px;" />
            <img src={MoodHungry} style="height: 150px;" />
              <img src={MoodSick} style="height: 150px;" />
              </div>

              <div className="ActivityBox">
                <img src={ActFight} style="height: 150px;" />
                  <img src={ActFood} style="height: 150px;" onclick="Food()" />
                    <img src={ActMedicine} style="height: 150px;" />
                      <img src={ActBath} style="height: 150px;" />
                        <img src={ActPlay} style="height: 150px;" />
                        </div>

                        <img src={Poop} id="Poop" style="height: 175px;" />

                        </div>
                      </div>
                      )
}

                      export default MainGame