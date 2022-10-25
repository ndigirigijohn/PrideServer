/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const axios = require("axios");

const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const token_url = process.env.TOKEN_URL;
const express_url = process.env.EXPRESS_URL;
let tillNumber = process.env.TILL_NUMBER;
let passKey = process.env.PASS_KEY;

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
let timestamp = generate_timestamp();
let password = passwordEncrypt(tillNumber, passKey, timestamp);
//CUSTOM MIDDLEWARES
//==================

module.exports= {
    
 obtainAccessToken : async (req, res, next) => {
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
  
    axios({
      url: express_url,
      method: "post",
      headers: {
        Authorization: `Bearer ${req.body.access_token}`,
      },
      data: {
        BusinessShortCode: 174379,
        Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIxMDI1MTY0OTE0",
        Timestamp: "20221025164914",
        TransactionType: "CustomerPayBillOnline",
        Amount: 1000,
        PartyA: 254742734120,
        PartyB: 174379,
        PhoneNumber: 254742734120,
        CallBackURL: "https://a101-41-80-96-181.ngrok.io",
         AccountReference: "Daraja Simulation",
        TransactionDesc: `Payment of `,
      },
    })
      .then((response) => {
        console.log(response);
        //THIS IS ONLY CALLED WHEN THE DAMN PROMISE IS FULFILLED.
        // Ni either a status of 0 ama unalengwa. Of which ukilengwa inahandliwa kama error.Since the promise fails to fulfill.
        if (response.data.ResponseCode == 0) {
          let response_sent = response.data.ResponseCode;
          console.log(`When cont is correct. ${response_sent}`); //Monitoring the response sent.
          res.status(200).json(response_sent);
        }
      })
      .catch((error) => {
        //THIS IS CALLED WHEN THE PROMISE THAT AXIOS MADE IS REJECTED.PART & PARCEL OF ASYNCHRONOUS PROGRAMMING.
        /* Happens as a result of the promise not being fulfilled.By default that is how axios behaves incase the request doesn't go through.
        To avoid all this complexities of handling the errors,just do the right thing from the word go. I mean ensuring the phone number is correctly put.
        Such that to the front end we shall only be sending successful results.Its the easiest thing to do to avoid this headache of handling and transmiitting 
        error to the front-end #FORM VALIDATION IS THE REMEDUE TO ALL THIS HEADACHE but it was a nice ride all the same. */
  
        // AXIOS ERROR DESTRUCTURING - Happens as a result of non_2xx status being returned.
        // ==========================
        // The error is a very big object and it has its categories.
        let msg = JSON.stringify(error);
        console.log(`Axios Backend Error ${msg}`);
        // let  {message,code,name} = error;
        // console.log(`This is from the catch error ${name} : ${code} : ${message}`);
        let client_message =
          "Error!Ensure you have filled the contact details correctly.";
        res.status(400).json(client_message); //I send a message to the front-end which falls under the other category.
      });
  },

  confirmation: async (req, res, next) => {
    console.log("confirmation",req.body);
    try {
      // PRIMARY DETAILS
      //=================
      let mainBody = req.body.Body.stkCallback;
      let strBody = JSON.stringify(mainBody);
      console.log(`Results are as follows : ${strBody}`);
  
      let { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } =
        mainBody;
  
      if (ResultCode == 0) {
        let { CallbackMetadata: clientDetails } = mainBody;
  
        let amountTransacted = clientDetails.Item[0].Value;
        let mpesaReceiptNumber = clientDetails.Item[1].Value;
        let tillBalance = clientDetails.Item[2].Value;
        let transactionDate = clientDetails.Item[3].Value;
        let phoneNumber = clientDetails.Item[4].Value;
        let fName = customerNames.fName;
        let lName = customerNames.lName;
  
        // eslint-disable-next-line no-unused-vars
        let tableDetails = {
          fName,
          lName,
          amountTransacted,
          mpesaReceiptNumber,
          transactionDate,
          tillBalance,
          phoneNumber,
        };
        console.log(tableDetails);
      //   const row = await TableDetail.create(tableDetails);
      //   await row.save();
      //   console.log(`Data save successfully to the DB as follows => ${row}`);
      } else {
        let errorMessage = `Transaction failed due to => ${ResultDesc}`;
        console.log(errorMessage);
      }
    } catch (error) {
      console.log(
        `Woops!The following error occured while communicating with the daraja server =>${error}`
      );
    }
  }
  
}
