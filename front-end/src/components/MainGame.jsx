import React from 'react'

const MainGame = () => {
  return (
    <div>
      <div className="GameBody">
        <div className="Pet" id="Pet">
          <img src={"/gifs/DinoStill.gif"} style= {{ height: 350 }} /> 
        </div>
        <div className="MoodBox">
          <img src={"/images/MoodAngry.png"} style= {{ height: 100 }} />
            <img src={"/images/MoodDiscomfort.png"} style= {{ height: 100 }} />
              <img src={"/images/MoodSick.png"} style= {{ height: 100 }} />
              </div>
              <div className="ActivityBox">
                <img src={"/images/FightIcon.png"} style= {{ height: 100 }} />
                  <img src={"/images/FoodIcon.png"} style= {{ height: 100 }} />
                    <img src={"/images/MedicineIcon.png"} style= {{ height: 100 }} />
                      <img src={"/images/BathIcon.png"} style= {{ height: 100 }} />
                        <img src={"/images/PlayIcon.png"} style= {{ height: 100 }} />
                        </div>

                        <img src={"/images/Poop.png"} id="Poop" style= {{ height: 100 }} />

                        </div>
                      </div>
                      )
}
                      export default MainGame