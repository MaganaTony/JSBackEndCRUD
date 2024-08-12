import { json } from "express";
//The 'body-parser-xml' library is used in this file to parse the body of the request in XML format.
import BodyParserXml from "body-parser-xml";
//The 'body-parser' library is used to parse the body of the request.
import bodyParser from "body-parser";

BodyParserXml(bodyParser) //function is used to parse the body of the request in XML format

export const jsonParser = json({ limit: "500kb"}) //function parses the body of the request in JSON format.
export const xmlParser = bodyParser.xml() //function parses the body of the request in XML format.

//NOTE: This file is a middleware that parses the body of the request in JSON and XML format.
