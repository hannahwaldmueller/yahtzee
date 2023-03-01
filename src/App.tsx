import React, {JSXElementConstructor, useState} from 'react';
import './App.css';

function App() {

    const [currentDiceNumbers, setCurrentDiceNumbers] = useState([createDiceNumber(),createDiceNumber(),createDiceNumber(),createDiceNumber(), createDiceNumber()]);
    const [dicesMarkedForRethrow, setDicesForRethrow] = useState<number[]>([]);

    function markForRethrow(index: number) {
        if (dicesMarkedForRethrow.includes(index)) {
            setDicesForRethrow(
                dicesMarkedForRethrow.filter(item => item !== index));
        } else {
            setDicesForRethrow(
                dicesMarkedForRethrow => [...dicesMarkedForRethrow, index]);
        }
    }

    function createDiceNumber() {
        return Math.floor(Math.random() * 6 + 1);
    }

    function rollSelectedDices(selectedDices: number[]) {
        const newDiceNumbers: number[] =
        currentDiceNumbers.map((diceNumber, index) =>(
            (selectedDices.includes(index))? createDiceNumber(): diceNumber
            )
        )
        setDicesForRethrow([]);
        setCurrentDiceNumbers(newDiceNumbers);
    }

    return (
        <div>
            {currentDiceNumbers.map((numberOfDice, index)=>(
                <button
                    onClick={() => markForRethrow(index)}
                    key={index}>
                    {numberOfDice}
                </button>
            ))}
            <button onClick={() => rollSelectedDices(dicesMarkedForRethrow)}>Roll selected dices</button>
        </div>
  );
}

export default App;