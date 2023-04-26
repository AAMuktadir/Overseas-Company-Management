import React from "react";
import { Modal } from "@nextui-org/react";
import { createAgent } from "../../../libs/pocketbase";

// name, departement, designation, age

export default function Create_Agent({ visible, setVisible, reset }) {
  const createAgentHandler = async (form) => {
    form.preventDefault();
    const result = await createAgent(
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
        aria-labelledby={"Create Agent"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Agent"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createAgentHandler(e)}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              className="px-2 py-1 border rounded"
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
