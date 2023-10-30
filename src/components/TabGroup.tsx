import React, { Children, ReactElement, ReactNode, useState } from "react"
import "../styles/components/TabGroup.css"
// import Tabs, { TabsInterface } from './Tabs';

interface TabGroupInterface{
    children: ReactElement<TabsInterface>[]
    tabHeaderStyle?: React.CSSProperties
    tabContentStyle?: React.CSSProperties
}
interface TabsInterface {
    children: ReactNode
    tabName?: string
    __TYPE?: string
}

const TabGroup : React.FC<TabGroupInterface> = (props) => {
    let [tab, setTab] = useState<string>("0");

    function ChangeTabHandler(event: React.MouseEvent) : void {
        setTab(event.currentTarget.id)
    }

    function TabsGenerator(): ReactElement[]{
        const result : ReactElement[] = [];
        Children.forEach(props.children, (child, index) => {
            result.push(
                <div 
                    key={index.toString()}
                    className={"TabSelector " + (tab === index.toString() ? "active" : "")}
                    id={index.toString()}
                    onClick={ChangeTabHandler}
                    style={props.tabHeaderStyle ?? undefined}
                >
                    {child.props.tabName ?? index}
                </div>
            );
        })
        return result;
    }
    function ContentTabsGenerator(): ReactElement[]{
        const result : ReactElement[] = [];
        Children.forEach(props.children, (child, index) => {
            result.push(
                tab === index.toString() ?
                <div 
                    key={index.toString()}
                    className="TabContent"
                    id={index.toString()}
                    style={props.tabContentStyle ?? undefined}
                >
                    {child.props.children}
                </div> 
                : 
                <div key={index.toString()}></div>
            );
        })
        return result;
    }

    return (
        <div className="TabGroupSpacer">
            <div className="TabsNavBar">
                {
                    TabsGenerator()
                }
            </div>
            <div className="TabGroupContent">
                {
                    ContentTabsGenerator()
                }
            </div>
        </div>
    )
}

export default TabGroup;

export const Tabs = ({ children }: TabsInterface) => (
    <>
        {children}
    </>
);