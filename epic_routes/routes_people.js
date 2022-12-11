//Require stuff
const express = require("express");
const router = express.Router();
const People = require("../epic_models/model_people");

//allow x-www-form-urlencoded stuff
router.use(express.urlencoded({
    extended: true
}))

// let exampleData = [
//     {
//         "id": 63933dad203d78b58c4d579d,
//         "name": "Mees",
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
    // if (req.header('Content-Type') !== 'application/json') {
    //     res.status(415).send();
    // } else {
    //     next();
    // }
    //Somewhere I saw it needed to be x-www-form-urlencoded, so idk what's right
    if (req.header('Content-Type') !== 'application/x-www-form-urlencoded') {
        res.status(415).send();
    } else {
        next();
    }
});

//Store new Person
router.post("/store", async (req, res) => {
    let person = new People({
        name: req.body.name,
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
    // console.log('Delete');
    // res.json(`Requesting thing with id: ${req.params.id}`);

    try {
        await People.findByIdAndDelete(req.params.id);
        // people.findByIdAndDelete();
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
            name: req.body.name,
            age: req.body.age
        })
        res.status(200).send();
    } catch {
        res.status(500).send();
    }

});

//TODO: IDK what to do here...
router.options("/", (req, res) => {
    console.log('options');
    // res.send('options data');
    res.send.allow('GET, POST, OPTIONS, PUT');
});

//Export the router
module.exports = router;
