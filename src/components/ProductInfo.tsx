import React from "react"
import { Produto } from "../models/produto.models";
import '../styles/components/ListProducts.css'
import "../styles/components/ProductInfo.css"

interface PropsInsert{
    product: Produto;
}

const ProductInfo : React.FC<PropsInsert> = (props) => {

    return (
        <div className="productInfoDiv">
            <div className="productInfoGrid">
                <div className="grid8 productInfoItem topleft title">
                    {props.product ? props.product.title : ""}
                </div>
                <div className="grid2 productInfoItem topright">
                </div>
            </div>
            <div className="productInfoGrid">
                <div className="grid2 productInfoItem bottomleft">
                </div>
                <div className="grid8 productInfoItem bottomright description">
                    {props.product ? props.product.description : ""}
                </div>
            </div>
        </div>
    )
}

export default ProductInfo;