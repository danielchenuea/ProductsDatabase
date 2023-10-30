import React, { useRef, useState } from "react";
import '../styles/pages/AddProduct.css';
import RadioSelect from "../components/AddPage/RadioSelect";
import QuantidadeSelect from "../components/AddPage/QuantidadeSelect";


const AddProductsPage: React.FC = () => {
    const typeOptions = ["Prioridade Baixa", "Normal", "Prioridade Alta"]

    const textName = useRef<HTMLInputElement>(null);
    const [selectedRadio, setRadio] = useState<string>("");
    const textDate = useRef<HTMLInputElement>(null);
    const textDescription = useRef<HTMLTextAreaElement>(null);
    const [produtosQt, setProdutosQt] = useState<number>(0);
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) : void => {
        event.preventDefault();
    }
    
    return (
        <div className="AddProductSpacer">
            <form className="addFormStyle" onSubmit={onSubmit}>
                <div className="divFormsBase">
                    <label htmlFor="nameInput" id="labelInput">Nome do Produto</label>
                    <input
                        id="nameInput"
                        placeholder="Escreva o nome do Produto"
                        ref={textName}
                        required
                    />
                </div>
                <div className="divFormsBase">
                    <label htmlFor="radioSelect" id="labelInput">Prioridade de Venda</label>
                    <RadioSelect
                        id="radioSelect"
                        options={typeOptions}
                        onRadioChange={setRadio}
                    />
                    {selectedRadio}
                </div>
                <div className="divFormsBase">
                    <label htmlFor="dateInput" id="labelInput">Data de Entrada</label>
                    <input 
                        id="dateInput" 
                        max={new Date(Date.now()).toISOString().slice(0, 10)}
                        type="date"
                        ref={textDate}
                        required
                    ></input>
                </div>
                <div className="divFormsBase">
                    <label htmlFor="descriptionInput" id="labelInput">Descrição</label>
                    <textarea
                        id="descriptionInput"
                        placeholder="Descreva brevemente o produto"
                        rows={6}
                        ref={textDescription}
                        maxLength={1000}
                    />
                </div>
                <div className="divFormsBase">
                    <label htmlFor="quantidadeInput" id="labelInput">Quantidade de Produtos</label>
                    <QuantidadeSelect
                        setState={setProdutosQt}
                        getState={produtosQt}
                        min={0}
                        id="quantidadeInput"
                        required={true}
                    />
                </div>
                <div className="divFormsBase submitDiv">
                    <button type="submit" className="submitForm">
                        ENVIAR
                    </button>
                </div>
                <div className="divFormsBase SpacerEnd"></div>
            </form>
            {/* <NewTodo onAddTodo={todoAddHandler} />
            <TodoList items={itemList} onDeleteTodo={todoDeleteHandler}></TodoList> */}
        </div>
    );
}

export default AddProductsPage;