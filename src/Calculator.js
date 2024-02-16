import { useState } from "react";

//Calculation logical functions here

function calculate(operator1, operator2, operation) {
    let result;
    if (operation === '+') {
        result = operator1 + operator2;
    } else if (operation === '-') {
        result = operator1 - operator2;
    } else if (operation === 'x') {
        result = operator1 * operator2;
    } else if (operation === '/') {
        result = operator1 / operator2;
    }
    return result;
}



//React components for calculator here

function Screen({calculation}) {
    return (
        <div className="screen">
            <OperationSign value={calculation.operation}/>
            <p className="screen-display">{calculation.finalCalc ? calculation.result : calculation.number}</p>
        </div>
    );
}

const OperationSign = ({value}) => {
    return (
        <p className="operation-sign">{value ? value : ""}</p>
    );
};

function Button({buttonType, value, onDigitBtnClick, onClearBtnClick, onEnterBtnClick}) {
    let button;
    if (buttonType === "clrBtn") {
        button = <button className={"button " + buttonType} onClick={onClearBtnClick}>{value}</button>
    } else if (buttonType === "calculateBtn") {
        button = <button className={"button " + buttonType} onClick={onEnterBtnClick}>{value}</button>
    } else {
        button = <button className="button" onClick={onDigitBtnClick}>{value}</button>
    }
    return button;
}

function Calculator() {
    const [calculation, setCalc] = useState({
        sign: "",
        number: 0,
        result: 0,
        operation: undefined,
        finalCalc: false,
    });

    function handleDigitBtnClick(digit) {
        if (calculation.finalCalc) {
            calculation.finalCalc = false;
        }
        if (calculation.number === 0) {
            setCalc({
                ...calculation,
                number: "" + digit,
            });
        } else {
            setCalc({
                ...calculation,
                number: "" + calculation.number + digit,
            });
        }
        
    }

    function handleOperationBtnClick(operation) {
        if (calculation.finalCalc) {
            setCalc({
                ...calculation,
                operation: operation,
                number: 0,
                finalCalc: false,
            });
        } else {
            setCalc({
                ...calculation,
                operation: operation,
                result: calculation.number,
                number: 0,
            });
        }
        
    }

    function handleEnterBtnClick() {
        setCalc({
            ...calculation,
            finalCalc: true,
            result: parseFloat(calculate(+(calculation.result), +(calculation.number), calculation.operation)),
            number: 0,
            operation: undefined,
        });
    }

    function handleClearBtnClick() {
        setCalc({
            sign: "",
            number: 0,
            result: 0,
            operation: undefined,
            finalCalc: false,
        });
    }

    return (
        <div className="calculator-body">
            <Screen calculation={calculation} />
            <div className="digit-board">
                <div className="board-row">
                    <Button value={7} onDigitBtnClick={() => handleDigitBtnClick(7)} />
                    <Button value={8} onDigitBtnClick={() => handleDigitBtnClick(8)} />
                    <Button value={9} onDigitBtnClick={() => handleDigitBtnClick(9)} />
                    <Button value={'\u00F7'} onDigitBtnClick={() => handleOperationBtnClick('/')} />
                </div>
                <div className="board-row">
                    <Button value={4} onDigitBtnClick={() => handleDigitBtnClick(4)} />
                    <Button value={5} onDigitBtnClick={() => handleDigitBtnClick(5)} />
                    <Button value={6} onDigitBtnClick={() => handleDigitBtnClick(6)} />
                    <Button value={'x'} onDigitBtnClick={() => handleOperationBtnClick('x')} />
                </div>
                <div className="board-row">
                    <Button value={1} onDigitBtnClick={() => handleDigitBtnClick(1)} />
                    <Button value={2} onDigitBtnClick={() => handleDigitBtnClick(2)} />
                    <Button value={3} onDigitBtnClick={() => handleDigitBtnClick(3)} />
                    <Button value={'-'} onDigitBtnClick={() => handleOperationBtnClick('-')} />
                </div>
                <div className="board-row">
                    <Button value={0} onDigitBtnClick={() => handleDigitBtnClick(0)} />
                    <Button value={'.'} onDigitBtnClick={() => handleDigitBtnClick('.')} />
                    <Button value={'neg'} onDigitBtnClick={() => handleDigitBtnClick('-')} />
                    <Button value={'+'} onDigitBtnClick={() => handleOperationBtnClick('+')} />
                </div>
                <div className="board-row">
                    <Button buttonType="clrBtn" value={'CLR'} onClearBtnClick={() => handleClearBtnClick()} />
                    <Button buttonType="calculateBtn" value={'='} onEnterBtnClick={() => handleEnterBtnClick()} />
                    <Button value={'\u2190'} />
                    <Button value={'\u2192'} />
                </div>
            </div>
        </div>
    );
}

export default Calculator;