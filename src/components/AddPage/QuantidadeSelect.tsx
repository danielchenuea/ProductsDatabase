import React from "react";
import "../../styles/components/AddPage/QuantidadeSelect.css"

type QuantidadeProps = {
    id?: string;
    style?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    max?: number;
    min?: number;
    required?: boolean;
    getState: number;
    setState: (a: number) => void;
}

const QuantidadeSelect : React.FC<QuantidadeProps> = (props) => {

    const numberChangerHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.value === "") changeInput(0)
        else changeInput(parseInt(event.currentTarget.value))
    }
    function changeInput(num: number) : void {
        if(props.setState !== undefined){
            props.setState(num);
        }
    }

    function inputChanger(num: number) : void{
        if(props.min !== undefined){
            if(props.getState + num < props.min) return changeInput(props.min);
        }
        if(props.max !== undefined){
            if(props.getState + num > props.max) return changeInput(props.max);;
        }

        changeInput(props.getState + num);
    }

    return (
        <div className="QuantidadeSelectSpacer" id={props.id} style={props.style ?? {}}>
            <div className="qtButtons" onClick={() => inputChanger(-10)} id="minus10" style={props.buttonStyle ?? {}}>-10</div>
            <div className="qtButtons" onClick={() => inputChanger(-1)} id="minus1" style={props.buttonStyle ?? {}}>-1</div>
            <input 
                type="number" 
                id="inputNumber" 
                onChange={numberChangerHandler} 
                value={props.getState}
                placeholder={"0"}
                required={props.required}
                style={props.inputStyle ?? {}}
            ></input>
            <div className="qtButtons" onClick={() => inputChanger(+1)} id="plus1" style={props.buttonStyle ?? {}}>+1</div>
            <div className="qtButtons" onClick={() => inputChanger(+10)} id="plus10" style={props.buttonStyle ?? {}}>+10</div>
        </div>
    )
}

export default QuantidadeSelect;