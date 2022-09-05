
// TODOOOOOOOOOO

// CHECK MAXIMUM DOCUMENT SIZE AND CHECK IF POSSIBLE TO INCREASE






import { useState } from 'react';
import * as XLSX from 'xlsx';
import DataGrid, { textEditor, Column } from "react-data-grid";
import {  useSession } from 'next-auth/react'

type DataSet = string | null;
type Row = any[];
type AOAColumn = Column<Row>;
type RowCol = { rows: Row[]; columns: AOAColumn[]; };


const getRowsCols = ( data: any, sheetName: string ): RowCol => ({
  rows: XLSX.utils.sheet_to_json<Row>(data.Sheets[sheetName], {header:1}),
  columns: Array.from({
    length: XLSX.utils.decode_range(data.Sheets[data.SheetNames[0]]["!ref"]||"A1").e.c + 1
  }, (_, i) => ({ key: String(i), name: XLSX.utils.encode_col(i), editor: textEditor }))
});



 const FileUploader = () => {
  const [rows, setRows] = useState<Row[]>([]); // data rows
  const [columns, setColumns] = useState<AOAColumn[]>([]);
    const [dataframe, setDataframe] = useState<any>(null)
  const [dfName, setdfName] = useState<string | null>(null)

  const {data} = useSession()

  const userData = JSON.parse(JSON.stringify(data))

  const email = userData.user.email

    function onButtonClick() {
        const fileReader = new FileReader() 
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = ".xlsx, .xls, .csv"
        input.onchange = () => {
          fileReader
            .readAsBinaryString(input.files![0]);
        }

        input.click();

        fileReader.onload =  () => {
            const workbook = XLSX.read(fileReader.result, {type:"binary"})
            const sheet = workbook.Sheets[workbook.SheetNames[0]]
            const { rows: new_rows, columns: new_columns } = getRowsCols(workbook, workbook.SheetNames[0]);
           // const dld = XLSX.utils.decode_range(sheet["!ref"]||"A1").e.c + 1
            setRows(new_rows);
            setColumns(new_columns);
            setDataframe(sheet)
            //console.log(workbook,'1',dld, 'row', rows,'col',columns, JSON.parse(JSON.stringify(sheet)))
        };
      

      }



      const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const body = { dfName, dataframe, email};
          await fetch('/api/auth/savedataset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          .then(function(response) {
            console.log(response.status); // Will show you the status
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        });
        ;
        } catch (error) {
          console.error( userData);
        }
      };

    return (<div className="fileUploaderContainer" style = {{height: '500px'}}>
        <button onClick={onButtonClick}>Open file upload window</button>
        { dataframe && 
        <>
      <DataGrid columns={columns} rows={rows} onRowsChange={setRows} 
    rowHeight={35}/>

<input 
            onChange={e => {
              setdfName(e.target.value)
            }}
            type="text"
            name="name"
            placeholder="name"
            required />

    <button onClick={submitData}>Save Document</button>
        </>

    }
    </div>)
}

export default FileUploader