const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const authMiddleware = require("./auth-middleware");
const firebase = require("./firebase/admin");
const COLLECTIONS = require('./constant/collections');

const app = express();
const db = firebase.firestore();

app.use(cors());

app.use("/", authMiddleware);

app.post("/api/profile", (request, response) => {
    try {
        console.log(request.body);

        let uid = JSON.parse(request.body).uid;

        console.log(uid);

        Promise.all([fetchProfiles(uid), fetchPets(uid)])
            .then((values) => {
                let data = {};
                let pets = [];

                if (values[0].exists) {
                    data = values[0].data();
                }
                else {
                    return response.status(404).json({ error: 'Invalid user' });
                }

                values[1].forEach(pet => {
                    pet.data().id = pet.id;
                    pets.push(pet.data());
                });

                data.uid = uid
                data.pets = pets;

                return response.status(200).json(data);
            })
            .catch(() => response.status(500));

    } catch (error) {
        console.log(error);
        return response.status(400).send();
    }
});

const fetchProfiles = (uid) => {
    return db.collection(COLLECTIONS.PROFILES)
        .doc(uid)
        .get();
}

const fetchPets = (uid) => {
    return db.collection(COLLECTIONS.PROFILES)
        .doc(uid)
        .collection(COLLECTIONS.PETS)
        .get();
}

exports.app = functions.https.onRequest(app);