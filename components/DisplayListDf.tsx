
import {  useSession } from 'next-auth/react'
import {  useState } from "react";

type props = {
    dataf:any
}

const DisplayListDf = ({dataf}:props) => {
    
    const [list, setList] = useState([])

    const datastring = dataf
     
return <>
    <button onClick = {()=>{console.log(dataf, 'djdjdj'); setList([1]);
    }}> My dataframes</button>
    {list.length > 0 && <div>
         {datastring.map((df,index) => {
            return <div key={index}>{df.name}</div>
         })}
        </div>}
        {list.length===0 && <div>
        you dont have any datasets yet 
        </div>}
</>
   
}

export default DisplayListDf