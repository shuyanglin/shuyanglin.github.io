const axios = require('axios');
const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.static('public')); 
app.listen(8001, () => console.log("listening at port 8001."));

app.get('/api', function (request, response) {
    console.log("got request");

    var km = {
        ride: 1000,
        run: 5000
    }

    var accessToken = process.env.ACCESS_TOKEN;
    console.log("process.env.ACCESS_TOKEN");
    console.log(process.env.ACCESS_TOKEN);
    var refreshToken = process.env.REFRESH_TOKEN;
    var clientSecret = process.env.CLIENT_SECRET;
    var clientID = process.env.CLIENT_ID;
    var athleteID = process.env.ATHLETE_ID;
   
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
                
                async function refreshToken() { 
                    if (error.response.status === 401) {
                        
                        await axios.post('https://www.strava.com/api/v3/oauth/token', {
                            client_id: `${clientID}`,
                            client_secret: `${clientSecret}`,
                            refresh_token: `${refreshToken}`,
                            grant_type: `refresh_token`
                        }).then(res => {
                            accessToken = res.data.access_token;
                            console.log("got: " + accessToken);
                            
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
                refreshToken();
            });
    }
    makeRequest();
});