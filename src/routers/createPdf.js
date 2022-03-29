const express = require("express");
const Ride = require("../models/ride.js");
const auth = require("../middleware/auth");
const pdf = require("pdfkit")
const fs = require("fs")
const path = require("path");
const User = require("../models/user.js");


const generateInvoice = async (doc, data) => {
    doc
        .fontSize(30)
        .text("Invoice");

    doc
        .fontSize(15)
        .text(`Invoice Number: ${data._id}`)
        .text(`Invoice Date: ${new Date().toLocaleDateString()}`)
        .text(`Amount Payed: ${data.price}`)
        .moveDown();
}

const getInvoice = async (req, res) => {
    try {
        const _id = req.params.id;
        const currentUserRide = await Ride.findOne({ _id, owner: req.user._id }).populate("ride_info");
        if (currentUserRide) {
            let doc = new pdf({ margin: 50 });
            doc.pipe(res);

            await generateInvoice(doc, currentUserRide);

            doc.end();
        }
        else {
            res.status(404).send("ride not found!");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

}


const router = new express.Router();

router.get("/invoice/:id", auth, getInvoice);

module.exports = router;