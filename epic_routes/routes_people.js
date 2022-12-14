//Require stuff
const express = require("express");
const router = express.Router();
const People = require("../epic_models/model_people");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json({type: 'application/json'}));


// let exampleData = [
//     {
//         "id": 63933dad203d78b58c4d579d,
//         "firstName": "Mees",
//         "lastName": "Muller",
//         "age": 18
//     }
// ]

//index
router.get("/", async (req, res) => {
    console.log('get');

    try {
        let people = await People.find();

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

            pagination: ""

        }

        res.json(peopleCollection);
    } catch {
        res.status(500).send();
    }
});

//show specific person
router.get("/:id", async (req, res) => {
    try {
        let people = await People.findById(req.params.id);
        res.json(people);
    } catch {
        res.status(404).send();
    }
});

//TODO: create form
router.get("/create", (req, res) => {

    res.send('TODO: create form');

});

//Before storing new Person, check content type
router.post("/store", (req, res, next) => {
    if (req.header('Content-Type') !== 'application/json') {
        res.status(415).send();
    } else {
        next();
    }
    //Somewhere I saw it needed to be x-www-form-urlencoded, so idk what's right
    // if (req.header('Content-Type') !== 'application/x-www-form-urlencoded') {
    //     res.status(415).send();
    // } else {
    //     next();
    // }
});

//Before storing new Person, check if no empty values
router.post("/store", (req, res, next) => {
    if (req.body.firstName && req.body.lastName && req.body.age) {
        next();
    } else {
        res.status(400).send();
    }
});

//Store new Person
router.post("/store", async (req, res) => {
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
router.delete("/:id/delete", async (req, res) => {
    try {
        await People.findByIdAndDelete(req.params.id);
        res.status(200).send();
    } catch {
        res.status(404).send();
    }
});

//TODO: change form
router.get("/:id/change", async (req, res) => {
    console.log('change');
    res.json(`Changing thing with id: ${req.params.id}`);

});

//Update a person
router.put('/:id/update', async (req, res) => {
    console.log('PUT');
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
router.options("/", (req, res) => {
    res.setHeader("Allow", 'GET, POST, OPTIONS');
    res.send();
});

//Export the router
module.exports = router;
