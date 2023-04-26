import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { Table } from "@nextui-org/react";
import { createClient, getAgents } from "../libs/pocketbase";

export default function Clients() {
  const [isLoading, setLoading] = useState(false);
  //const [agentData, setAgentData] = useState(null);
  // const [makeform, setform] = useState(false);
  // const router = useRouter();
  // const user = useUser();

  // const createClient = () => {
  //   setform(!makeform);
  // };

  // const getAgentHandler = async () => {
  //   const result = await getAgents();
  //   // console.log(result)
  //   setAgentData(result);
  // };

  // useEffect(() => {
  //   getAgentHandler();
  // }, []);

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }

  // //for client creation
  // //const [setClient] = useState(null);
  // const createMe = async (form) => {
  //   form.preventDefault();
  //   const result = await createClient(
  //     form.target.firstname.value,
  //     form.target.lastname.value,
  //     form.target.age.value,
  //     form.target.agent.value,
  //     form.target.address.value,
  //     form.target.nid.value
  //   );
  //   if (result) {
  //     form.target.firstname.value = "";
  //     form.target.lastname.value = "";
  //     form.target.age.value = "";
  //     form.target.agent.value = "Agents";
  //     form.target.address.value = "";
  //     form.target.nid.value = "";
  //   }
  // };

  return (
    <>
      <Head>
        <title>Clients</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Clients"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <h1>Here we can see all the Clients</h1>
        </div>
        <div className="">
          <button onClick={createClient}>Add new Client</button>
        </div>
        <p>Muktadir</p>
        {makeform && (
          <div className="">
            <form onSubmit={(val) => createMe(val)}>
              <div className="flex flex-col gap-5 px-4">
                <div className="">
                  <input
                    className="border-4"
                    name="firstname"
                    type="text"
                    defaultValue=""
                    placeholder="First Name"
                  />
                </div>

                <div className="">
                  <input
                    className="border-4"
                    name="lastname"
                    type="text"
                    defaultValue=""
                    placeholder="Last Name"
                  />
                </div>

                <div className="">
                  <input
                    className="border-4"
                    name="age"
                    type="text"
                    defaultValue=""
                    placeholder="Your AGE"
                  />
                </div>

                <div className="">
                  <select name="agent" defaultValue={"Agents"}>
                    <option value="Agents" disabled>
                      Agents
                    </option>
                    {agentData
                      ? agentData.map((agent) => (
                          <option key={agent.id} value={agent.id}>
                            {agent.name}
                          </option>
                        ))
                      : null}
                  </select>
                  {/* <input
                  className="border-4"
                  name="agent"
                  type="text"
                  defaultValue=""
                  placeholder="Agent Name"
                /> */}
                </div>

                <div className="">
                  <input
                    className="border-4"
                    name="address"
                    type="text"
                    defaultValue=""
                    placeholder="Your Address"
                  />
                </div>

                <div className="">
                  <input
                    className="border-4"
                    name="nid"
                    type="text"
                    defaultValue=""
                    placeholder="Your Nid Number"
                  />
                </div>

                <div>
                  <input
                    className="border-4 border-black-500 bg-green-500"
                    type="submit"
                    value={"create"}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
