import React, { useState } from 'react';
import './Wrapper.css'
import Screen from './Screen.js'
import ButtonBox from './ButtonBox.js'

const Wrapper = () => {
    let [screenVal, setScreenVal] = useState(0);
    let [operator, setOperator] = useState("");
    let [operand, setOperand] = useState(0);
    let [resultShowing, setResultShowing] = useState(true);


    //TODO: PERCENT, DECIMAL, AND DECIMAL THAT GOES ON FOREVER
    const updateOperand = () => {
        let newOperand = operand;
        switch (operator) {
            case "+":
                newOperand = operand + screenVal;
                break;
            case "-":
                newOperand = operand - screenVal;
                break;
            case "/":
                newOperand = operand / screenVal;
                break;
            case "X":
                newOperand = operand * screenVal;
                break;
            default:
        }
        return newOperand;
    }

    const resetClickHandler = () => {
        console.log("\tCalculator reset");
        setScreenVal(0);
        setOperand(0);
        setOperator("");
        setResultShowing(true);
    };

    const invertClickHandler = () => {
        console.log("\tnumber inverted");
        setScreenVal(screenVal * -1);
    };

    const percentClickHandler = () => {
        console.log("\tconverting to percent");
        setScreenVal(screenVal / 100);

    };

    const equalClickHandler = () => {
        console.log("\tCalculating " + operand + " " + operator + " " + screenVal);

        if (!resultShowing) {
            let displayVal = operator === "" ? screenVal : updateOperand();
            setScreenVal(displayVal);
            setResultShowing(true);
        }
        setOperator("");
        setOperand(0);
    };

    const decClickHandler = () => {
        console.log("\tMaking number a decimal");
        let screenValStr = screenVal.toString() + ".0";
        setScreenVal(Number(screenValStr));

    };

    const operClickHandler = (oper) => {
        console.log("\tHandling " + oper + " operator");

        if (!resultShowing) {
            let displayVal = operator === "" ? 0 : updateOperand();
            setScreenVal(displayVal);
            setResultShowing(true);
            setOperator(oper);

            if (operand === 0) {
                setOperand(screenVal);
            } else {
                setOperand(displayVal);
            }
        }
    };

    const numClickHandler = (num) => {
        console.log("\t" + num + " clicked")
        let screenValStr = screenVal.toString();
        if (resultShowing) {
            console.log("\tstarting new number");
            //setting first num
            setScreenVal(Number(num));
            setResultShowing(false);
        } else {
            //appending num
            setScreenVal(Number(screenValStr + num));
            console.log("\tadding to num");
        }
    };

    const onButtonClick = (element) => {
        console.log("Handling click");

        switch (element) {
            case "C":
                resetClickHandler();
                break;
            case "+-":
                invertClickHandler();
                break;
            case "%":
                percentClickHandler();
                break;
            case "=":
                equalClickHandler();
                break;
            case ".":
                decClickHandler();
                break;
            case "+":
            case "-":
            case "X":
            case "/":
                operClickHandler(element);
                break;
            default:
                numClickHandler(element);
        }

        console.log("Click finished!");
    };

    return (
        <div className="wrapper bg-dark-gray pa3 tc">
            <Screen value={screenVal} />
            <ButtonBox handleClick={onButtonClick} />
        </div>
    );

};

export default Wrapper;