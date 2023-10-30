import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ProductService from "../services/ProductService";
import { Produto } from "../models/produto.models";
import ProductInfo from "../components/SingularPage/ProductInfo";
import '../styles/pages/SingularPage.css'
import QuantidadeSelect from "../components/AddPage/QuantidadeSelect";


const SingularProduct : React.FC = () => {
    const [product, setProduct] = useState<Produto>();
    const [produtosQt, setProdutosQt] = useState<number>(0);

    let { productId } = useParams();

    useEffect(() => {
        const prodServ = new ProductService();
        prodServ.GetProduto(productId!).then((res : Produto) : void => {
            if(res) {
                setProduct(res);
                setProdutosQt(res.quantity)
            }
        });
    },[productId])

    return (
        <div className="SingularPageSpacer">
            <div className="SingularPageOrganizer">
                <ProductInfo product={product!}></ProductInfo>
                <QuantidadeSelect
                    getState={produtosQt}
                    setState={setProdutosQt}
                    min={0}
                    id="quantidadeInput"
                    style={{"backgroundColor": "#f6f6f6", "border": "2px #a3a3a3aa solid"}}
                />
                <button className="SaveButton">
                    SALVAR
                </button>
            </div>
        </div>
    )
}

export default SingularProduct;