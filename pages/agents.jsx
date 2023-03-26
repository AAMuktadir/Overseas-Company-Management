import PocketBase from "pocketbase";
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import pb from "../libs/pocketbase";

export default function Agents() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  const [agentData, setAgentData] = useState([]);
  const agentlist = async () => {
    try {
      console.log("muktadir01");
      const records = await pb.collection("agents").getFullList({
        sort: "-created",
      });
      console.log(records);

      setAgentData(records);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    agentlist();
  }, []);

  console.log("muktadir");
  console.log(agentData);

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Agents</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Agents"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <h1>Here we can see all the agents</h1>
        </div>
        <div className=""></div>
      </main>
    </>
  );
}
