import { csv } from "./deps.ts";
import { mod } from "./deps.ts"

const f = await Deno.open("./activities.csv");

  for await (const obj of csv.readCSVObjects(f)) {
    if(Date.parse(obj['Activity Date']).toString() > '1462752008' && Date.parse(obj['Activity Date']).toString() < '1462838782'){
      console.log(mod.parse(await Deno.readTextFile(obj['Filename']))["~children"][0].trk)
      console.log(obj['Activity Name'] + ' - ' + obj['Filename']);
    }
  }


f.close();