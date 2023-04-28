import React from "react";
import { Modal } from "@nextui-org/react";
import { createCompany } from "../../../libs/pocketbase";

export default function Create_Company({ visible, setVisible, reset }) {
  const createCompanyHandler = async (form) => {
    form.preventDefault();
    const result = await createCompany(
      form.target.name.value,
      form.target.country.value
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
        aria-labelledby={"Create Company"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Company"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createCompanyHandler(e)}
          >
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              className="px-2 py-1 border rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
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
