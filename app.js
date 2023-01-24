


const express = require('express');
const app = express();
const port = process.env.PORT;
// Access the form data
app.use(express.urlencoded());
// For acessing api
const https = require('node:https');
// Mailchip servers
const mailchimp = require("@mailchimp/mailchimp_marketing");
const listId = "758b2833c2";
mailchimp.setConfig({
    apiKey: "3dd0812b21979ea2cd53ce4df9ee8831-us21",
    server: "us21"
})

// Connects the css file
app.use(express.static(__dirname + '/public'));
// Sends the html file to the browser
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/signup.html');
})


// Once the user hits submit on the form the post method can use that data and create a mailchimp contact
app.post('/', (req, res)=> {

  const firsName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailAdress = req.body.email;

// creates an object of the contact and pushes it to the mailchimp server
  async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
         email_address:  emailAdress,
         status: "subscribed",
         merge_fields: {
            FNAME: firsName,
            LNAME: lastName
         }
      });
      // If the subscription was successful itll send them to the success page
      res.sendFile(__dirname + "/success.html");
      console.log(`The contacts is ${response.status}.`);
  }
  // Once the run function is called. It catched any failures and redirects them 
  run().catch(e => res.sendFile(__dirname + "/failure.html"));

})









app.listen(port || 3000,()=>{
    console.log(`Listening on port ${port}.`);
})

// async function run() {
//     const response = await mailchimp.ping.get();
//     console.log(response);
// }

// run();



// API key
// 3dd0812b21979ea2cd53ce4df9ee8831-us21

// Audience or List ID
// 758b2833c2