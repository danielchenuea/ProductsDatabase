import React, { useEffect, useState } from "react"
import ProductService from "../services/ProductService";
import { Produto } from "../models/produto.models";
import '../styles/pages/MainPage.css'
import HistoryProducts from "../components/MainPage/HistoryProducts";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../components/MainPage/ChartComponent";
import TabGroup from "../components/TabGroup";
import { Tabs } from "@mui/material";


const MainPage : React.FC = () => {
    let [productList, setProductList] = useState<Produto[]>([]);

    const navigate = useNavigate();
    function onClickProduct(id: string){
        navigate(`/list/${id}`);
    }

    useEffect(() => {
        const prodServ = new ProductService();
        prodServ.GetListaProdutos().then((res) => {
            if(res) setProductList(res);
        });
    },[])

    return (
        <div className="MainPageSpacer">
            <div className="mainStack">
                <div className="divMainBase">
                    <TabGroup>
                        <Tabs>
                            <ChartComponent />
                        </Tabs>
                        <Tabs>456</Tabs>
                        <Tabs>789</Tabs>
                    </TabGroup>
                </div>
                {/* <div className="divMainBase divMainSelect">
                    <ChartComponent />
                </div> */}
                {/* <div className="divMainBase divMainSelect">Item 2</div> */}
                <div className="divMainBase">
                    <HistoryProducts
                        productList={productList}
                        // transitionTimer={1000}
                        onClickBox={onClickProduct}
                    />
                </div>
            </div>
        </div>
    )
}

export default MainPage;