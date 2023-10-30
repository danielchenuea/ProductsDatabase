import React, { Children, ReactElement, ReactNode } from "react"
import "../styles/components/TabGroup.css"
// import Tabs, { TabsInterface } from './Tabs';

interface TabGroupInterface{
    children: ReactElement<TabsInterface>[]
}
export interface TabsInterface{
    children: ReactNode
    __TYPE: string
}

const TabGroup : React.FC<TabGroupInterface> = ({children}) => {
    // let [productList, setProductList] = useState<Produto[]>([]);

    return (
        <div className="TabGroupSpacer">
            <div className="TabsNavBar">
                {console.log(children)}
            </div>
            {
                Children.map(children, (child) => {
                    console.log(child)
                    return child.props.children;
                })
            }
        </div>
    )
}

export default TabGroup;