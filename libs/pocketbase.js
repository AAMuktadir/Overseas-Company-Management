import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090/");

export const getAgents = async ()=>{
    try {
        // you can also fetch all records at once via getFullList
        const records = await pb.collection('agents').getFullList({
          sort: '-created',
        });
        
            return records
            } catch (e) {
              console.log(e);
            }
}

export const updateAgent = async (id,name,address,contact,passclient,failedclient,clientque)=>{
    // example update data
try{
    const data = {
    "name": name,
    // "address": address,
    // "contact": contact,
    // "passedclient": passclient,
    // "failedclient": failedclient,
    // "clientqueue": clientque
};
const record = await pb.collection('agents').update(id, data);
return record;
}
catch(e){
    console.log(e);
}
}
