import React from "react";
import { Modal } from "@nextui-org/react";
import { updateClient } from "../../../libs/pocketbase";

export default function Edit_Client({ visible, setVisible, client, reset }) {
  const updateClientHandler = async (form) => {
    form.preventDefault();
    const result = await updateClient(
      client.id,
      form.target.fname.value,
      form.target.lname.value,
      form.target.age.value,
      form.target.bgroup.value,
      form.target.address.value,
      form.target.nid.value
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
        aria-labelledby={"Edit Client"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Client"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => updateClientHandler(e)}
          >
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              className="px-2 py-1 border rounded"
              defaultValue={client ? client.firstname : ""}
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              className="px-2 py-1 border rounded"
              defaultValue={client ? client.lastname : ""}
            />
            <input
              type="text"
              name="age"
              placeholder="AGE"
              className="px-2 py-1 border rounded"
              defaultValue={client ? client.age : ""}
            />
            <input
              type="text"
              name="bgroup"
              placeholder="Blood Group"
              className="px-2 py-1 border rounded"
              defaultValue={client ? client.blood_group : ""}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="px-2 py-1 border rounded"
              defaultValue={client ? client.address : ""}
            />
            <input
              type="text"
              name="nid"
              placeholder="Nid"
              className="px-2 py-1 border rounded"
              defaultValue={client ? client.nid : ""}
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
