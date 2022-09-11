import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const ScatterChart = (variables) => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [radiusLabel, setRadiusLabel] = useState("");
  const [color, setColor] = useState("255, 99, 132, 0.5");
  const [title, setTitle] = useState("");

  let rows = variables.variables.rows;
  const columns = variables.variables.columns?.columns.map((obj) => {
    return obj.name;
  });

  const sample = [];

  if (rows?.rows) {
    for (let i = 0; i < rows?.rows.length; i++) {
      sample.push({
        x: rows?.rows[i][columns.indexOf(x)],
        y: rows?.rows[i][columns.indexOf(y)],
      });
    }
  }

  const [scatter, setScatter] = useState([]);

  const data = {
    datasets: [
      {
        label: radiusLabel,
        data: scatter,
        backgroundColor: `rgba(${color})`,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${title}`,
      },
    },
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Radius Label"
        onChange={(e) => {
          setRadiusLabel(e.target.value);
        }}
      ></input>
      <label> Select Color RGBA</label>
      <input
        type="text"
        placeholder="250,250,250,0.5"
        onChange={(e) => {
          setColor(e.target.value);
        }}
      ></input>
      <label htmlFor="x_axis"> Select X axis</label>
      <select
        name="x_axis"
        onChange={(e) => {
          setX(e.target.value);
        }}
      >
        <option key="select_x" value="select_x">
          Select
        </option>
        {columns.map((obj) => {
          return (
            <option key={obj} value={obj}>
              {obj}
            </option>
          );
        })}
      </select>
      <label htmlFor="y_axis"> Select Y axis</label>
      <select
        name="y_axis"
        onChange={(e) => {
          setY(e.target.value);
        }}
      >
        <option key="select_y" value="select_y">
          Select
        </option>
        {columns.map((obj) => {
          return (
            <option key={obj} value={obj}>
              {obj}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          setScatter(sample);
        }}
      >
        {" "}
        Get chart
      </button>
      {scatter.length > 0 && <Scatter options={options} data={data} />}
    </div>
  );
};

export default ScatterChart;
