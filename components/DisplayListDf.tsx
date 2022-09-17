import { useState, useReducer, memo, useEffect } from "react";
import AreaChart from "./charts/area";
import BarChart from "./charts/bar";
import BubbleChart from "./charts/bubble";
import LineChart from "./charts/line";
import ScatterChart from "./charts/scatter";
import DisplayDataset from "./stylecomponents/DisplayDataset";
import ChartType from "./stylecomponents/logic/ChartType";
import DeleteDf from "./stylecomponents/logic/DeleteDf";

type props = {
  dataf: any;
};

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

const DisplayListDf = ({ dataf }: props) => {
  const [list, setList] = useState([]);
  const [currentDf, setCurrentDf] = useState<number | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const datastring = dataf;

  return (
    <div className="main_container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="get_dataframes"
          onClick={() => {
            setList([1]);
          }}
        >
          My dataframes
        </button>
      </div>

      {list.length > 0 && (
        <div className="list_container">
          {datastring.map((df, index) => {
            return (
              <button
                className="df_name"
                key={df.concat}
                onClick={() => {
                  setCurrentDf(index);
                }}
              >
                {df.concat}
              </button>
            );
          })}
        </div>
      )}
      {list.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Get your data now
        </div>
      )}
      {currentDf !== null && (
        <div
          className="df_chart_cont"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <DisplayDataset
            cols={datastring[currentDf].columns.columns}
            rows={datastring[currentDf].rows.rows}
          />
          <ChartType dataset={datastring[currentDf]} />
          <div className="charts_cont">
            <button
              onClick={() => dispatch({ type: "line" })}
              className="btn_chart"
            >
              Line{" "}
            </button>
            <button
              onClick={() => dispatch({ type: "bar" })}
              className="btn_chart"
            >
              Bar{" "}
            </button>
            <button
              onClick={() => dispatch({ type: "scatter" })}
              className="btn_chart"
            >
              Scatter
            </button>
            <button
              onClick={() => dispatch({ type: "area" })}
              className="btn_chart"
            >
              Area
            </button>
            <button
              onClick={() => dispatch({ type: "bubble" })}
              className="btn_chart"
            >
              Bubble
            </button>
          </div>
          <DeleteDf name={datastring[currentDf].name} />
        </div>
      )}
      <div className="chart_view">
        {state.chart === "line" && <LineChart />}
        {state.chart === "bar" && <BarChart />}
        {state.chart === "scatter" && (
          <ScatterChart variables={datastring[currentDf]} />
        )}
        {state.chart === "area" && <AreaChart />}
        {state.chart === "bubble" && (
          <BubbleChart variables={datastring[currentDf]} />
        )}
      </div>
    </div>
  );
};

export default memo(DisplayListDf);
