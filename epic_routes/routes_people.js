//Require stuff
const express = require("express");
const router = express.Router();
const People = require("../epic_models/model_people");

//body parser stuff
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json({type: 'application/json'}));

// let exampleData = [
//     {
//         "id": 63933dad203d78b58c4d579d,
//         "firstName": "Mees",
//         "lastName": "Muller",
//         "age": "18"
//     }
// ]

router.use(function (req, res, next) {
    // respond with json
    if (req.accepts('json')) {
        next();
    } else {
        res.status(400).send();
    }
});

//index
router.get("/", async (req, res) => {
    let limit = null
    let start = 1
    if(req.query.limit !== undefined) {
        limit = parseInt(req.query.limit);
    }
    if(req.query.start !== undefined) {
        start = parseInt(req.query.start);
    }

    let totalItems = await People.find().count();

    if (limit === null) {
        limit = totalItems
    }

    let people = await People.find()
        .limit(limit)
        .skip((start - 1) * limit)
        .exec();

    // let totalItems = allPeople;
    let totalPages = Math.ceil((totalItems / limit));
    console.log(`limit: ${limit}, start: ${start}, totalPages: ${totalPages}, totalItems: ${totalItems}`);

    if (people.length < 1) {
        res.status(500).send();
    } else {

        let peopleCollection = {
            items: people,

            _links: {
                self: {
                    href: `${process.env.BASE_URI}people/`
                },
                collection: {
                    href: `${process.env.BASE_URI}people/`
                }
            },

            pagination: {
                "currentPage": start,
                "currentItems": limit,
                "totalPages": totalPages,
                "totalItems": totalItems,
                "_links": {
                    "first": {
                        "page": 1,
                        "href": `${process.env.BASE_URI}people/?start=1&limit=${limit}`
                    },

                    "last": {
                        "page": totalPages,
                        "href": `${process.env.BASE_URI}people/?start=${totalPages}&limit=${limit}`
                    },
                    "previous": {
                        "page": start - 1,
                        "href": `${process.env.BASE_URI}people/?start=${start - 1}&limit=${limit}`
                    },
                    "next": {
                        "page": start + 1,
                        "href": `${process.env.BASE_URI}people/?start=${start + 1}&limit=${limit}`
                    }
                }
            }

        }

        res.json(peopleCollection);
    }
});

//show specific person
router.get("/:id", async (req, res) => {
    try {
        let people = await People.findById(req.params.id);
        if (people !== null) {
            res.json(people);
        } else {
            res.status(404).send();
        }
    } catch {
        res.status(404).send();
    }
});

//Before storing new Person, check content type
router.post("/", (req, res, next) => {
    //Check if request is either form data or json
    if (req.header('Content-Type') !== 'application/x-www-form-urlencoded' && req.header('Content-Type') !== 'application/json') {
        res.status(415).send();
    } else {
        next();
    }
});

//Before storing new Person, check if no empty values
router.post("/", (req, res, next) => {
    if (req.body.firstName && req.body.lastName && req.body.age) {
        next();
    } else {
        res.status(400).send();
    }
});

//Store new Person
router.post("/", async (req, res) => {
    let person = new People({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })

    try {
        await person.save();
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

//remove
router.delete("/:id/", async (req, res) => {
    try {
        await People.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch {
        res.status(404).send();
    }
});

//Before updating existing Person, check content type
router.put("/:id/", (req, res, next) => {
    //Check if request is either form data or json
    if (req.header('Content-Type') !== 'application/x-www-form-urlencoded' && req.header('Content-Type') !== 'application/json') {
        res.status(415).send();
    } else {
        next();
    }
});

//Before updating existing Person, check if no empty values
router.put("/:id/", (req, res, next) => {
    console.log(req.body.firstName, req.body.lastName, req.body.age);
    if (req.body.firstName && req.body.lastName && req.body.age) {
        next();
    } else {
        res.status(400).send();
    }
});

//Update a person
router.put('/:id/', async (req, res) => {
    try {
        await People.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age
        })
        res.status(200).send();
    } catch {
        res.status(500).send();
    }

});

//options
router.options((req, res) => {
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Origin");
    res.header("Allow", "HEAD, GET, POST, OPTIONS");
    res.send();
})

router.options("/:id", (req, res) => {
    res.header("Access-Control-Allow-Methods", "HEAD, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Access-Control-Allow-Origin");
    res.header("Allow", "HEAD, GET, PUT, DELETE, OPTIONS");
    res.send();
});

//Export the router
module.exports = router;
