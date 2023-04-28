import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Loading from "../components/Loading/Loading";
import { useUser } from "../context/UserContextProvider";
import Header from "../components/Layout/header";
import Link from "next/link";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Overseas_CSE470</title>
        <meta name="description" content="Sayem Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Dashboard"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <h1 className="text-center text-[32px] font-medium">Home</h1>
        </div>
        <div className="grid grid-cols-3 gap-10 px-20 text-[24px]  text-center font-bold">
          <Link rel="stylesheet" href="/ClientApproval">
            <div className="w-[300px] h-[200px] bg-gray-200 pt-20">
              <p className="">Client approval</p>
            </div>
          </Link>
          <Link rel="stylesheet" href="/passportValidity">
            <div className="w-[300px] h-[200px] bg-gray-200 pt-20">
              <p className="">Passport validity</p>
            </div>
          </Link>
          <Link rel="stylesheet" href="/policeClearance">
            <div className="w-[300px] h-[200px] bg-gray-200 pt-20">
              <p className="">Police Clearance</p>
            </div>
          </Link>
          <Link rel="stylesheet" href="/medicalValidity">
            <div className="w-[300px] h-[200px] bg-gray-200 pt-20">
              <p className="">Medical validity</p>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
