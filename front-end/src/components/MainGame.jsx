import React from 'react'
// import Kaiju1 from "../images/DinoStill.gif";
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
          {/* <img src={Kaiju1} style="width: 500px;" /> */}
        </div>

        <div className="MoodBox">
          <img src={MoodAngry} style="height: 150px;" />
            <img src={MoodHungry} style="height: 150px;" />
              <img src={MoodSick} style="height: 150px;" />
              </div>

              <div className="ActivityBox">
                <img src={ActFight} style="height: 150px;" />
                  <img src={ActFood} style="height: 150px;" />
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