import AreaChart from "../../charts/area";
import BarChart from "../../charts/bar";
import BubbleChart from "../../charts/bubble";
import LineChart, { data } from "../../charts/line";
import ScatterChart from "../../charts/scatter";
import { useEffect, useReducer, useState } from "react";

const initialState = { chart: "" };

function reducer(state, action) {
  switch (action.type) {
    case "bubble":
      return { chart: "bubble" };
    case "scatter":
      return { chart: "scatter" };
    case "area":
      return { chart: "area" };
    case "bar":
      return { chart: "bar" };
    case "line":
      return { chart: "line" };
  }
}

const ChartType = (dataset) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [dataframe, setDataframe] = useState(null);

  useEffect(() => {
    setDataframe(dataframe);
  }, []);
  return <></>;
};

export default ChartType;
