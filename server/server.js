//init all the modules we need
const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const dotenv = require('dotenv');
dotenv.config();


const app = express(); //its an express app after all

app.use(cors()); //Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.

//save port number and host
const port = process.env.PORT; //4000;
const host = process.env.HOST; //localhost;

//init notion client 
const notion = new Client({ auth: "secret_7ESs8DBns0qRQtkYtSyfaVBRNTerZ6wSN6MPpBNrroR" });

//POST request
//post name, number
//functionality: add to database
//localhost:4000/add

//where u want the app to live. .post means creating a new thing
app.post("/submitFormToNotion", jsonParser, async (req, res) => { //response and request
    //req is HTTP request object, get the query, params, body, etc
    //res is HTTP response object, send the response, set the status, etc
    
    const name = req.body.name;

    try{
        const blockId = '63499a6f3fcc4960a6f7c5b985e9bb06';
        const response = await notion.blocks.children.append({
            block_id: blockId,
            children: [
              {
                "paragraph": {
                  "rich_text": [
                    {
                      "text": { "content": name }
                    }
                  ]
                }
              }
            ]
            });

    console.log(response);
    console.log("success");

    }catch(error){
        console.log(error);
    }
});

    

app.listen(port,host, () => {
  console.log(`Running on http://${host}:${port}`);
});