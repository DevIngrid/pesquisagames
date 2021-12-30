import React, { useEffect, useState } from "react";
import Filters from "../../components/Filters";

import { barOptions, pieOptions } from "./chart-options";
import Chart from "react-apexcharts";
import "./styles.css";
import axios from 'axios';
import { buildBarSeries, getGenderChartData, getPlatformChartData } from "./helpers";

type PieChartData = {
  labels: string[];
  series: number[];
};

type BarChartData = {
  x: string;
  y: number;
};

const initialPieData = {
  labels: [],
  series: [],
};

//Foi feito para teste
// const chartData = [
//   {
//     x: "Washington",
//     y: 10,
//   },
//   {
//     x: "Nélio",
//     y: 20,
//   },
// ];

//fiz isto para corrigir um erro que estava dando no arquivo deles - não aceitou dataLabels - teve que ser Labels
// const options = {
//   chart: {
//     background: "transparent",
//     foreColor: "red",
//   },
//   colors: ["#a8dadc", "#ed7947", "#00D4FF", "#ffd6a5"],
//   legend: {
//     show: false,
//   },
//   tooltip: {
//     enabled: true,
//   },
//   Labels: {
//     enabled: true,
//     offsetX: "100px",
//     offsetY: "100px",
//     style: {
//       colors: ["#a8dadc", "#ed7947", "#00D4FF", "#ffd6a5"],
//       fontSize: "20px",
//       fontFamily: "Play, sans-serif",
//       fontWeight: 700,
//     },
//   },
//   plotOptions: {
//     pie: {
//       customScale: 0.7,
//       expandOnClick: false,
//       dataLabels: {
//         offset: 60,
//       },
//     },
//   },
// };

const BASE_URL = 'http://localhost:8080'

const Charts = () => {
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
  const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

  useEffect (() => {

    async function getData() {
      const recordsResponse = await axios.get(`${BASE_URL}/records`);
      const gamesResponse = await axios.get(`${BASE_URL}/games`);

     const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
    setBarChartData(barData);

    const platformChartData = getPlatformChartData(recordsResponse.data.content);
    setPlatformData(platformChartData);

    const genderChartData = getGenderChartData(recordsResponse.data.content);
    setGenderData (genderChartData);

    }
    getData();
      
  }, [])
  return (
    <div className="page-container">
      <Filters link="/records" linkText="VER TABELA" />
      <div className="chart-container">
        <div className="top-related">
          <h1 className="top-related-title">Jogos mais votados</h1>
          <div className="games-container">
            <Chart
              options={barOptions}
              type="bar"
              width="900"
              height="650"
              series={[{ data: barChartData }]}
            />
          </div>
        </div>
        <div className="charts">
          <div className="platform-chart">
            <h2 className="chart-title">Plataformas</h2>
            <Chart
              options={{ ...pieOptions, labels: platformData?.labels }}
              type="donut"
              series={platformData?.series}
              width="350"
            />
          </div>
          <div className="gender-chart">
            <h2 className="chart-title">Gêneros</h2>
            <Chart
              options={{ ...pieOptions, labels: genderData?.labels }}
              type="donut"
              series={genderData?.series}
              width="350"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
