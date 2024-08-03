import { xml_text } from "jsr:@libs/xml/parse";
import { csv, mod, sqlite } from "./deps.ts";

type returnedId = number[]

type trkPt = {
  "@lat": string,
  "@lon": string,
  "ele": string,
  "time": string
}

interface MyXML extends xml_text {
  trk: {
    trkseg:{
      trkpt:trkPt[]
    }
  }; 
}

const db = new sqlite.DB("./strava.db");

const f = await Deno.open("./activities.csv");
//1468519748
  for await (const obj of csv.readCSVObjects(f)) {
    if(Date.parse(obj['Activity Date']).toString() > '1462752008' && Date.parse(obj['Activity Date']).toString() < '1468519748'){
      // const id: sqlite.Row = db.query("INSERT INTO rides (name) VALUES (?) RETURNING ID", [obj['Activity Name']]);
      // const rideId = id[0] as returnedId
      const customXml: MyXML = mod.parse(await Deno.readTextFile(obj['Filename']))["~children"][0] as MyXML
      for (const point of customXml["trk"].trkseg.trkpt){
        console.log(point['@lat'], point['@lon'])
        // db.query("INSERT INTO coordinates (latitude, longitude, elevation, time, ride_id) VALUES (?, ?, ?, ?, ?)", [point["@lat"], point["@lon"], point.ele, point.time, rideId[0]]);
      }
      console.log(obj['Activity Name'] + ' - ' + obj['Filename']);
    }
  }

db.close();
f.close();

Deno.exit(0)