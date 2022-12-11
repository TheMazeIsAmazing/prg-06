// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

// let exampleData = [
//     {
//         "id": 63933dad203d78b58c4d579d,
//         "name": "Mees",
//         "age": 18
//     }
// ]

const PeopleSchema = new Schema({
    name: String,
    age: Number,
},
{
    toJSON: {
        virtuals: true
    }
});

PeopleSchema.virtual('_links').get(
    function () {
        return {
            self: {
                href: `${process.env.BASE_URI}people/${this._id}`
            },
            // edit: {
            //     href: `${process.env.BASE_URI}people/${this._id}`
            // },
            collection: {
                href: `${process.env.BASE_URI}people/`
            }
        }
    }
)

// Export function to create "People" model class
module.exports = mongoose.model("People", PeopleSchema);
