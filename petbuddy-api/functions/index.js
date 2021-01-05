const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const authMiddleware = require("./auth-middleware");
const firebase = require("./firebase/admin");
const COLLECTIONS = require('./constant/collections');
const ROLES = require('./constant/roles');

const app = express();
const db = firebase.firestore();

app.use(cors());

app.use("/", authMiddleware);

app.post("/api/profile", (request, response) => {
    try {
        let uid = JSON.parse(request.body).uid;

        Promise.all([fetchProfiles(uid), fetchPets(uid), fetchService(uid)])
            .then((values) => {
                let data = {};
                let pets = [];
                let services = {};

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

                if (values[2].exists) {
                    services = values[2].data();
                }

                data.uid = uid
                data.ownedPets = pets;
                data.petsitter = services;

                return response.status(200).json(data);
            })
            .catch(() => response.status(500));

    } catch (error) {
        console.log(error);
        return response.status(400).send();
    }
});

app.post("/api/petsitter", (request, response) => {
    try {
        const data = JSON.parse(request.body);
        const uid = data.uid;
        const preferences = data.preferences;
        const petTypes = data.pettypes;
        const services = data.services;
        const fees = data.fees;
        const about = data.about;

        let _petTypes = [];
        let _services = {};
        let _fees = {};

        services.forEach((service, i) => _services[i] = service);

        petTypes.forEach((petType, i) => {
            if (petType === true) {
                _petTypes.push(i);
            }
        });

        fees.forEach((fee, i) => {
            if (services[i] === true) {
                _fees[i] = fee;
            }
        });

        var batch = db.batch();

        var profilesRef = db.collection(COLLECTIONS.PROFILES).doc(uid);
        batch.update(profilesRef, { rating: 0, jobcount: 0, level: 0, services: _services, pets: _petTypes, role: ROLES.PETSITTER });

        var servicesRef = db.collection(COLLECTIONS.SERVICES).doc(uid);
        batch.set(servicesRef, { about: about, preferences: preferences, services: _fees }, { merge: true });

        batch.commit()
            .then(() => {
                return response.status(200).send();
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

const fetchService = (uid) => {
    return db.collection(COLLECTIONS.SERVICES)
        .doc(uid)
        .get();
}

exports.app = functions.https.onRequest(app);