import { createClient } from "@sanity/client";



export const client =  createClient({

  projectId: "u8951j01", // find this at manage.sanity.io or in your sanity.json
  apiVersion: "2023-10-11",
  dataset: "production", // this is from those question during 'sanity init'

});
