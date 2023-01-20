const express = require('express');
const app = express();
const pdfKit = require('pdfkit');
const fs = require('fs');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

app.post('/invoice', cors(), async (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    let companyLogo = "./images/companyLogo.png";
    let fileName = './files/'+req.body.name +'.pdf';
    // let fileName='/home/ayush/Desktop/pro2/frontend/public/'+req.body.name +'.pdf';

    let fontNormal = 'Helvetica';
    let fontBold = 'Helvetica-Bold';

    let sellerInfo = {
        "companyName": "Anytime Mart Pvt. Ltd.",
        "address": "Mumbai Central",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400017",
        "country": "India",
        "contactNo": "+910000000600"
    }

    let customerInfo = {
        "customerName": req.body.name,
        "address": req.body.address,
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560062",
        "country": "India",
        "contactNo": req.body.phone
    }
    let product = JSON.parse(req.body.products)

    let grandTotal = [];
    product.forEach(element => {

        grandTotal.push(element.total);
    })
    let sum = 0;
    for (let i = 0; i < grandTotal.length; i += 1) {
        sum += grandTotal[i];
    }

    let orderInfo = {
        "orderNo": "15484659", ///generate random number
        "invoiceNo": "MH-MU-1077",
        "invoiceDate": new Date().toLocaleDateString(),
        "invoiceTime": new Date().toLocaleTimeString(),
        "products": product,

        "totalValue": sum
    }
    console.log(orderInfo);

    // console.log(product) console.log(JSON.parse(req.body.products.total))

    await createPdf()
    // console.log(sum)

    // console.log(grandTotal);

    res.send({'Invoice': 'Generated'})

    // await invoiceGenerator(name,semail,remail, total, address, tNumber);

    function createPdf() {
        try {

            let pdfDoc = new pdfKit();

            let stream = fs.createWriteStream(fileName);
            pdfDoc.pipe(stream);

            pdfDoc.text("ANYTIME INVOICE", 5, 5, {
                align: "center",
                width: 600
            });
            pdfDoc.image(companyLogo, 25, 20, {
                width: 50,
                height: 50
            });
            pdfDoc
                .font(fontBold)
                .text('ANYTIME MART', 7, 75);
            pdfDoc
                .font(fontNormal)
                .fontSize(14)
                .text('Order Invoice/Bill Receipt', 400, 30, {width: 200});
            pdfDoc
                .fontSize(10)
                .text(
                    orderInfo.invoiceDate + " " + orderInfo.invoiceTime,
                    400,
                    46,
                    {width: 200}
                );

            pdfDoc
                .font(fontBold)
                .text("Sold by:", 7, 100);
            pdfDoc
                .font(fontNormal)
                .text(sellerInfo.companyName, 7, 115, {width: 250});
            pdfDoc.text(sellerInfo.address, 7, 130, {width: 250});
            pdfDoc.text(sellerInfo.city + " " + sellerInfo.pincode, 7, 145, {width: 250});
            pdfDoc.text(sellerInfo.state + " " + sellerInfo.country, 7, 160, {width: 250});

            pdfDoc
                .font(fontBold)
                .text("Customer details:", 400, 100);
            pdfDoc
                .font(fontNormal)
                .text(customerInfo.customerName, 400, 115, {width: 250});
            pdfDoc.text(customerInfo.address, 400, 130, {width: 250});
            pdfDoc.text(
                customerInfo.city + " " + customerInfo.pincode,
                400,
                145,
                {width: 250}
            );
            pdfDoc.text(
                customerInfo.state + " " + customerInfo.country,
                400,
                160,
                {width: 250}
            );

            pdfDoc.text("Order No:" + orderInfo.orderNo, 7, 195, {width: 250});
            pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, {width: 250});
            pdfDoc.text(
                // "Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime,
                `Date: ${orderInfo.invoiceDate} ${orderInfo.invoiceTime}`,
                7,
                225,
                {width: 250}
            );

            pdfDoc
                .rect(7, 250, 560, 20)
                .fill("#FC427B")
                .stroke("#FC427B");
            pdfDoc
                .fillColor("#fff")
                .text("ID", 20, 256, {width: 90});
            pdfDoc.text("Product", 110, 256, {width: 190});
            pdfDoc.text("Qty", 300, 256, {width: 100});
            pdfDoc.text("Price", 400, 256, {width: 100});
            pdfDoc.text("Total Price", 500, 256, {width: 100});

            let productNo = 1;
            orderInfo
                .products
                .forEach(element => {
                    console.log("adding", element.name);
                    let y = 256 + (productNo * 20);
                    pdfDoc
                        .fillColor("#000")
                        .text(element._id.slice(8,12 ), 20, y, {width: 90});
                    pdfDoc.text(element.title, 110, y, {width: 190});
                    pdfDoc.text(element.intQuantity, 300, y, {width: 100});
                    pdfDoc.text(element.price, 400, y, {width: 100});
                    pdfDoc.text(element.total, 500, y, {width: 100});
                    productNo++;
                });

            pdfDoc
                .rect(7, 256 + (productNo * 20), 560, 0.2)
                .fillColor("#000")
                .stroke("#000");
            productNo++;

            pdfDoc
                .font(fontBold)
                .text("Total:", 400, 256 + (productNo * 17));
            pdfDoc
                .font(fontBold)
                .text(orderInfo.totalValue, 500, 256 + (productNo * 17));

            pdfDoc.end();
            console.log("pdf generate successfully");
        } catch (error) {
            console.log("Error occurred", error);
        }
    }

})

app.listen(3001, () => {

    console.log('server running at port 3001');

})
