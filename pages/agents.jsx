import PocketBase from "pocketbase";
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import {getAgents,updateAgent} from "../libs/pocketbase";


export default function Agents() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  const [selectedID,setSelectedID] = useState(null)

  const [agentData, setAgentData] = useState(null);
  const agentlist = async () => {
    const result = await getAgents()
    // console.log(result)
      setAgentData(result);

  };

  const updateMe = async(form)=>{
    form.preventDefault()
    const result = await updateAgent(selectedID.id,form.target.name.value)
    agentlist();
  }

  useEffect(() => {
    agentlist();
  }, []);

  console.log("muktadir");
  // console.log(agentData);

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
        <div className="">
          {
            agentData && agentData.map(agent=>(
              <div className="" key={agent.id}>
                <button onClick={()=> setSelectedID(agent)}>{agent.name}</button>
              </div>
            ))
          }
          <div className={`${selectedID ? "block" : "hidden"}`}>
            <form onSubmit={(e)=> updateMe(e)}>
              <input name="name" type="text" defaultValue={selectedID ? selectedID.name : ""} placeholder="Name" />
              <input type="submit" value={"update"} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
