
import {  useSession } from 'next-auth/react'
import {  useState } from "react";
import DisplayDataset from './stylecomponents/DisplayDataset';
import DeleteDf from './stylecomponents/logic/DeleteDf';

type props = {
    dataf:any
}

const DisplayListDf = ({dataf}:props) => {
    
    const [list, setList] = useState([])
    const [currentDf, setCurrentDf] = useState< number | null>(null)

    const datastring = dataf

    console.log(datastring)

    
     
return <>
    <button onClick = {()=>{console.log(dataf, 'djdjdj'); setList([1]);
    }}> My dataframes</button>
    {list.length > 0 && <div>
         {datastring.map((df,index) => {
            return <button key={index}
            onClick = { () => {setCurrentDf(index)}}
            >{df.concat}</button>
         })}

         
        </div>}
        {list.length===0 && <div>
        you dont have any datasets yet 
        </div>}
       {  currentDf && <div>
        <DisplayDataset cols = {datastring[currentDf].columns.columns} rows = {datastring[currentDf].rows.rows}  />
        <DeleteDf name = {datastring[currentDf].name } /> 
       </div>
       }
</>
   
}

export default DisplayListDf