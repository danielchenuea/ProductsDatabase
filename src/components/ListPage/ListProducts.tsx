import React, { useState, useRef } from "react"
import { Produto } from '../../models/produto.models';
import '../../styles/components/ListPage/ListProducts.css'
import TrashCan from "./TrashCan";
import { OutlinedInput } from "@mui/material";

interface PropsInsert{
    itemList: Produto[],
    ClickProduto: (id: number) => void;
    RemoveProduto: (id: number) => void;
    FilterProdutos?: (Filter?: (a: Produto) => boolean) => void;
    SortProdutos?: (Compare?: (a: Produto, b: Produto) => number) => void;
    setFilter: (a: string) => void;
    getFilter: string;
}

const ListProduct : React.FC<PropsInsert> = (props) => {
    const quantidadeStates = ["disabled", "desc", "asc"];
    const [orderDisplay, setOrderDisplay] = useState("-");
    const qtState = useRef(0);

    const handleQtClick = (event? : React.MouseEvent<HTMLElement>) : void => {
        qtState.current = (qtState.current + 1) % 3;

        switch (quantidadeStates[qtState.current]) {
            case "asc":
                setOrderDisplay("↑")
                props.SortProdutos!((a: Produto, b: Produto) => {
                    if(a.quantity < b.quantity) return -1;
                    return 1;
                });
                break;
                case "desc":
                setOrderDisplay("↓")
                props.SortProdutos!((a: Produto, b: Produto) => {
                    if(a.quantity > b.quantity) return -1;
                    return 1;
                });
                break;
            default:
                props.SortProdutos!();
                setOrderDisplay("-")
                props.FilterProdutos!((a: Produto) => {
                    return a.title.toLowerCase().includes(filterText.current)
                })
        }
    }

    var filterText = useRef("");

    const handlerFilterChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        filterText.current = event.currentTarget.value;
        props.setFilter(event.currentTarget.value);
        if(event.currentTarget.value.length === 0) {
            props.FilterProdutos!();
        }
        else{
            props.FilterProdutos!((a: Produto) => {
                return a.title.toLowerCase().includes(event.currentTarget.value)
            })
        }
    }


    const [onDragging, setDraggingState] = useState(false);
    const [onDragging2, setDraggingState2] = useState(false);
    const trashCanId = "trashCan";

    const dragStart = (event: React.DragEvent<HTMLLIElement>) => {
        showDelete()
        event.dataTransfer.setData("id", event.currentTarget.id);
    }
    const dragEnd = (event: React.DragEvent<HTMLLIElement>) => {
        hideDelete();
        hoverClassLeave();
    }
    const dragLeave = (event: React.DragEvent) => {
        hoverClassLeave();
    }
    const allowDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        hoverClassEnter();
    }
    const onDrop = (event: React.DragEvent) => {
        let idDrop = event.dataTransfer.getData("id");
        props.RemoveProduto(parseInt(idDrop));
        hoverClassLeave();
        hideDelete();
    }

    function showDelete() : void {
        setDraggingState(true);
        setTimeout(() => setDraggingState2(true), 80)
    }
    function hideDelete() : void {
        setDraggingState2(false);
        setTimeout(() => setDraggingState(false), 80)
    }

    const hoverClassEnter = () : void => {
        document.getElementById(trashCanId)?.children[0].classList.add("trashIconHover");
        document.getElementById(trashCanId)?.classList.add("deleteAreaHover");
    }
    const hoverClassLeave = () : void => {
        document.getElementById(trashCanId)?.children[0].classList.remove("trashIconHover");
        document.getElementById(trashCanId)?.classList.remove("deleteAreaHover");
    }
    

    return (
        <div className="listWrapper">
            <ul className="UlDisabled">
                <li className="listDisabled">
                    <div className="titleDisabled">
                        <p>Produto</p>
                        <OutlinedInput
                            id="inputFilter"
                            type='text'
                            onChange={handlerFilterChange}
                            value={props.getFilter}
                            placeholder="Filtro"
                        />
                    </div>
                    <div className="descriptionDisabled"><p>Descrição</p></div>
                    <div className="numDisabled" onClick={handleQtClick}>
                        <p>Quantidade</p>
                        <div>{orderDisplay}</div>
                    </div>
                    <div className="scrollFill"></div>
                </li>
            </ul>
            <ul className="listUl">
                {props.itemList.map(el =>
                    <li key={el.id} draggable={true} id={el.id.toString()} onDragStart={dragStart} onDragEnd={dragEnd} className="listItem" onClick={() => props.ClickProduto(el.id)}>
                        <div className="listTitle"><p>{el.title}</p></div>
                        <div className="listDescription"><p>{el.description}</p></div>
                        <div className="numDescription"><p>{el.quantity}</p></div>
                    </li>
                )}
            </ul>
            {
                onDragging ?
                    <TrashCan
                        classHoverDrag={trashCanId}
                        isOpen= { onDragging2 }
                        dragLeave={dragLeave}
                        dragOver={allowDragOver}
                        dropItem={onDrop} 
                    />
                : null
            }
        </div>
    )
}

export default ListProduct;