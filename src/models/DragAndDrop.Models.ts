import React from "react";

export interface DragAndDrop {
    dragOver?: (event: React.DragEvent) => void;
    dragEnter?: (event: React.DragEvent) => void;
    dragLeave?: (event: React.DragEvent) => void;
    dropItem?: (event: React.DragEvent) => void;
}
