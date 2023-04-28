import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import { Table } from "@nextui-org/react";
import { getClient } from "../libs/pocketbase";
import { updateClientMedical } from "../libs/pocketbase";

export default function PoliceClearance() {
  const [isLoading, setLoading] = useState(false);
  //modal states
  const [Clients, setClients] = useState(null);
  const router = useRouter();
  const user = useUser();

  //modal functions
  const EditClientModalHandler = async (client) => {
    const result = await updateClientMedical(client);
    if (result) {
      getClientHandler();
    }
  };

  const getClientHandler = async () => {
    const result = await getClient();
    // @ts-ignore
    setClients(result);
  };

  const getIsValid = (isreject) => {
    if (isreject) {
      return "Approved";
    } else {
      return "notApproved";
    }
  };

  useEffect(() => {
    getClientHandler();
  }, [Clients]);

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Clients</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Medical Status"}></Header>
        <div className="p-5">
          <h1>Here we can see Medical Status of Clients</h1>
        </div>
        <div className="p-5">
          <Table
            aria-label="Clients"
            css={{
              height: "auto",
              minWidth: "100%",
              dropShadow: "none",
            }}
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>NID</Table.Column>
              <Table.Column>Medical Status</Table.Column>
              <Table.Column>OPTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {Clients &&
                Clients.map((client) => (
                  <Table.Row key={client.id}>
                    <Table.Cell>
                      {client.firstname + " " + client.lastname}
                    </Table.Cell>
                    <Table.Cell>{client.nid}</Table.Cell>
                    <Table.Cell>
                      {getIsValid(client.medical_status) == "Approved" ? (
                        <div className="text-green-500">PASSED</div>
                      ) : (
                        <div className="text-red-500">FAILED</div>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {getIsValid(client.medical_status) ==
                      "Approved" ? null : (
                        <div className="flex gap-3">
                          <button
                            className="bg-blue-600 text-white px-2 py-1 rounded"
                            onClick={() => EditClientModalHandler(client.id)}
                          >
                            Approve
                          </button>
                        </div>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </main>
    </>
  );
}
