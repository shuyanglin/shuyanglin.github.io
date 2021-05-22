/* eslint-disable */ 
const functions = require("firebase-functions");

const axios = require('axios');
const express = require("express");
const cors = require('cors')({origin: true});
const app = express();
require('dotenv').config();

app.use(cors);
app.use(express.static('public')); 
const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`listening at port ${port}.`));

app.get('/api', function (request, response) {

    var km = {
        ride: 0,
        run: 0
    }

    var accessToken = functions.config().access.token;
    var refreshToken = functions.config().refresh.token;
    var clientSecret = functions.config().client.secret;
    var clientID = functions.config().client.id;
    var athleteID = functions.config().athlete.id;
   
    async function makeRequest() {

        const config = {
            method: 'get',
            url: 'https://www.strava.com/api/v3/athletes/'+`${athleteID}`+'/stats',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        }

        // request interceptor
        axios.interceptors.request.use(
            req => {
                req.headers = {
                    'Authorization': `Bearer ${accessToken}`,
                }
                return req;
            },
            error => {
                Promise.reject(error)
            }
        );

        //response interceptor
        axios.interceptors.response.use(
            res => {
                return res;
            },
            error => {
                return Promise.reject(error);
        });

        await axios(config)
            .then(res => {
                km.ride = res.data.all_ride_totals.distance;
                km.run = res.data.all_run_totals.distance;
                console.log(km);

                //response to client with correct access_token
                response.json({
                    message: "status ok",
                    km: km
                })
            })
            .catch(function (error) { 
                
                async function _refreshToken() { 
                    if (error.response.status === 401) {
                        
                        await axios.post('https://www.strava.com/api/v3/oauth/token', {
                            client_id: `${clientID}`,
                            client_secret: `${clientSecret}`,
                            refresh_token: `${refreshToken}`,
                            grant_type: `refresh_token`
                        }).then(res => {
                            accessToken = res.data.access_token;
                            // console.log("got: " + accessToken);
                            
                        }).catch(error => {
                            console.log(error);
                        });   
                    }
                    async function callAPIagain() {
                        await axios.get('https://www.strava.com/api/v3/athletes/'+`${athleteID}`+'/stats')
                                    .then(res => {
                                        km.ride = res.data.all_ride_totals.distance;
                                        km.run = res.data.all_run_totals.distance;
                                        console.log("revived: ", km);
                                    })
                                    .catch(e => console.error(e));

                        //response to client with updated access_token
                        response.json({
                            message: "status ok",
                            km: km
                        })
                    }
                    callAPIagain();       
                }
                _refreshToken();
            });
    }
    makeRequest();
});

exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
