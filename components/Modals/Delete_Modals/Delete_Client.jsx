import React from "react";
import { Modal } from "@nextui-org/react";
import { deleteClient } from "../../../libs/pocketbase";

export default function Delete_Client({ visible, setVisible, client, reset }) {
  const confirmHandler = async () => {
    const result = await deleteClient(client.id);
    console.log(result);
    if (result) {
      reset();
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Delete Client"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Delete Client"}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <span>
              Do yout want to delete{" "}
              {client ? client.firstname + " " + client.lastname : ""}?
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-2 py-1 bg-red-600 text-white rounded"
            onClick={confirmHandler}
          >
            Yes
          </button>
          <button
            className="px-2 py-1 bg-gray-600 text-white rounded"
            onClick={() => setVisible(false)}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
