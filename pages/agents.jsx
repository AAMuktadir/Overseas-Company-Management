import PocketBase from "pocketbase";
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import { Table } from "@nextui-org/react";
import { getAgents } from "../libs/pocketbase";

//modals
import Create_Agent from "../components/Modals/Create_Modals/Create_Agent";
import Edit_Agent from "../components/Modals/Update_Modals/Edit_Agent";
import Delete_Agent from "../components/Modals/Delete_Modals/Delete_Agent";

export default function Agents() {
  const [isLoading, setLoading] = useState(false);
  //modal states
  const [Agents, setAgents] = useState(null);
  const [AddAgentVisible, setAddAgentVisible] = useState(false);
  const [EditAgentVisible, setEditAgentVisible] = useState(false);
  const [DeleteAgentVisible, setDeleteAgentVisible] = useState(false);
  const [SelectedAgent, setSelecetedAgent] = useState(null);
  const router = useRouter();
  const user = useUser();

  //modal functions
  //TODO - parameter teacher
  const EditAgentModalHandler = (agent) => {
    setSelecetedAgent(agent);
    setEditAgentVisible(true);
  };

  //TODO - parameter teacher
  const DeleteAgentModalHandler = (agent) => {
    setSelecetedAgent(agent);
    setDeleteAgentVisible(true);
  };

  const getAgentsHandler = async () => {
    const result = await getAgents();
    // @ts-ignore
    setAgents(result);
  };

  useEffect(() => {
    getAgentsHandler();
  }, []);

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
        <Header title={"Agents Information"}>
          <button
            className="bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setAddAgentVisible(true)}
          >
            ADD AGENT
          </button>
        </Header>
        <div className="p-5">
          <h1>Here we can see all the Agents</h1>
        </div>
        <div className="p-5">
          <Table
            aria-label="Agents"
            css={{
              height: "auto",
              minWidth: "100%",
              dropShadow: "none",
            }}
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>ADDRESS</Table.Column>
              <Table.Column>CONTACT</Table.Column>
              <Table.Column>OPTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {Agents &&
                Agents.map((agent) => (
                  <Table.Row key={agent.id}>
                    <Table.Cell>{agent.name}</Table.Cell>
                    <Table.Cell>{agent.address}</Table.Cell>
                    <Table.Cell>{agent.contact}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                          onClick={() => EditAgentModalHandler(agent)}
                        >
                          EDIT
                        </button>
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1"
                          onClick={() => DeleteAgentModalHandler(agent)}
                        >
                          DELETE
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>

        <div className="">
          <Create_Agent
            visible={AddAgentVisible}
            setVisible={setAddAgentVisible}
            reset={getAgentsHandler}
          />
          <Edit_Agent
            visible={EditAgentVisible}
            setVisible={setEditAgentVisible}
            agent={SelectedAgent}
            reset={getAgentsHandler}
          />
          <Delete_Agent
            visible={DeleteAgentVisible}
            setVisible={setDeleteAgentVisible}
            agent={SelectedAgent}
            reset={getAgentsHandler}
          />
        </div>
        {/* <div className="">
          {agentData &&
            agentData.map((agent) => (
              <div className="" key={agent.id}>
                <button onClick={() => setSelectedID(agent)}>
                  {agent.name}
                </button>
              </div>
            ))}
          <div className={`${selectedID ? "block" : "hidden"}`}>
            <form onSubmit={(e) => updateMe(e)}>
              <input
                className="border-4"
                name="name"
                type="text"
                defaultValue={selectedID ? selectedID.name : ""}
                placeholder="Name"
              />
              <input type="submit" value={"update"} />
            </form>
          </div>
        </div> */}
      </main>
    </>
  );
}
