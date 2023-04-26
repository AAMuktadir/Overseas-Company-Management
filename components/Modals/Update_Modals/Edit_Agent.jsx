import React from "react";
import { Modal } from "@nextui-org/react";
import { updateAgent } from "../../../libs/pocketbase";

export default function Edit_Agent({ visible, setVisible, agent, reset }) {
  const updateAgentHandler = async (form) => {
    form.preventDefault();
    const result = await updateAgent(
      agent.id,
      form.target.name.value,
      form.target.address.value,
      form.target.contact.value
    );
    if (result) {
      reset();
      setVisible(false);
    }
  };
  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Edit Agent"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Agent"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => updateAgentHandler(e)}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-1 border rounded"
              defaultValue={agent ? agent.name : ""}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="px-2 py-1 border rounded"
              defaultValue={agent ? agent.address : ""}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              className="px-2 py-1 border rounded"
              defaultValue={agent ? agent.contact : ""}
            />
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
