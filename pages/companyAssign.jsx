import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import { Table, Badge } from "@nextui-org/react";
import { getCompany } from "../libs/pocketbase";
import { getClient } from "../libs/pocketbase";
import { clientAssignUpdate } from "../libs/pocketbase";

export default function CompanyAssign() {
  const [isLoading, setLoading] = useState(false);

  //modals
  const [companies, setCompanies] = useState(null);
  const [Clients, setClients] = useState(null);
  const [allClients, setAllClients] = useState(null);
  const [SelectedCompany, setSelectedCompany] = useState(null);
  const router = useRouter();
  const user = useUser();

  const getCompanyHandler = async () => {
    const result = await getCompany();
    setCompanies(result);
  };

  const companyChangeHandler = async (companyid) => {
    // console.log(companyid);
    getCompanyHandler();
    const scompany = companies.find((company) => company.id == companyid);
    setSelectedCompany(scompany);
    setClients(scompany.expand?.client);
    const result2 = await getClient();
    setAllClients(result2);
  };

  const registerClientHandler = async (form) => {
    form.preventDefault();
    console.log("AAMuktadir");
    let cliT = [];
    console.log(form.target.client);
    if (Clients) {
      const result = Clients.find((cli) => cli.id == form.target.client.value);
      if (result) {
        console.log("do not submit");
      } else {
        // console.log(" submit");
        // console.log(client);
        Clients.forEach((s) => {
          cliT.push(s.id);
        });
        cliT.push(form.target.client.value);
        //todo submit
        registerClientSubmit(cliT);
      }
    } else {
      cliT.push(form.target.client.value);
      //todo submit
      registerClientSubmit(cliT);
    }
  };

  const registerClientSubmit = async (s) => {
    // console.log(s);
    const result = await clientAssignUpdate(SelectedCompany.id, s);
    if (result) {
      companyChangeHandler(SelectedCompany.id);
    }
  };

  useEffect(() => {
    getCompanyHandler();
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
        <title>Company Assign to Client</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Company Assign to Client"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <div className="">
            <select
              onChange={(e) => companyChangeHandler(e.target.value)}
              className="px-2 py-1 mb-5"
            >
              <option value="Select Course">Select Company</option>
              {companies &&
                companies.map((company) => (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            <div className="">
              {SelectedCompany && (
                <div className="text-xl font-semibold my-5">
                  {SelectedCompany.name}
                </div>
              )}
            </div>
            {allClients && (
              <form className="" onSubmit={(e) => registerClientHandler(e)}>
                <select
                  className="px-2 py-1 mb-5"
                  defaultValue={"Select Client"}
                  name="client"
                >
                  <option value="Select Client">Select Client</option>
                  {allClients.map((client) => (
                    <option value={client.id} key={client.id}>
                      {client.firstname + " " + client.lastname}
                    </option>
                  ))}
                </select>
                <input
                  type="submit"
                  value={"Register"}
                  className="px-2 py-1 bg-green-500 text-white rounded ml-5"
                />
              </form>
            )}
            <Table
              aria-label="Company"
              headerLined
              lined
              css={{
                height: "auto",
                minWidth: "100%",
                dropShadow: "none",
              }}
            >
              <Table.Header>
                <Table.Column>CLIENT</Table.Column>
                {/* <Table.Column>AGE</Table.Column>
                <Table.Column>NID</Table.Column> */}
              </Table.Header>
              <Table.Body>
                {" "}
                console.log(result);
                {Clients &&
                  Clients.map((client) => (
                    <Table.Row key={client.id} value={client.id}>
                      <Table.Cell>
                        {client.firstname + " " + client.lastname}
                      </Table.Cell>
                      {/* <Table.Cell>{client.age}</Table.Cell>
                      <Table.Cell>{client.nid}</Table.Cell> */}
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
