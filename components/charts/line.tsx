
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale
);

function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569)*86400*1000));
}

const LineChart = (variables) => {
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
        x:ExcelDateToJSDate( rows?.rows[i][columns.indexOf(x)]),
        y: rows?.rows[i][columns.indexOf(y)],
      });
    }
  }

  const arr = rows?.rows.map(obj => {return {
    x: ExcelDateToJSDate(obj[columns.indexOf(x)]),
    y: obj[columns.indexOf(y)],
  }})

  const endresult = Object.values(arr.reduce((value, object) => {
    if (value[object.x]) {
      value[object.x].y += object.y; 
      
  
  } else {
      value[object.x] = { ...object , count : 1
      };
    }
    return value;
  }, {}));

  const labels = arr.map((obj) => { return obj.x})

  const [scatter, setScatter] = useState([]);

  const data = {
    labels,
    datasets: [
      {
        label: radiusLabel,
        data: arr.map(obj=>{return obj.y}),
        backgroundColor: `rgba(${color})`,
        borderColor:`rgba(${color})`
      },
    ],
  };

  const options = {
    elements: {
      point:{
          radius: 1
      }
    },
    scales: {
      x: {
        type: 'linear'
      }
    },
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
          console.log({arr,endresult,labels})
        }}
      >
        {" "}
        Get chart
      </button>
      {scatter.length > 0 && <Line options={options} data={data} />}
    </div>
  );
}

export default LineChart