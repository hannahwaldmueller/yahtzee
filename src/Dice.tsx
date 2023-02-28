import {useState} from "react";

export function Dice() {

    const [selected, toggleSelected] = useState(false);

    const [numberOfDice] = useState(Math.floor(Math.random() * 6 +1))

    let className = '';
    if (selected) { className = 'marked';}

    return (
        <button className={className}
                onClick={() => toggleSelected(selected === true ? false : true)}>
                {numberOfDice}
        </button>
    );

}