import React, { useEffect } from "react"
import "../../styles/components/MainPage/ChartComponent.css"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

interface ChartInterface{

}

const ChartComponent : React.FC<ChartInterface> = (props) => {
    // let [productList, setProductList] = useState<Produto[]>([]);
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [ 
              faker.number.int({min: 0, max: 100}),
              faker.number.int({min: 0, max: 100}),
              faker.number.int({min: 0, max: 100}), 
              faker.number.int({min: 0, max: 100}),
              faker.number.int({min: 0, max: 100}),
              faker.number.int({min: 0, max: 100})
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    useEffect(() => {

    },[])

    return (
        <div className="ChartComponentSpacer">
            <div className="Chart">
                <Pie data={data} />
            </div>
        </div>
    )
}

export default ChartComponent;