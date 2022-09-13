import { useState, useReducer } from "react";
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
    <>
      <button
        onClick={() => {
          setList([1]);
        }}
      >
        {" "}
        My dataframes
      </button>
      {list.length > 0 && (
        <div>
          {datastring.map((df, index) => {
            return (
              <button
                key={index}
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
      {list.length === 0 && <div>you dont have any datasets yet</div>}
      {currentDf && (
        <div>
          <DisplayDataset
            cols={datastring[currentDf].columns.columns}
            rows={datastring[currentDf].rows.rows}
          />
          <DeleteDf name={datastring[currentDf].name} />
          <ChartType dataset={datastring[currentDf]} />
          <div>
            <button onClick={() => dispatch({ type: "line" })}>Line </button>
            <button onClick={() => dispatch({ type: "bar" })}>Bar </button>
            <button onClick={() => dispatch({ type: "scatter" })}>
              Scatter
            </button>
            <button onClick={() => dispatch({ type: "area" })}>Area</button>
            <button onClick={() => dispatch({ type: "bubble" })}>Bubble</button>

            <div>
              {state.chart === "line" && <LineChart variables={datastring[currentDf]} />}
              {state.chart === "bar" && <BarChart  variables={datastring[currentDf]} />}
              {state.chart === "scatter" && (
                <ScatterChart variables={datastring[currentDf]} />
              )}
              {state.chart === "area" && <AreaChart />}
              {state.chart === "bubble" && (
                <BubbleChart variables={datastring[currentDf]} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayListDf;
