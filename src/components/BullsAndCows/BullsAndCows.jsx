import React, {useState} from "react";
import cn from 'classnames';
import {Field, reduxForm} from "redux-form";
import s from './BullsAndCows.module.css';
import {reset} from 'redux-form';
import {connect} from "react-redux";

let InputBullsCows = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.numberForm}>
      <Field name='myNumberForm' component='input' type='text' maxLength="4"/>
      <button className={cn(s.mainButton)}>Отправить</button>
    </form>
  )
};

InputBullsCows = reduxForm({
  form: 'InputTurn'
})(InputBullsCows);

const BullsAndCows = props => {

  let [guessedNumber, setGuessedNumber] = useState('');
  let [cows, setCows] = useState(0);
  let [bulls, setBulls] = useState(0);
  let [attempt, setAttempt] = useState(0);
  let [attemptInfo, setAttemptInfo] = useState([]);
  let [myNumber, setMyNumber] = useState('');
  let [victory, setVictory] = useState(false);
  let [runGame, setRunGame] = useState(false);

  const startGame = () => {

    setCows(0);
    setBulls(0);
    setAttempt(0);
    setAttemptInfo([]);
    setRunGame(true);
    setMyNumber('');
    setVictory(false);

    let arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let guessedNumber = [];

    while (guessedNumber.length < 4) {
      let randomIndex = Math.floor(Math.random() * arrNumbers.length);
      guessedNumber.push(arrNumbers.splice(randomIndex, 1));
    }

    setGuessedNumber(guessedNumber.join(''));
  };

  const myTurn = values => {

    setCows(0);
    setBulls(0);

    let cows = 0;
    let bulls = 0;

    let myNumber = values.myNumberForm;

    if (myNumber === undefined || myNumber.length !== 4) {
      setMyNumber('Введите 4 неповторяющиеся цифры');
      return
    }

    for (let i = 0; i < 4; i++) {
      if (myNumber[i] === guessedNumber[i]) {
        bulls++
      } else if (guessedNumber.includes(myNumber[i])) {
        cows++
      }
    }

    setMyNumber(myNumber);
    setCows(cows);
    setBulls(bulls);
    setAttempt(attempt + 1);

    let attemptTemp = attemptInfo;
    attemptTemp.push({myNumber, cows, bulls, attempt});
    setAttemptInfo(attemptTemp);

    if (bulls === 4) {
      setVictory(true);
      setRunGame(false);
    }

    props.reset('InputTurn')
  };

  return <div className={cn('white-container')}>
    {runGame
      ? <Game myNumber={myNumber}
              bulls={bulls}
              cows={cows}
              attempt={attempt}
              victory={victory}
              myTurn={myTurn}
              attemptInfo={attemptInfo}
              guessedNumber={guessedNumber}
      />

      : <PreloadGame startGame={startGame}
                     victory={victory}
                     guessedNumber={guessedNumber}
                     attempt={attempt}
      />
    }
  </div>
};

const PreloadGame = props => {
  return <>
    {props.victory
      ? <div className={cn(s.victory)}>
        <h2>Победа с <span>{props.attempt}</span> попытки</h2>
        <h3>
          Загаданное число: <span>{props.guessedNumber}</span>
        </h3>
      </div>
      : <div className={cn(s.gameRules)}>
        <h3>Правила игры:</h3>
        <br/>
        <p>
          Компьютер задумывает четыре различные цифры из <span>0,1,2,...9</span>.<br/>Игрок делает ходы, чтобы узнать
          эти цифры и их порядок.
          <br/><br/>
          Каждый ход состоит из четырёх цифр, 0 может стоять на первом месте.
          <br/><br/>
          В ответ компьютер показывает число отгаданных цифр, стоящих на своих местах (число быков) и число отгаданных
          цифр, стоящих не на своих местах (число коров).
        </p>
        <br/>
        <h3>
          Пример:
        </h3>
        <br/>
        <p>
          Компьютер задумал: <span>0834</span>
          <br/><br/>
          Игрок сделал ход <span>8134</span>
          <br/><br/>
          Компьютер ответил: <span>2 быка</span> (цифры 3 и 4) и <span>1 корова</span> (цифра 8).
        </p>
        <br/>
      </div>}
    <button onClick={props.startGame}
            className={cn(s.mainButton)}>{props.victory ? `Новая игра` : `Начать игру`}</button>
  </>
};

const Game = props => {
  return (
    <div className={cn(s.game)}>
      <h2>
        Введите число
      </h2>
      <InputBullsCows onSubmit={props.myTurn}/>

      <br/>

      <div className={cn(s.currentResult)}>
        <div>
          <img src="https://metaschool.ru/pub/games/bulls-and-cows/img/bull-2.png" alt="" className={cn(s.bull)}/>
          <p>
            {props.bulls}
          </p>
        </div>
        <div>
          <img src="https://metaschool.ru/pub/games/bulls-and-cows/img/cow-2-85.png" alt=""/>
          <p>
            {props.cows}
          </p>
        </div>
      </div>
      <div className={cn(s.attempts)}>
        {props.attemptInfo.map(a => <div key={a.attempt} className={cn(s.attempt)}>
          <p>Число: <span>{a.myNumber}</span> - Быки: <span>{a.bulls}</span> Коровы: <span>{a.cows}</span></p>
        </div>)}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {reset})(BullsAndCows);




