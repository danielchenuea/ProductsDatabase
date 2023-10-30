import React from "react"
import '../styles/components/ListProducts.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/components/TrashCan.css"
import { DragAndDrop } from "../models/DragAndDrop.Models";
import { TrashCanDragDrop } from "../models/TrashCan.model";

const TrashCan : React.FC<DragAndDrop&TrashCanDragDrop> = (props) => {
    return (
        <div 
            className={"deleteArea"}
            id={props.classHoverDrag}
            onDragOver={props.dragOver} 
            onDragEnter={props.dragEnter} 
            onDragLeave={props.dragLeave} 
            onDrop={props.dropItem}
            style={{
                opacity: !props.isOpen ? "0" : "1",
                visibility: !props.isOpen ? "hidden" : "visible",
            }}
        >
            <FontAwesomeIcon icon={faTrash} className="trashIcon" />
        </div>
    )
}

export default TrashCan;