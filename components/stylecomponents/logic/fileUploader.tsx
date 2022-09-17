// TODOOOOOOOOOO

// CHECK MAXIMUM DOCUMENT SIZE AND CHECK IF POSSIBLE TO INCREASE

import { useState } from "react";
import * as XLSX from "xlsx";
import DataGrid, { textEditor, Column } from "react-data-grid";
import { useSession } from "next-auth/react";
import Popup from "reactjs-popup";

export type DataSet = string | null;
export type Row = any[];
export type AOAColumn = Column<Row>;
export type RowCol = { rows: Row[]; columns: AOAColumn[] };

const getRowsCols = (data: any, sheetName: string): RowCol => ({
  rows: XLSX.utils.sheet_to_json<Row>(data.Sheets[sheetName], { header: 1 }),
  columns: Array.from(
    {
      length:
        XLSX.utils.decode_range(data.Sheets[data.SheetNames[0]]["!ref"] || "A1")
          .e.c + 1,
    },
    (_, i) => ({
      key: String(i),
      name: XLSX.utils.encode_col(i),
      editor: textEditor,
    })
  ),
});

const removeFromArray = function (arr, ...theArgs) {
  return arr.filter((val) => !theArgs.includes(val.name));
};

const FileUploader = () => {
  const [rows, setRows] = useState<Row[]>([]); // data rows
  const [columns, setColumns] = useState<any>([]);
  const [dataframe, setDataframe] = useState<any>(null);
  const [dfName, setdfName] = useState<string | null>(null);
  const [popup, setPopup] = useState(false);
  const { data } = useSession();
  const [allcolumns, setAllColumns] = useState<any>([]);
  const userData = JSON.parse(JSON.stringify(data));
  const contentStyle = { background: "rgba(255,255,255,1)", padding: "20px" };
  const overlayStyle = { background: "rgba(0,0,0,0.5)" };
  const arrowStyle = { color: "#000" };

  const email = userData.user.email;

  function onButtonClick() {
    const fileReader = new FileReader();
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls, .csv";
    input.onchange = () => {
      fileReader.readAsBinaryString(input.files![0]);
    };

    input.click();

    fileReader.onload = () => {
      const workbook = XLSX.read(fileReader.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const { rows: new_rows, columns: new_columns } = getRowsCols(
        workbook,
        workbook.SheetNames[0]
      );

      const cols = [];

      for (let i = 0; i < new_rows[0].length; i++) {
        cols.push({ key: String(i), name: new_rows[0][i] });
      }

      setRows(new_rows.slice(1));
      setColumns(cols);
      setAllColumns(cols);
      setDataframe(sheet);
      setPopup(true);
      console.log(sheet, "here");

      //console.log(workbook,'1',dld, 'row', rows,'col',columns, JSON.parse(JSON.stringify(sheet)))
    };
  }

  const concat = email + dfName;

  const [myArray, updateMyArray] = useState([]);

  console.log("columns", columns, rows);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const jsonCol = { columns };
    const jsonRow = { rows };
    try {
      const body = { dfName, jsonCol, jsonRow, email, concat };
      await fetch("/api/auth/savedataset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(function (response) {
        console.log(response.status); // Will show you the status
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      });
    } catch (error) {
      console.error(userData);
    }
  };

  return (
    <div className="fileUploaderContainer" style={{ height: "50px" }}>
      <button className="upload_btn" onClick={onButtonClick}>
        Upload File
      </button>
      {dataframe && (
        <>
          <Popup
            open={popup}
            position="right center"
            onClose={() => {
              setPopup(false);
            }}
            {...{ contentStyle, overlayStyle, arrowStyle }}
          >
            {allcolumns.map((obj) => {
              return (
                <button
                  className="upload_cols"
                  style={{
                    color: `${
                      myArray.includes(obj.name) ? "#2be9c0" : "white"
                    }`,
                  }}
                  onClick={() => {
                    updateMyArray((arr) => [...arr, obj.name]);
                  }}
                  key={obj.name}
                >
                  {obj.name}
                </button>
              );
            })}
            <DataGrid
              columns={columns}
              rows={rows}
              onRowsChange={setRows}
              rowHeight={35}
            />
            <button
              onClick={() => {
                setColumns(removeFromArray(columns, ...myArray));
              }}
              className="delete_cols"
            >
              {" "}
              delete columns
            </button>

            <input
              onChange={(e) => {
                setdfName(e.target.value);
              }}
              type="text"
              name="name"
              placeholder="name"
              required
              style={{ height: "35px" }}
            />

            <button className="save_df" onClick={submitData}>
              Save Document
            </button>
          </Popup>
        </>
      )}
    </div>
  );
};

export default FileUploader;
