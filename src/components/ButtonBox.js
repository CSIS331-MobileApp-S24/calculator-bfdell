import React from 'react';
import './ButtonBox.css'
import Button from './Button.js';
const ButtonBox = () => {

    let btnValues = [];
    btnValues.push(["C", "+-", "%", "/"]);
    btnValues.push(["7", "8", "9", "X"]);
    btnValues.push(["4", "5", "6", "-"]);
    btnValues.push(["1", "2", "3", "+"]);
    btnValues.push(["0", ".", "="]);


    return (
        <div className="buttonBox">
            {btnValues.flat().map((element, index) => {
                let btnClr = "dark-blue";
                let style = "";
                if (index == btnValues.flat().length - 1) {
                    btnClr = "red"
                    style = "equalsButton"
                }
                return <Button
                    key={index}
                    className={`white ba br3 bg-${btnClr} b--${btnClr} ${style}`}
                    value={element}
                    onClick={() => { console.log(`${element} Button Clicked`) }}
                />

            })}

        </div>
    );
};

export default ButtonBox;