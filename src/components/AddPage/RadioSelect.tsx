import React, { useState } from "react";
import "../../styles/components/RadioSelect.css"

type NewTodoProps = {
    id?: string;
    options: string[];
    onRadioChange: (a: string) => void;
}

const RadioSelect : React.FC<NewTodoProps> = (props) => {
    // const textInput = useRef<HTMLInputElement>(null)
    const [selectedRadio, setRadio] = useState<string>("");

    const radioClickHandler = (event : React.MouseEvent<HTMLDivElement>) => {
        if(selectedRadio === event.currentTarget.id){
            changeRadio("");
        }else{
            changeRadio(event.currentTarget.id)
        }
    }

    function changeRadio(select: string) : void {
        props.onRadioChange(select);
        setRadio(select);
    }

    return (
        <div className="RadioSelectSpacer" id={props.id}>
            {
                props.options.map((el : string) =>
                    <div 
                        key={el}
                        id={el}
                        className={"RadioOptions " + (selectedRadio === el ? "RadioSelected" : "")}
                        onClick={radioClickHandler}
                    >{el}</div>
                )
            }
        </div>
    )
}

export default RadioSelect;