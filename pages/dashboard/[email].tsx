import { prisma } from "../../prisma/share-client";
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from "next/link";
import Image from "next/image";
import FileUploader from "../../components/stylecomponents/logic/fileUploader";
import Header from "../../components/stylecomponents/logic/header";


export async function getStaticPaths() {
    // Return a list of possible value for slug
    const allUsers = await prisma.user.findMany();
    const paths = allUsers.map((user) => {
        return { params: { email: user.email } };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    // Fetch necessary data for the blog post using params.slug
    const email = context.params.email;
    const allUsers = await prisma.user.findMany({ where: { email: email } })
    return {
        props: {
            info: allUsers[0]
        },
    };
}

export default function dashboard({ info }: any) {
    const { data, status } = useSession()

    const userData = JSON.parse(JSON.stringify(info))

    return (
        <>
            <Header></Header>
            {status === 'authenticated' &&

                <div>
                    <div>
                       <h2>Hello {userData.email} lets get you started</h2> 
                    </div>
                    <div>You havent created any dashboards yet</div>


                    <button onClick={() => signOut()} >Sign Out</button>
                    <Image src="/empty_files.svg" height={30} width={30} alt = '' />
                    <FileUploader/>

                </div>

            }

            {status === 'loading' && <p>Loading...</p>}

            {status === 'unauthenticated' && <Link href="/"><a> User not found go to home</a></Link>}

        </>
    );
}