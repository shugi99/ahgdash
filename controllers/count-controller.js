const mongoose = require("mongoose");
const HttpError = require("../config/http-error");
const axios = require("axios");

// Enta DB
const entaDB = mongoose.createConnection(`${process.env.ENTA_DB_URI}`);
const EntaListing = entaDB.collection("listings");
const EntaUser = entaDB.collection("users");

// RB DB
const rentalBeeDB = mongoose.createConnection(
  `${process.env.RENTAL_BEE_DB_URI}`
);
const RBListing = rentalBeeDB.collection("listings");
const RBProperties = rentalBeeDB.collection("properties");
const RBUser = rentalBeeDB.collection("users");

const APP_ID = "403655424133013";
const APP_SECRET = "279cd4f5445b65028866c503ee3ce25e";
const APP_NAME = "entaPhilippines";
const queryToken =
  "EAAFmSQDO27wBAP7BCbZB5fZCWmq23wSnjD9EnjZA4MmYqAFhJNWIjRQoNbGkiyddCsgH3ZBQiJmN0j2VYLEwleLQrHQSdpqdKfLxGLxEXSmYm3ovlwVF4aECcyftBaaedLluXm0Brdt8dhJAtXUGZCGQ3p37GP6T8GRTwgU0064rTQZC6IOkCf18yG9qdOJAvMrl9C5ZAr13n5bMP5ct3rw";
const FACEBOOK_GRAPH_URL = "https://graph.facebook.com/v11.0";

const listingsAndUsersCount = async (req, res, next) => {
  let entaListingsCount;
  let entaUsersCount;
  let rentalBeeListingsCount;
  let rentalBeeUsersCount;

  // ENTA
  // try {
  //   entaListingsCount = await EntaListing.countDocuments();
  // } catch (err) {
  //   console.log(err);
  //   const error = new HttpError("Failed to retrieve Enta listing count", 500);
  //   return next(error);
  // }
  // try {
  //   entaUsersCount = await EntaUser.countDocuments();
  // } catch (err) {
  //   console.log(err);
  //   const error = new HttpError("Failed to retrieve Enta user count", 500);
  //   return next(error);
  // }

  // // RB
  // try {
  //   rentalBeeListingsCount = await RBListing.countDocuments();
  //   rentalBeePropertyCount = await RBProperties.countDocuments();
  //   totalRentalBeeListings = rentalBeeListingsCount + rentalBeePropertyCount;
  // } catch (err) {
  //   console.log(err);
  //   const error = new HttpError(
  //     "Failed to retrieve Rental Bee listing count",
  //     500
  //   );
  //   return next(error);
  // }
  // try {
  //   rentalBeeUsersCount = await RBUser.countDocuments();
  // } catch (err) {
  //   console.log(err);
  //   const error = new HttpError(
  //     "Failed to retrieve Rental Bee user count",
  //     500
  //   );
  //   return next(error);
  // }
  try {
    const getEntaLikes = async () => {
      // const res = await axios.get(
      //   `https://graph.facebook.com/${APP_NAME}?access_token=${APP_ID}|${APP_SECRET}&fields=name,fan_count`
      // );
      // console.log(res);
      // const res = await axios.get(
      //   "https://graph.facebook.com/119076838123350?access_token=EAAFmSQDO27wBAP7BCbZB5fZCWmq23wSnjD9EnjZA4MmYqAFhJNWIjRQoNbGkiyddCsgH3ZBQiJmN0j2VYLEwleLQrHQSdpqdKfLxGLxEXSmYm3ovlwVF4aECcyftBaaedLluXm0Brdt8dhJAtXUGZCGQ3p37GP6T8GRTwgU0064rTQZC6IOkCf18yG9qdOJAvMrl9C5ZAr13n5bMP5ct3rw&fields=name,fan_count"
      // );
      // console.log(res);
    };
    getEntaLikes();
    const getAppAccessToken = async () => {
      const res = await axios.get(`https://graph.facebook.com/oauth/access_token
      ?client_id=${APP_ID}
      &client_secret=${APP_SECRET}
      &grant_type=client_credentials`);
      if (!response.ok) {
        throw new Error("App access token failed");
      }
      return res.data.acess_token;
    };
    // const debugToken = async (appAccessToken, token) => {
    //   const res = await axios.get(
    //     `${FACEBOOK_GRAPH_URL}/debug_token?input_token=${token}&access_token=${appAccessToken}`
    //   );

    //   return res.data.scopes;
    // };
    const appAccessToken = getAppAccessToken();
    const scopes = debugToken(appAccessToken, queryToken);
  } catch (error) {}
  res.json({
    // entaListingsCount,
    // entaUsersCount,
    // rentalBeeUsersCount,
    // rentalBeeListingsCount,
    // rentalBeePropertyCount,
    // totalRentalBeeListings,
    // // res,
  });
};

exports.listingsAndUsersCount = listingsAndUsersCount;
