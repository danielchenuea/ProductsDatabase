import React, { useEffect, useState } from "react"
import ProductService from "../services/ProductService";
import { Produto } from "../models/produto.models";
import '../styles/pages/MainPage.css'
import HistoryProducts from "../components/MainPage/HistoryProducts";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../components/MainPage/ChartComponent";
import TabGroup, { Tabs } from "../components/TabGroup";
import Graph from "../components/MainPage/GraphComponent";


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
                        <Tabs tabName="Chart 1">
                            <ChartComponent />
                        </Tabs>
                        <Tabs tabName="Chart 2">
                            <Graph />
                        </Tabs>
                        <Tabs>Teste</Tabs>
                    </TabGroup>
                </div>
                <div className="divMainBase">
                    <HistoryProducts
                        productList={productList}
                        onClickBox={onClickProduct}
                    />
                </div>
                <div className="FooterSpacer">
                </div>
            </div>
        </div>
    )
}

export default MainPage;