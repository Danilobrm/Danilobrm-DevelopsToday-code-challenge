import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CountryInfo } from "../models/countries.interface";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = ({
  data,
}: {
  data: CountryInfo["countryPopulation"];
}) => {
  // Map data to format needed for the chart
  const chartData = {
    labels: data.map((item) => item.year), // X-axis: years
    datasets: [
      {
        label: "Population",
        data: data.map((item) => item.value), // Y-axis: population
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Curve effect
      },
    ],
  };

  return <Line data={chartData} />;
};

export default PopulationChart;
