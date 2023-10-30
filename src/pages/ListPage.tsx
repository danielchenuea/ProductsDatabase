import React, { useState, useEffect } from "react";
import ListProduct from "../components/ListProducts";
import ProductService from "../services/ProductService";
import { Produto } from '../models/produto.models';
import '../styles/pages/ListPage.css'
import { useLocation, useNavigate } from "react-router-dom";

const ListPage: React.FC = (props) => {
    const [rawItemList, setRawItemList] = useState<Produto[]>([])
    const [itemList, setItemState] = useState<Produto[]>([]);

    const [filter, setFilter] = useState<string>("");

    const {state} = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
        let { search } = state;

        setItemState(
            rawItemList.filter((el) => el.title.toLowerCase().includes(search))
        )
        setFilter(search)
    }, [state, rawItemList])

    useEffect(() => {
        const prodServ = new ProductService();
        prodServ.GetListaProdutos().then((res) => {
            if(res) {
                setItemState(res);
                setRawItemList(res);
            }
        });
    },[])

    const RemoveHandler = (id: number) : void => {
        setItemState((prevState) => prevState.filter(el => el.id !== id));
    }

    const ClickRowHandler = (id: number) : void => {
        navigate(`${id}`);
    }

    const ReturnNormal = () : void => {
        setItemState(rawItemList);
    }

    const FilterHandler = (filterFunction? : (value: Produto) => boolean) : void => {
        if(filterFunction == null){
            ReturnNormal();
        }else{
            setItemState(
                rawItemList.filter(filterFunction)
            )
        }
    }
    const SortHandler = (compareFunction?: (a: Produto, b: Produto) => number) : void => {
        if(compareFunction == null){
            ReturnNormal();
        }
        setItemState((prevState) => {
            return [...prevState].sort(compareFunction)
        })
    }
    
    return (
        <div className="MainPageSpacer">
            <div className="ListSpacer">
                <ListProduct 
                    itemList={itemList} 
                    ClickProduto={ClickRowHandler}
                    RemoveProduto={RemoveHandler}
                    SortProdutos={SortHandler}
                    FilterProdutos={FilterHandler}
                    setFilter={setFilter}
                    getFilter={filter}
                ></ListProduct>
            </div>
        </div>
    );
}

export default ListPage;