// import { prisma } from "../../prisma/share-client";
import { useState } from "react";

// // const signUp = () => {
// //    

//     async function main() {
//         // Connect the client
//         // ... you will write your Prisma Client queries here
//         const allUsers = await prisma.user.findMany()
//         console.log(allUsers)
//       }
//       return (<>
//         
//       </>) 
// }

// export default signUp


// export const getServerSideProps = async () => {
//     const allUsers = await prisma.user.findMany()
//     return { props: { allUsers } }
//   }

const SignUp = () => {

     const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [exists, setExists] = useState(false)



    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
          const body = { name,email };
          await fetch('/api/auth/signup', {
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
          console.error( 'alalaal');
          setExists(true)
        }
      };
    

    return (<>
         <form onSubmit={submitData}
        style={{
          display: 'flex'
        }}>
        <div>
          <input 
            onChange={e => {
              setEmail(e.target.value)
            }}
            type="text"
            name="email"
            placeholder="Email"
            required />

             <input 
             onChange={e => {
              setName(e.target.value)
           }}
            type="text"
            name="password"
            placeholder="password"
            required />
        </div>
        <div>
          <button >
            Submit
          </button>
        </div>
      </form>
      <p style = {{ display: `${exists ? '' : 'none'}`}}>
        email already exists
      </p>
    </>)
}

export default SignUp