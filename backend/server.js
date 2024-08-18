const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises; // Use fs.promises for async file operations

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = 3000;
// const dataFilePath = './data.json';
// const nftIDFilePath = './nftID.json';
// const walletFilePath = './wallet.json';

//NFT selected by user
let nftIDs = [];
let walletInfo = null;

//NFT selected by user
app.post("/postNFT", (req, res) => {
    const { nftID } = req.body; // Extract nftID from the request body
    console.log("Request Body: ", req.body); // Debugging step
    console.log("nftID: ", nftID); // Debugging step

    if (nftID === undefined) {
        return res.status(400).send({ message: "NFT ID is missing or undefined" });
    }

    try {
        // Add the new NFT ID to the global array
        nftIDs.push(nftID);

        // Send a success response
        res.status(200).send({ message: "NFT ID received successfully" });
    } catch (err) {
        console.log("Error processing the request: ", err);
        res.status(500).send({ message: "Failed to process data" });
    }
});

app.post("/postWallet", (req, res) => {
    const { walletAddress } = req.body;
    console.log("Request Body: ", req.body);
    console.log("Wallet: ", walletAddress);

    try {
        // Store the new wallet information in the global variable
        walletInfo = walletAddress;

        // Send a success response
        res.status(200).send({ message: "Wallet information received successfully" });
    } catch (err) {
        console.log("Error processing the request: ", err);
        res.status(500).send({ message: "Failed to process data" });
    }
});


app.get("/getNFT", (req, res) => {
    try {
        // Wrap the nftIDs array in an object
        res.status(200).json({ nftIDs });
    } catch (err) {
        console.log("Error processing the request: ", err);
        res.status(500).send({ message: "Failed to retrieve data" });
    }
});

app.get("/getWalletAddress", (req, res) => {
    try {
        // Wrap the walletInfo object in another object
        res.status(200).json({ walletInfo });
    } catch (err) {
        console.log("Error processing the request: ", err);
        res.status(500).send({ message: "Failed to retrieve data" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});