import React, { useEffect } from "react"
import "../../styles/components/MainPage/GraphComponent.css"

import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';


interface GraphInterface{

}

const Graph : React.FC<GraphInterface> = (props) => {
    // let [productList, setProductList] = useState<Produto[]>([]);
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    useEffect(() => {

    },[])

    return (
      <div className="GraphSpacer">
        <Line options={options} data={data} />
      </div>
    )
}

export default Graph;