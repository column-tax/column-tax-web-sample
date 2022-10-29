const express = require('express')
var cors = require('cors')
var axios = require('axios');
const app = express()
const port = 3003

app.use(cors())

// The client id and secret provided by column tax. These keys should only exist in the
// backend for security purposes. Do not use put these in any frontend applications.
const clientId = '<client_id>'
const clientSecret = '<client_secret>'

const columnUrl = "https://sandbox.columnapi.com/v1/exp/initialize_tax_filing"

// An endpoint to retrieve a user token from column tax. This token will be used in the
// frontend application to open to column tax SDK.
app.get('/token', (req, res) => {
    let apiKey = `${clientId}:${clientSecret}`;
    let auth = Buffer.from(apiKey).toString('base64')

    // An example user with mock data
    let user = {
        user_identifier: "unique_user_identifier",
        user: {
            email: "test@test.com",
        }
    }

    const body = JSON.stringify(user)

    const headers = {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
    };

    axios.post(columnUrl, body, {headers})
        .then((body) => {
            res.json({"token": body.data["user_token"]})
        })
        .catch((error) => {
            res.send("Bad API Keys or Wrong URL")
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
