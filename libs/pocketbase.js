import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090/");

export const getAgents = async () => {
  try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection("agents").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

export const updateAgent = async (
  id,
  name,
  address,
  contact,
  passclient,
  failedclient,
  clientque
) => {
  // example update data
  try {
    const data = {
      name: name,
      // "address": address,
      // "contact": contact,
      // "passedclient": passclient,
      // "failedclient": failedclient,
      // "clientqueue": clientque
    };
    const record = await pb.collection("agents").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

// create Client
export const createClient = async (
  firstname,
  lastname,
  age,
  agent,
  address,
  nid
) => {
  try {
    const data = {
      firstname: firstname,
      lastname: lastname,
      age: age,
      agent: agent,
      address: address,
      nid: nid,
    };

    const record = await pb.collection("clients").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};
