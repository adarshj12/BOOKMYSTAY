import React, { useState ,useEffect} from "react"
import Chart from 'react-apexcharts'

const LineGraph = ({revenue}) => {
    const [data, setData] = useState({

        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Revenue per Month',
                align: 'left'
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        }
    })

    useEffect(() => {
    
        const apexChartData = Array(12).fill(0); // Initialize the array with 12 elements, all set to 0
    
        revenue.forEach((item) => {
          if (item.month !== null && item.month >= 1 && item.month <= 12) {
            apexChartData[item.month - 1] = item.revenue;
          }
        });
    
        setData((prevState) => ({
          ...prevState,
          series: [{
            name: "Desktops",
            data: apexChartData
          }]
        }));
      }, []);
    return (
        <Chart
            options={data.options} series={data.series} type="line" width={380}
        />
    )
}

export default LineGraph;