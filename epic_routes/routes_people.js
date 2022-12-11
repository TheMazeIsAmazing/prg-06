// const users = require("../data.json");

const express = require("express");

const router = express.Router();

const People = require("../epic_models/model_people");

//allow x-www-form-urlencoded stuff
router.use(express.urlencoded({
    extended: true
}))

// let data = [
//     {
//         "id": 1,
//         "name": "Mees",
//         "age": 18
//     },
//     {
//         "id": 2,
//         "name": "Diego",
//         "age": 23
//     },
//     {
//         "id": 3,
//         "name": "Ole",
//         "age": 22
//     },
//     {
//         "id": 4,
//         "name": "Daan",
//         "age": 19
//     }
// ]

//index
router.get("/people", async (req, res) => {
    console.log('get');

    try {
        let people = await People.find();
        res.json(people);
    } catch {
        res.status(500).send();
    }
});

//show
router.get("/people/:id", async (req, res) => {
    // console.log('get');
    // res.json(`Requesting thing with id: ${req.params.id}`);

    try {
        let people = await People.findById(req.params.id);
        res.json(people);
    } catch {
        res.status(404).send();
    }
});

//create
router.get("/people/create", async (req, res) => {
    console.log('get');

    res.send('create form');

    // try {
    //     let people = await People.find();
    //     res.json(people);
    // } catch {
    //     res.status(500).send();
    // }
});

//post
router.post("/people/store", async (req, res) => {
    // console.log('post');
    console.log(`Logging req.body ${req.body}`)
    // let person = new People({
    //     name: req.query.name,
    //     age: req.query.age
    // })

    //voorbeeld code Bas
    let person = new People({
        name: req.body.name,
        age: req.body.age
    })

    try {
        await person.save();
        res.send();
    } catch {
        res.status(500).send();
    }
});

//remove
router.delete("/people/:id/delete", async (req, res) => {
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

//options
router.options("/people", (req, res) => {
    console.log('options');
    // res.send('options data');
    res.send.allow('GET, POST, OPTIONS, PUT');
});

module.exports = router;
