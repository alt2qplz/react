import React from "react";
import s from './Games.module.css';

const Games = (props) => {
  return (
    <div className={`white-container`}>
      <h2>Тут будут игры:</h2>
      <br/>
      <p>1. БЫКИ и КОРОВЫ<br/><br/>
         2. КРЕСТИКИ-НОЛИКИ<br/><br/>
         3. BLACK JACK</p>
    </div>
  )
}

export default Games;