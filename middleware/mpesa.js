/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const axios = require("axios");

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const token_url = process.env.TOKEN_URL;
const express_url = process.env.EXPRESS_URL;
const tillNumber = process.env.TILL_NUMBER;
const passKey = process.env.PASS_KEY;

//KEY FUNCTIONS.
//==============
const passwordEncrypt = (till, key, stamp) => {
    return new Buffer.from(till + key + stamp).toString("base64");
  };
  
const correspodent_string = new Buffer.from(
    consumer_key + ":" + consumer_secret
  ).toString("base64");
  
  function pad2(n) {
    return n < 10 ? "0" + n : n;
  }

  let concat_timestamp = (year, month, day, hour, minutes, seconds) => {
    return year + month + day + hour + minutes + seconds;
  };
  let generate_timestamp = () => {
    var date = new Date();
    let year = date.getFullYear().toString();
    let month = pad2(date.getMonth() + 1);
    let day = pad2(date.getDate());
    let hour = pad2(date.getHours());
    let minutes = pad2(date.getMinutes());
    let seconds = pad2(date.getSeconds());
  
    let timestamp = concat_timestamp(year, month, day, hour, minutes, seconds);
  
    return timestamp;
  };
  
  let customerNames = {};

// CONSTANT VARIABLES
//====================
let item = "random";
//CUSTOM MIDDLEWARES
//==================

module.exports= {
    
 obtainAccessToken : async (req, res, next) => {
  console.log('passKey',passKey)

  console.log("Obtaining token...")
    await axios({
      url: token_url,
      method: "get",
      headers: {
        Authorization: `Basic ${correspodent_string}`,
      },
    })
      .then(async (response) => {
        req.body.access_token = await response.data.access_token;
        console.log("TOKEN 1",req.body.access_token)

        next();
      })
      .catch((error) => {
        res.status(500).json({ message: error });
      });
    
  },
  
   mpesaExpressInt : async (req, res, next) => {
    customerNames = {
      fName: req.body.fName,
      lName: req.body.lName,
    };
  
    console.log("TOKEN 2",req.body.access_token)
    let timestamp = generate_timestamp();
    let password = passwordEncrypt(tillNumber, passKey, timestamp);
    console.log("time",timestamp,"pass",password);

  
    axios({
      url: express_url,
      method: "post",
      headers: {
        Authorization: `Bearer ${req.body.access_token}`,
      },
      data: {
        BusinessShortCode:174379 ,
        // Password: password,
        // Timestamp: timestamp,
        "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIxMDI3MDY0MTI3",
        "Timestamp": "20221027064127",
        TransactionType: "CustomerPayBillOnline",
        Amount: 1000,
        PartyA: 254742734120,
        PartyB: 174379,
        PhoneNumber: 254742734120,
        CallBackURL: "https://prideserver.herokuapp.com/mpesa/confirmation",
         AccountReference: "Daraja Simulation",
        TransactionDesc: `Payment of `,
      },
    })
      .then((response) => {
        if (response.data.ResponseCode == 0) {
          let response_sent = response.data.ResponseCode;
          console.log(`When cont is correct. ${response_sent}`); //Monitoring the response sent.
          next();
        }
      })
      .catch((error) => {
        let msg = JSON.stringify(error);
        console.log(`Axios Backend Error ${msg}`);
        res.json({err:error})

        // res.status(400).json({message:"check your details"}); //I send a message to the front-end which falls under the other category.
      });
  },

  confirmation: async (req, res, next) => {
    console.log("confirmation",req.body);
    try {
      //posting the req to db
    } catch (error) {
      console.log(
        `Woops!The following error occured while communicating with the daraja server =>${error}`
      );
    }
  }
  
}
