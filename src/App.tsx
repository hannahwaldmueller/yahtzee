import React, {useState} from 'react';
import './App.css';
import {createDiceNumber, SetOfDice, updateDiceNumbers, updateRethrowSelection} from "./appFunctions";
import {ScoreSheet} from "./ScoreSheet";

export function App() {

    const [currentDiceNumbers, setCurrentDiceNumbers] = useState<SetOfDice>([createDiceNumber(),createDiceNumber(),createDiceNumber(),createDiceNumber(), createDiceNumber()]);
    const [diceMarkedForRethrow, setDiceForRethrow] = useState<number[]>([]);

    function toggleRethrowMarker(index: number) {
        setDiceForRethrow(updateRethrowSelection(diceMarkedForRethrow, index));
    }

    function rollSelectedDice(selectedDices: number[]) {
        setDiceForRethrow([]);
        setCurrentDiceNumbers(()=>updateDiceNumbers(selectedDices,currentDiceNumbers));
    }

    return (
        <div>
            <div>
                {currentDiceNumbers.map((numberOfDice, index)=>(
                    <button
                        onClick={() => toggleRethrowMarker(index)}
                        key={index}
                        className={diceMarkedForRethrow.includes(index)? "marked" :""}>
                        {numberOfDice}
                    </button>
                ))}
                <button onClick={() => rollSelectedDice(diceMarkedForRethrow)}>Roll selected dice</button>
            </div>
            {ScoreSheet(currentDiceNumbers)}
        </div>
  );
}

export default App;