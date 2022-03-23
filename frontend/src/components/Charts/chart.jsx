// import ReactApexCharts from 'react-apexcharts'
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useState, useEffect } from "react";
import { Data } from "./data";

console.log();

export default function LiveChart({ subtitle }) {
  const Loss = Data.map((dict) => [dict.epoch, dict.data["loss"]]);

  const Accuracy = Data.map((dict) => [dict.epoch, dict.data["accuracy"]]);

  const [start, setStart] = useState(0);

  //* Series Data
  const [series, setSeries] = useState({
    series: [
      {
        name: "Loss",
        data: [],
      },
      {
        name: "Accuracy",
        data: [],
      },
    ],
  });

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
          easing: "linear",
          // speed: 1000,
          // animateGradually: {
          //   enabled: false,
          //   delay: 150,
          // },
          dynamicAnimation: {
            enabled: true,
            speed: 550,
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
        //     dataPointIndex: start-2,
        //     size: 4,
        //     shape: "circle", // "circle" | "square" | "rect"
        //   },
        //   {
        //     seriesIndex: 1,
        //     strokeColor: "rgb(119, 0, 255)",
        //     // fillColor: 'rgb(119, 0, 255)',
        //     dataPointIndex: start-2,
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

  const resetData = () => {
    let [loss, accuracy] = series.series;
    const len = loss["data"].length;
    loss["data"] = loss["data"].slice(len - 10, len);
    accuracy["data"] = accuracy["data"].slice(len - 10, len);

    setSeries({
      series: [loss, accuracy],
    });
  };

  const updateData = (pointer) => {
    let [loss, accuracy] = series.series;
    loss["data"].push(Loss[pointer]);
    accuracy["data"].push(Accuracy[pointer]);

    setSeries({ series: [loss, accuracy] });

    // stop data array from leaking memory and growing too big
    // if (loss["data"].length > 20) resetData();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (start <= 149) {
        setStart(start + 1);
        updateData(start);
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => {
      window.clearInterval(interval); // clear the interval in the cleanup function
    };
  }, [start]);

  useEffect(() => {
    ApexCharts.exec("realtime", "updateSeries", series.series);
  }, [series]);

  return (
    <Chart
      options={options.options}
      series={series.series}
      type="area"
      height={350}
      width="150%"
    />
  );
}
