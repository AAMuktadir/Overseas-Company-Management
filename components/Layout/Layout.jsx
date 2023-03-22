import React from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { useUserLogout } from "../../context/UserContextProvider";
import Image from "next/image";
import { Dropdown, Avatar, Tooltip, Divider } from "@nextui-org/react";
import { useUser } from "../../context/UserContextProvider";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link";
import { pb } from "../../libs/pocketbase";

export default function Layout({ children }) {
  const logout = useUserLogout();
  const router = useRouter();
  const user = useUser();

  const onSelectHandler = (e) => {
    // @ts-ignore
    if (e === "logout") logout();
  };

  if (router.pathname === "/login") {
    return (
      <div className="font-hind">
        {children}
        <ToastContainer />
      </div>
    );
  }
  return (
    <>
      <div className="h-screen w-full flex font-hind">
        <div
          className="sidebar h-full lg:w-1/6 md:w-1/4 w-0 flex flex-col justify-between bg-no-repeat bg-cover bg-center bg-blend-overlay bg-white bg-opacity-90"
          style={{ backgroundImage: "url('/img/out.png')" }}
        >
          <Link
            href={"/"}
            className="w-full flex justify-center items-center flex-col p-3"
          >
            <Image
              src={"/img/logo.png"}
              width={80}
              height={80}
              alt={"sayemlogo"}
            />
            <span className="text-[18px] font-light mt-3">
              CSE470: Overseas
            </span>
          </Link>
          <ul className="mt-5 h-full px-4">
            <li className="border-b border-gray-300">
              <Link
                href={"/"}
                className="py-2 flex justify-between items-center"
              >
                <span>Dashboard</span>
                <GrFormNext />
              </Link>
            </li>
            <li className="">
              <Link
                href={"/agents"}
                className="py-2 flex justify-between items-center"
              >
                <span>Clients</span>
                <GrFormNext />
              </Link>
            </li>

            <li className="">
              <Link
                href={"/agents"}
                className="py-2 flex justify-between items-center"
              >
                <span>Agents</span>
                <GrFormNext />
              </Link>
            </li>

            <li className="">
              <Link
                href={"/agents"}
                className="py-2 flex justify-between items-center"
              >
                <span>Companies</span>
                <GrFormNext />
              </Link>
            </li>
          </ul>
          <div className=" border-t border-gray-300 h-24 flex justify-center">
            <Dropdown>
              <Dropdown.Trigger>
                <div className="px-5 w-full profile cursor-pointer flex justify-between items-center">
                  <div className="flex flex-row justify-start items-center gap-2">
                    {/* <Avatar
                      // @ts-ignore
                      text={
                        user
                          ? user.name[0]
                            ? user.name[0].toUpperCase()
                            : ""
                          : ""
                      }
                      src={
                        user
                          ? // @ts-ignore
                            pb.getFileUrl(user, user.avatar, {
                              thumb: "100x250",
                            })
                          : ""
                      }
                      // color={"gradient"}
                      textColor="white"
                      size={"md"}
                      // squared
                    /> */}
                    <span className="text-[18px] text-center font-semibold text-green-600">
                      {/* {user
                        ? // @ts-ignore
                          user.name
                        : ""} */}
                      Account
                    </span>
                  </div>
                  <GrFormNext />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Menu
                // color="primary"
                textColor="default"
                aria-label="Avatar Actions"
                onAction={onSelectHandler}
              >
                <Dropdown.Item textValue="Profile" key="Profile">
                  <span className="font-hind">Profile</span>
                </Dropdown.Item>

                <Dropdown.Item
                  textValue="logout"
                  key="logout"
                  color="error"
                  withDivider
                >
                  <span className="font-hind">Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <ToastContainer />
    </>
  );
}
