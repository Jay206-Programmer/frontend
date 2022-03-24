//* Library Imports
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useState, useEffect } from "react";

//* Relative imports
import { useStore } from "../../lib/zustand/store";

export default function LiveChart({ subtitle }) {
  
  //* Global States
  const Accuracy = useStore((state) => state.accuracy);
  const Loss = useStore((state) => state.loss);

  //* Series Data
  let series = [
    {
      name: "Loss",
      data: Loss.slice(-30),
    },
    {
      name: "Accuracy",
      data: Accuracy.slice(-30),
    },
  ];

  //* Graph Options
  const [options, setOptions] = useState({
    options: {
      chart: {
        id: "realtime",
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          // speed: 1000,
          // animateGradually: {
          //   enabled: false,
          //   delay: 150,
          // },
          dynamicAnimation: {
            enabled: true,
            speed: 300,
          },
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["orange", "rgb(119, 0, 255)"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 0,
        strokeColors: ["orange", "rgb(119, 0, 255)"],
        // discrete: [
        //   {
        //     seriesIndex: 0,
        //     strokeColor: "orange",
        //     // fillColor: 'rgb(119, 0, 255)',
        //     dataPointIndex: 30,
        //     size: 4,
        //     shape: "circle", // "circle" | "square" | "rect"
        //   },
        //   {
        //     seriesIndex: 1,
        //     strokeColor: "rgb(119, 0, 255)",
        //     // fillColor: 'rgb(119, 0, 255)',
        //     dataPointIndex: 30,
        //     size: 4,
        //     shape: "circle", // "circle" | "square" | "rect"
        //   },
        // ],
      },
      title: {
        text: subtitle,
        align: "center",
        offsetY: 10,
        style: {
          fontSize: "24px",
          fontWeight: 500,
          fontFamily: "Smooch Sans",
          color: "rgb(119, 0, 255)",
        },
      },
      grid: {
        show: true,
        borderColor: "gray",
      },
      xaxis: {
        type: "number",
        // categories: epochs,
        title: {
          text: "Epochs",
          offsetY: -8,
          // offsetX: 20,
        },
        labels: {
          rotate: 0,
        },
        tickAmount: 5,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        opposite: true,
        min: 0,
        max: 1,
        decimalsInFloat: 3,
        tickAmount: 5,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  });

  useEffect(() => {
    ApexCharts.exec("realtime", "updateSeries", series);
  }, [Loss]);

  return (
    <Chart
      options={options.options}
      series={series}
      type="area"
      height={350}
      width="150%"
    /> 
  );
}
