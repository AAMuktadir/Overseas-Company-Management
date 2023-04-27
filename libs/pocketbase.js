import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090/");

//...................For Agents...............

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

//Update Agents
export const updateAgent = async (id, name, address, contact) => {
  // example update data
  try {
    const data = {
      name: name,
      address: address,
      contact: contact,
    };
    const record = await pb.collection("agents").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Agent Creation
export const createAgent = async (name, address, contact) => {
  try {
    const data = {
      name: name,
      address: address,
      contact: contact,
      passedclient: 0,
      failedclient: 0,
    };

    const record = await pb.collection("agents").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete a single Agent
export const deleteAgent = async (id) => {
  try {
    await pb.collection("agents").delete(id);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//............For Client.................
// create Client
export const createClient = async (
  firstname,
  lastname,
  age,
  blood_group,
  address,
  nid,
  agent
) => {
  try {
    const data = {
      firstname: firstname,
      lastname: lastname,
      age: age,
      blood_group: blood_group,
      address: address,
      nid: nid,
      agent: agent,
    };

    const record = await pb.collection("clients").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Update Agents
export const updateClient = async (
  id,
  firstname,
  lastname,
  age,
  blood_group,
  address,
  nid
) => {
  // example update data
  try {
    const data = {
      firstname: firstname,
      lastname: lastname,
      age: age,
      blood_group: blood_group,
      address: address,
      nid: nid,
    };

    const record = await pb.collection("clients").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete a single Client
export const deleteClient = async (id) => {
  try {
    await pb.collection("clients").delete(id);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

//fetching all Client
export const getClient = async () => {
  try {
    const records = await pb.collection("clients").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};
