import React, { useState,useEffect } from "react"
import Chart from 'react-apexcharts'


const PieChart = ({payment}) => {
    const [data, setData] = useState({
        series: [44, 55],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },

    })

    useEffect(() => {
        // Extract labels and series data from payment
        const labels = payment.map((payment) => payment._id);
        const series = payment.map((payment) => payment.count);
    
        // Update the state with the extracted data
        setData((prevState) => ({
          ...prevState,
          series,
          options: {
            ...prevState.options,
            labels,
          },
        }));
      }, [data]);

    return (
        <Chart
            options={data.options} series={data.series} type="pie" width={380}
        />
    )

}

export default PieChart