import React from 'react';
import './Wrapper.css'
import Screen from './Screen.js'
import ButtonBox from './ButtonBox.js'

class Wrapper extends React.Component {
    operator = "";
    operand = 0;
    resultShowing = true;
    decimalStart = false;
    constructor() {
        super();
        this.state = { screenVal: 0 };
    }

    render() {
        const updateOperand = () => {
            let newOperand = this.operand;
            switch (this.operator) {
                case "+":
                    newOperand = this.operand + this.state.screenVal;
                    break;
                case "-":
                    newOperand = this.operand - this.state.screenVal;
                    break;
                case "/":
                    newOperand = this.operand / this.state.screenVal;
                    break;
                case "X":
                    newOperand = this.operand * this.state.screenVal;
                    break;
                default:
            }
            return newOperand;
        }

        const resetClickHandler = () => {
            console.log("\tCalculator reset");
            this.setState({ screenVal: 0 });
            this.operand = 0;
            this.operator = "";
            this.resultShowing = true;
        };

        const invertClickHandler = () => {
            console.log("\tnumber inverted");
            this.setState({ screenVal: this.state.screenVal * -1 });
        };

        const percentClickHandler = () => {
            console.log("\tconverting to percent");
            this.setState({ screenVal: this.state.screenVal / 100 });

        };

        const equalClickHandler = () => {
            console.log("\tCalculating " + this.operand + " " + this.operator + " " + this.state.screenVal);

            if (!this.resultShowing) {
                let displayVal = this.operator === "" ? this.state.screenVal : updateOperand();
                this.setState({ screenVal: displayVal });
                this.resultShowing = true;
            }
            this.operator = "";
            this.operand = 0;
        };

        const decClickHandler = () => {
            console.log("\tMaking number a decimal if not decimal already");
            if (this.state.screenVal % 1 === 0) {
                let screenValStr = this.state.screenVal.toString() + ".0";
                this.decimalStart = true;
                this.setState({ screenVal: Number(screenValStr) });
            }
        };

        const operClickHandler = (oper) => {
            console.log("\tHandling " + oper + " operator");

            if (!this.resultShowing) {
                let displayVal = this.operator === "" ? 0 : updateOperand();
                this.setState({ screenVal: displayVal });
                this.resultShowing = true;
                this.operator = oper;

                if (this.operand === 0) {
                    this.operand = this.state.screenVal;
                } else {
                    this.operand = displayVal;
                }
            }
        };

        const numClickHandler = (num) => {
            console.log("\t" + num + " clicked")
            let screenValStr = this.state.screenVal.toString();
            console.log("current num:" + screenValStr);
            //directly after the decimal button is pressed
            if (this.decimalStart) {
                screenValStr += "."
                console.log(screenValStr + num);
                this.setState({ screenVal: Number(screenValStr + num) });
                console.log("\tadding to num");
                this.decimalStart = false;
                this.resultShowing = false;
            } else {
                if (this.resultShowing) {
                    //setting first num
                    console.log("\tstarting new number");
                    this.setState({ screenVal: Number(num) });
                    this.resultShowing = false;
                } else {
                    //appending num
                    console.log("\tappending to existing num");
                    this.setState({ screenVal: Number(screenValStr + num) });
                }
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
            <div className="wrapper bg-dark-gray pa3 tc" >
                <Screen value={this.decimalStart ? this.state.screenVal + "." : this.state.screenVal} />
                <ButtonBox handleClick={onButtonClick} />
            </div>
        );
    }
};

export default Wrapper;