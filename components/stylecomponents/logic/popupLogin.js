import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import Link from 'next/link';

const PopUp = ({openPopup}) => {

  const [userRequest, setUserRequest] = useState({
    email: "",
    password: ""
  });

  const [email, setEmail] = useState('')

  const createUser = async (email,password) => {
    const res = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${userRequest.email}`,
        password: `${userRequest.password}`
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  const route = '/posts/' + email
    return (
        <Popup open= {openPopup} position="right center">
        <div>
        <form onSubmit={() => {createUser( userRequest.email,userRequest.password);}}
        style={{
          display: 'flex'
        }}>
        <div>
          <input 
            onChange={e => {
              setUserRequest({...userRequest, [e.target.name]: e.target.value})
              setEmail(e.target.value)
            }}
            type="text"
            name="email"
            placeholder="Email"
            required />

             <input 
             onChange={e => {
              setUserRequest({...userRequest, [e.target.name]: e.target.value})
           }}
            type="text"
            name="password"
            placeholder="Password"
            required />
        </div>
        <div>
        <Link href = '/' > 
        <a>Go to dashboard</a>
     
          <button >
            Submit
          </button>
          </Link>
        </div>
      </form>
        </div>
      </Popup>
    );

    
}


export default PopUp