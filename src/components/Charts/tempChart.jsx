// import ReactApexCharts from 'react-apexcharts'
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

export default function TempChart() {
  const [options, setOptions] = useState({
    series: [
      {
        name: "STOCK ABC",
        data: [5, 10, 25, 15, 1, 10, 15],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      toolbar: {
        show: true
      },
      title: {
        text: "Fundamental Analysis of Stocks",
        align: "left",
      },
      subtitle: {
        text: "Price Movements",
        align: "left",
      },
      // labels: [1, 20, 3, 4, 5, 6],
      xaxis: {
        type: "number",
        categories: [1, 2, 3, 4, 5, 6, 7],
      },
      yaxis: {
        opposite: true,
      },
      // legend: {
      //   horizontalAlign: "left",
      //   show: false,
      // },
    },
  });

  return (
    <Chart
      options={options.options}
      series={options.series}
      type="area"
      height={350}
      width="150%"
    />
  );
}
