// @ts-nocheck
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DataGrid, { textEditor, Column } from "react-data-grid";
import { Row, RowCol } from "./logic/fileUploader";

const getRowsCols = (data: any): RowCol => ({
  rows: XLSX.utils.sheet_to_json<Row>(data, { header: 1 }),
  columns: Array.from(
    {
      length: XLSX.utils.decode_range(data["!ref"] || "A1").e.c + 1,
    },
    (_, i) => ({
      key: String(i),
      name: XLSX.utils.encode_col(i),
      editor: textEditor,
    })
  ),
});

const DisplayDataset = (cols, rows) => {
  const [co, setCo] = useState(cols.cols);
  const [ro, setRo] = useState(cols.rows);

  useEffect(() => {
    setRo(cols.rows);
    setCo(cols.cols);
    console.log("re render");
  }, [cols]);

  return (
    <div className="dataset_container">
      {ro && <DataGrid rows={ro} columns={co} onRowsChange={setRo} />}
    </div>
  );
};

export default DisplayDataset;
