import { prisma } from "../../prisma/share-client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import FileUploader from "../../components/stylecomponents/logic/fileUploader";
import Header from "../../components/stylecomponents/logic/header";
import DisplayListDf from "../../components/DisplayListDf";
import { Bar } from "react-chartjs-2";

import ScatterChart from "../../components/charts/scatter";
import LineChart from "../../components/charts/line";
import AreaChart from "../../components/charts/area";
import BubbleChart from "../../components/charts/bubble";

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
  const [allUsers, allDFs] = await Promise.all([
    prisma.user.findMany({ where: { email: email } }),
    prisma.datasets.findMany({ where: { owner: email } }),
  ]);

  return {
    props: {
      info: allUsers[0],
      dataframes: allDFs,
    },
  };
}

export default function dashboard({ info, dataframes }: any) {
  const { data, status } = useSession();

  const userData = JSON.parse(JSON.stringify(info));

  return (
    <>
      <Header></Header>
      {status === "authenticated" && (
        <div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <FileUploader />
            <button className="sign_out" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>Hello {userData.email} lets get you some graphs</h2>
          </div>
          <DisplayListDf dataf={dataframes} />
        </div>
      )}

      {status === "loading" && <p>Loading...</p>}

      {status === "unauthenticated" && (
        <Link href="/">
          <a> User not found go to home</a>
        </Link>
      )}
    </>
  );
}
