/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"
import { Produto } from "../../models/produto.models";
import '../../styles/components/MainPage/HistoryProducts.css'
import $ from 'jquery';

interface HistoryProductsInterface {
    productList: Produto[]
    quantity?: number
    productWidth?: number
    productHeight?: number
    productPadding?: number
    transitionTimer?: number
    onClickBox?: (id: string) => void;
}

const HistoryProducts : React.FC<HistoryProductsInterface> = (props) => {
    const [historyList, setHistory] = useState<Produto[]>([]);
    const [scrollLeftNumberArray, setScrollLeftNumberArray] = useState<number[]>([]);
    const refScrollProducts = useRef<HTMLDivElement>(null);
    
    const defaultNumberBoxShown = 5;
    const boxStep = 10;

    const [sliderValue, setSliderValue] = useState<number>(0); 

    const defaultWidth = 220;
    const defaultHeight = 160;
    const defaultPadding = 10;
    const defaultBorderWidth = 1;

    const boxWidth = useRef<number>(props.productWidth ?? defaultWidth)
    const boxHeight = useRef<number>(props.productHeight ?? defaultHeight)
    const boxPadding = useRef<number>(props.productPadding ?? defaultPadding)
    const [boxMarginLeft, setBoxMarginLeft] = useState<number>(0)
    const [boxMarginRight, setBoxMarginRight] = useState<number>(0)
    const quantityBoxShown = useRef<number>(props.quantity ?? defaultNumberBoxShown)

    function getCorrectMargin (width?: number, padding?: number) : number {
        let wrapperWidth = refScrollProducts.current!.clientWidth / 3;
        if(width){
            if(padding) return (wrapperWidth - (width + (padding * 2) + defaultBorderWidth)) / 2;
            else return (wrapperWidth - (width + (defaultPadding * 2) + defaultBorderWidth)) / 2;
        } else{
            if(padding) return (wrapperWidth - (defaultWidth + (padding * 2) + defaultBorderWidth)) / 2;
            else return (wrapperWidth - (defaultWidth + (defaultPadding * 2) + defaultBorderWidth)) / 2;
        }
    }

    var mouseDown = false;
    var startX : number;
    var scrollLeft : number;

    useEffect(() => {
        if (!refScrollProducts.current) return;

        const setConfig = () : void => {
            setBoxMarginLeft(getCorrectMargin(props.productWidth, props.productPadding));
            setBoxMarginRight(getCorrectMargin(props.productWidth, props.productPadding));
        
            setScrollLeftNumberArray(
                makeArr(
                    0, 
                    refScrollProducts.current!.scrollWidth - refScrollProducts.current!.clientWidth, 
                    ((quantityBoxShown.current - 1) * boxStep) + 1
                )
            );
            // console.log(sliderValue)
            setSliderValue(0);
            const element = refScrollProducts.current!;
            element.scroll({
                left: scrollLeftNumberArray[0],
                behavior: "smooth"
            })
        }
        const resizeObserver = new ResizeObserver(() => {
            if(refScrollProducts.current) setConfig();
        });

        setTimeout(() => {
            if(refScrollProducts.current) setConfig();
        }, 200)
        
        resizeObserver.observe(refScrollProducts.current!);
    
        // if useEffect returns a function, it is called right before the
        // component unmounts, so it is the right place to stop observing
        return function cleanup() {
          resizeObserver.disconnect();
        }
      },
      // only update the effect if the ref element changed
      [refScrollProducts.current!, props.productWidth, props.productPadding ])

      useEffect(() => {
        let tempList = props.productList.sort((a: Produto, b: Produto) => {
            if(a.date_input > b.date_input){
                return 1;
            } else {
                return -1;
            }
        }).slice(0, quantityBoxShown.current );

        setHistory(tempList)

        if(props.transitionTimer){
            const intervalScroll = setInterval(() => {
                
                setSliderValue((sliderValue) => {
                    let newValue = sliderValue + 1;
                    const minValue = 0;
                    const maxValue = ((quantityBoxShown.current) - 1);
                    if(newValue > maxValue) newValue = maxValue;
                    if(sliderValue === maxValue) newValue = minValue;
    
                    const element = refScrollProducts.current!;
                    element.scroll({
                        left: scrollLeftNumberArray[newValue * boxStep],
                        behavior: "smooth"
                    })
                    return newValue
                });
            }, props.transitionTimer)
            return () => clearInterval(intervalScroll);
        }

    }, [props.productList, props.transitionTimer, scrollLeftNumberArray])

    function onSliderChange(e: React.ChangeEvent<HTMLInputElement>) : void {
        let newValue = parseInt(e.target.value);
        setSliderValue(newValue);
        const element = refScrollProducts.current!;
        element.scroll({
            left: scrollLeftNumberArray[newValue * boxStep],
            behavior: "smooth"
        })
    }
    function onClickSliderArrow(change: number) : void {
        let newValue = sliderValue + change;
        const minValue = 0;
        const maxValue = ((quantityBoxShown.current) - 1);
        if(newValue < minValue) newValue = minValue;
        if(newValue > maxValue) newValue = maxValue;
        if(sliderValue === minValue && change < 0) newValue = maxValue;
        if(sliderValue === maxValue && change > 0) newValue = minValue;

        setSliderValue(newValue);
        const element = refScrollProducts.current!;
        element.scroll({
            left: scrollLeftNumberArray[newValue * boxStep],
            behavior: "smooth"
        })
    }
    function makeArr(startValue: number, stopValue: number, cardinality: number) {
        var arr = [];
        var step = (stopValue - startValue) / (cardinality - 1);
        for (var i = 0; i < cardinality; i++) {
          arr.push(startValue + (step * i));
        }
        return arr;
      }

    function onMouseDown(e: React.MouseEvent<HTMLDivElement>) : void {
        $(".HistoryProductsWrap").addClass("active")
        mouseDown = true;
        let element = refScrollProducts.current!;
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    }

    // function onMouseUp(e: React.MouseEvent<HTMLDivElement>) : void {
    //     mouseDown = false;
    // }
    // function onMouseLeave(e: React.MouseEvent<HTMLDivElement>) : void {
    //     mouseDown = false;
    // }

    document.addEventListener("mouseup", () => {
        mouseDown = false;
        $(".HistoryProductsWrap").removeClass("active");
    })

    document.addEventListener("mousemove", (e) => {
        if (mouseDown) {
            e.preventDefault();
            const element = refScrollProducts.current!;
            const x = e.pageX - element.offsetLeft;
            const walkX = (x - startX) * 1;
            element.scrollLeft = scrollLeft - walkX;
            // element.scroll({
            //     left: scrollLeft - walkX,
            //     behavior: "smooth"
            // })
          }
    })

    return (
        <div className="HistoryProductsSpacer">
            <div className="HistoryProductsWrap"
                onMouseDown={onMouseDown}
                // onMouseUp={onMouseUp}
                // onMouseLeave={onMouseLeave}
                // onMouseMove={onMouseMove}
                ref={refScrollProducts}
            >
                {
                    historyList.map((el: Produto) => {
                        return <div 
                            key={el.id} 
                            className="HistoryProductsBox" 
                            style={{
                                minWidth: boxWidth.current, 
                                height: boxHeight.current,
                                padding: boxPadding.current,
                                marginLeft: boxMarginLeft,
                                marginRight: boxMarginRight
                            }}
                            onClick={() => {if(props.onClickBox !== undefined) {props.onClickBox(el.id.toString())}}}
                        >
                            <p>{el.title}</p>
                            <p>{el.quantity}</p>
                            {/* <p>{new Date(el.date_input).toLocaleString("en-gb")}</p> */}
                        </div>
                    })
                }
                {/* <div 
                    className="ProdutoBoxFiller"
                    style={{
                        minWidth: boxMarginRight
                    }}
                >{""}</div> */}
            </div>
            <div className="leftArrowHistory" onClick={() => onClickSliderArrow(-1)}>{"<"}</div>
            <div className="rightArrowHistory" onClick={() => onClickSliderArrow(1)}>{">"}</div>
            <input onChange={onSliderChange} className="rangeHistory" type="range" min="0" max={((quantityBoxShown.current) - 1).toString()} value={sliderValue}></input>
        </div>
    )
}

export default HistoryProducts;