// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

// let exampleData = [
//     {
//         "id": 63933dad203d78b58c4d579d,
//         "firstName": "Mees",
//         "lastName": "Muller",
//         "age": "18"
//     }
// ]

const PeopleSchema = new Schema({
        firstName: String,
        lastName: String,
        age: String
        // age: Number
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
            collection: {
                href: `${process.env.BASE_URI}people/`

            },
            pagination: {
                "currentPage": 1,
                "currentItems": 6,
                "totalPages": 1,
                "totalItems": 6,
                "_links": {
                    "first": {
                        "page": 1,
                        "href": `${process.env.BASE_URI}people/?start=1&limit=10`
                    },

                    "last": {},
                    "previous": {},
                    "next": {}
                }
            }
        }
    }
)

// Export function to create "People" model class
module.exports = mongoose.model("People", PeopleSchema);
