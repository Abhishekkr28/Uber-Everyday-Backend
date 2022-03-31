const express = require("express");
const Ride = require("../models/ride.js");
const auth = require("../middleware/auth");
const pdf = require("pdfkit");
const fs = require("fs");
const path = require("path");
const User = require("../models/user.js");


function generateHeader(doc) {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Uber Everyday", 50, 57)
    .fontSize(10)
    .text("Uber Everyday", 200, 50, { align: "right" })
    .text("123 New Delhi", 200, 65, { align: "right" })
    .text("Delhi, India, 110092", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;
  const date = new Date().toLocaleDateString();
  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.id, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(date, 150, customerInformationTop + 15)
    .text("Bill:", 50, customerInformationTop + 30)
    .text("INR " + invoice.cost, 150, customerInformationTop + 30)
    .text("Trips Completed: ", 50, customerInformationTop + 45)
    .text(invoice.completedTrips, 150, customerInformationTop + 45)
    .text("Balance Due after Renewal: ", 50, customerInformationTop + 60)
    .text(invoice.cost - invoice.bill, 150, customerInformationTop + 60)
    .font("Helvetica-Bold")
    .text("Source: ", 50, customerInformationTop + 75)
    .text(invoice.source.place_name, 150, customerInformationTop + 75)
    .text("Destination: ", 50, customerInformationTop + 90)
    .text(invoice.destination.place_name, 150, customerInformationTop + 90)
    .moveDown();

  generateHr(doc, 400);
}


function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Thank you for using our service.",
      50,
      300,
      { align: "center", width: 500 }
    );
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}
const generateInvoice = async (doc, data) => {

  generateHeader(doc);
  generateCustomerInformation(doc, data);
  generateFooter(doc);

};



const getInvoice = async (req, res) => {
  try {
    const _id = req.params.id;
    const currentUserRide = await Ride.findOne({
      _id,
      owner: req.user._id,
    }).populate("ride_info");
    await currentUserRide.calculateBill();
    if (currentUserRide) {
      let doc = new pdf({ size: [595.28, 380], margin: 50 });
      doc.pipe(res);
      await generateInvoice(doc, currentUserRide);
      doc.end();
    } else {
      res.status(404).send("ride not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const router = new express.Router();

router.get("/invoice/:id", auth, getInvoice);

module.exports = router;
