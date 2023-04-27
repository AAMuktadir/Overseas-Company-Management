import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import { Table } from "@nextui-org/react";
import { getClient } from "../libs/pocketbase";

//Modals
import Edit_Client from "../components/Modals/Update_Modals/Edit_Client";
import Create_Client from "../components/Modals/Create_Modals/Create_Client";
import Delete_Client from "../components/Modals/Delete_Modals/Delete_Client";

export default function Clients() {
  const [isLoading, setLoading] = useState(false);
  //modal states
  const [Clients, setClients] = useState(null);
  const [AddClientVisible, setAddClientVisible] = useState(false);
  const [EditClientVisible, setEditClientVisible] = useState(false);
  const [DeleteClientVisible, setDeleteClientVisible] = useState(false);
  const [SelectedClient, setSelecetedClient] = useState(null);
  const router = useRouter();
  const user = useUser();

  //modal functions
  //TODO - parameter teacher
  const EditClientModalHandler = (client) => {
    setSelecetedClient(client);
    setEditClientVisible(true);
  };

  //TODO - parameter teacher
  const DeleteClientModalHandler = (client) => {
    setSelecetedClient(client);
    setDeleteClientVisible(true);
  };

  const getClientHandler = async () => {
    const result = await getClient();
    // @ts-ignore
    setClients(result);
  };

  useEffect(() => {
    getClientHandler();
  }, []);

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
        <Header title={"Clients Information"}>
          <button
            className="bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setAddClientVisible(true)}
          >
            ADD CLIENT
          </button>
        </Header>
        <div className="p-5">
          <h1>Here we can see all the Clients</h1>
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
              <Table.Column>AGE</Table.Column>
              <Table.Column>BLOOD GROUP</Table.Column>
              <Table.Column>NID</Table.Column>
              <Table.Column>OPTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {Clients &&
                Clients.map((client) => (
                  <Table.Row key={client.id}>
                    <Table.Cell>
                      {client.firstname + " " + client.lastname}
                    </Table.Cell>
                    <Table.Cell>{client.age}</Table.Cell>
                    <Table.Cell>{client.blood_group}</Table.Cell>
                    <Table.Cell>{client.nid}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                          onClick={() => EditClientModalHandler(client)}
                        >
                          EDIT
                        </button>
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1"
                          onClick={() => DeleteClientModalHandler(client)}
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
          <Create_Client
            visible={AddClientVisible}
            setVisible={setAddClientVisible}
            reset={getClientHandler}
          />
          <Edit_Client
            visible={EditClientVisible}
            setVisible={setEditClientVisible}
            client={SelectedClient}
            reset={getClientHandler}
          />
          <Delete_Client
            visible={DeleteClientVisible}
            setVisible={setDeleteClientVisible}
            client={SelectedClient}
            reset={getClientHandler}
          />
        </div>
      </main>
    </>
  );
}
