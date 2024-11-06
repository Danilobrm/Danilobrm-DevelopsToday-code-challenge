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
  countryPopulation,
}: {
  countryPopulation: CountryInfo["populationCounts"];
}) => {
  const chartData = {
    labels: countryPopulation.map((data) => data.year), // X-axis: years
    datasets: [
      {
        label: "Population",
        data: countryPopulation.map((data) => data.value), // Y-axis: population
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Curve effect
      },
    ],
  };

  return <Line data={chartData} />;
};

export default PopulationChart;
