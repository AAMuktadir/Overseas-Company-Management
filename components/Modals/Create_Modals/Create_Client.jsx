import React from "react";
import { Modal } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";
import { createClient } from "../../../libs/pocketbase";
import { getAgents } from "../../../libs/pocketbase";

export default function Create_Client({ visible, setVisible, reset }) {
  const createClientHandler = async (form) => {
    form.preventDefault();
    const result = await createClient(
      form.target.fname.value,
      form.target.lname.value,
      form.target.age.value,
      form.target.bgroup.value,
      form.target.addr.value,
      form.target.nid.value,
      form.target.agent.value
    );
    if (result) {
      reset();
      setVisible(false);
    }
  };
  const [Agents, setAgents] = useState(null);
  const getAgentsHandler = async () => {
    const result = await getAgents();
    console.log(result);
    // @ts-ignore
    setAgents(result);
  };
  useEffect(() => {
    getAgentsHandler();
  }, []);
  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Client"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Client"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createClientHandler(e)}
          >
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="bgroup"
              placeholder="Blood Group"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="addr"
              placeholder="Address"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="nid"
              placeholder="Nid Number"
              className="px-2 py-1 border rounded"
            />
            <div className="">
              <select name="agent" defaultValue={"Agents"}>
                <option value="Agents" disabled>
                  Agents
                </option>
                {Agents
                  ? Agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <input
              type="submit"
              className="bg-green-700 text-white px-2 py-1 mt-5"
            />
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
