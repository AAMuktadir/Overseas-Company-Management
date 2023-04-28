import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import { Table } from "@nextui-org/react";
import { getCompany } from "../libs/pocketbase";

//modals
import Create_Company from "../components/Modals/Create_Modals/Create_Company";
import Delete_Company from "../components/Modals/Delete_Modals/Delete_Company";

export default function Companies() {
  const [isLoading, setLoading] = useState(false);
  //modal states
  const [Companies, setCompanies] = useState(null);
  const [AddCompanieVisible, setAddCompanieVisible] = useState(false);
  const [DeleteCompanieVisible, setDeleteCompanieVisible] = useState(false);
  const [SelectedCompanie, setSelecetedCompanie] = useState(null);
  const router = useRouter();
  const user = useUser();

  //modal functions

  //TODO - parameter Company
  const DeleteCompanieModalHandler = (company) => {
    setSelecetedCompanie(company);
    setDeleteCompanieVisible(true);
  };

  const getCompanyHandler = async () => {
    const result = await getCompany();
    // @ts-ignore
    setCompanies(result);
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
        <title>Companies</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Companies Information"}>
          <button
            className="bg-green-700 text-white px-2 py-2 rounded"
            onClick={() => setAddCompanieVisible(true)}
          >
            ADD Company
          </button>
        </Header>
        <div className="p-5">
          <h1>Here we can see all the Companies</h1>
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
              <Table.Column>COUNTRY</Table.Column>
              <Table.Column>OPTION</Table.Column>
            </Table.Header>
            <Table.Body>
              {Companies &&
                Companies.map((company) => (
                  <Table.Row key={company.id}>
                    <Table.Cell>{company.name}</Table.Cell>
                    <Table.Cell>{company.country}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1"
                          onClick={() => DeleteCompanieModalHandler(company)}
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
          <Create_Company
            visible={AddCompanieVisible}
            setVisible={setAddCompanieVisible}
            reset={getCompanyHandler}
          />
          <Delete_Company
            visible={DeleteCompanieVisible}
            setVisible={setDeleteCompanieVisible}
            company={SelectedCompanie}
            reset={getCompanyHandler}
          />
        </div>
      </main>
    </>
  );
}
