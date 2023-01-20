const mongoose = require("mongoose");

mongoose
    .connect(
        'mongodb+srv://chardeevari:chardeevari%40mongo@cluster0.rfwfs.mongodb.net/?retr' +
                'yWrites=true&w=majority',

        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('mongo connected sucessfuly'))
    .catch((err) => console.log(err))

const CheckoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    retailerEmail: {
        type: String,
        default: 0
    },
    address: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    mop: {
        type: String,
        required: true
    },
    itemDetails:[{
        _id:String,
        images:[String],
        title:String,
        price:Number,
        intQuantity:Number,
        total:Number

    }]

});

const customerData = mongoose.model("customerDetails", CheckoutSchema); ////////collection name will be users

module.exports = customerData;
