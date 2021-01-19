const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./auth-middleware');
const firebase = require('./firebase/admin');
const COLLECTIONS = require('./constant/collections');
const ROLES = require('./constant/roles');
const STATUS = require('./constant/status');

const app = express();
const db = firebase.firestore();

app.use(cors());

app.use('/', authMiddleware);

app.post('/api/profile', (request, response) => {
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
                    let _pet = Object.assign({}, pet.data());
                    _pet.id = pet.id;
                    pets.push(_pet);
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

app.post('/api/petsitter/register', (request, response) => {
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
        batch.update(profilesRef, { rating: 0, totalrating: 0, jobcount: 0, level: 0, services: _services, pets: _petTypes, role: ROLES.PETSITTER });

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

app.post('/api/profile/update', (request, response) => {
    try {
        const data = JSON.parse(request.body);
        const uid = data.uid;
        const role = data.role;
        const details = data.details;

        if (role === ROLES.PETOWNER) {
            db.collection(COLLECTIONS.PROFILES)
                .doc(uid)
                .update({ firstname: details.fname, lastname: details.lname, phone: details.phone, city: details.city })
                .then(() => {
                    return response.status(200).send();
                })
                .catch(() => response.status(500));
        }
        else {
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
            batch.update(profilesRef, {
                firstname: details.fname, lastname: details.lname, phone: details.phone, city: details.city,
                services: _services, pets: _petTypes
            });

            var servicesRef = db.collection(COLLECTIONS.SERVICES).doc(uid);
            batch.set(servicesRef, { about: about, preferences: preferences, services: _fees }, { merge: true });

            batch.commit()
                .then(() => {
                    return response.status(200).send();
                })
                .catch(() => response.status(500));
        }

    } catch (error) {
        console.log(error);
        return response.status(400).send();
    }
});

app.post('/api/booking/create', (request, response) => {
    try {
        const data = JSON.parse(request.body);
        const pets = data.pets;

        var statDocRef = db.collection(COLLECTIONS.BOOKINGS).doc('stat');

        db.runTransaction(transaction =>
            transaction.get(statDocRef)
                .then(statDoc => {
                    if (!statDoc.exists) throw new Error('Stat document does not exist');

                    let newCount = statDoc.data().count + 1;
                    var bookingsRef = db
                        .collection(COLLECTIONS.BOOKINGS)
                        .doc(newCount.toString());
                    var messagesRef = db
                        .collection(COLLECTIONS.BOOKINGS)
                        .doc(newCount.toString())
                        .collection(COLLECTIONS.MESSAGES);

                    transaction.update(statDocRef, { count: newCount });

                    transaction.create(bookingsRef, {
                        service: data.service,
                        fromDate: data.fromDate,
                        toDate: data.toDate,
                        status: STATUS.UPCOMING.value,
                        fee: data.fee,
                        petSitterName: data.petSitterName,
                        petOwnerName: data.petOwnerName,
                        PETSITTER: data.PETSITTER,
                        PETOWNER: data.PETOWNER
                    });

                    pets.forEach((pet) => {
                        transaction.create(messagesRef.doc(), {
                            avatar: pet.avatar,
                            name: pet.name,
                            type: pet.type,
                            gender: pet.gender,
                            birthday: pet.birthday,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            sender: data.PETOWNER
                        });
                    });

                    return null;
                })
                .then(() => response.status(200).send())
                .catch(error => {
                    console.log(error);
                    response.status(500)
                }))
    } catch (error) {
        console.log(error);
        return response.status(400).send();
    }
});

app.post('/api/booking/update', (request, response) => {
    try {
        const data = JSON.parse(request.body);

        var profileRef = db.collection(COLLECTIONS.PROFILES).doc(data.uid);
        var bookingRef = db.collection(COLLECTIONS.BOOKINGS).doc(data.bookingid);

        db.runTransaction(transaction =>
            transaction.get(profileRef)
                .then(profile => {
                    if (!profile.exists) throw new Error('Profile does not exist');

                    let newTotalrating = profile.data().totalrating + data.rating;
                    let newJobcount = profile.data().jobcount + 1;
                    let newRating = Math.round(newTotalrating / newJobcount);

                    transaction.update(profileRef, { totalrating: newTotalrating, rating: newRating, jobcount: newJobcount });
                    transaction.update(bookingRef, { rating: data.rating });

                    return null;
                })
                .then(() => {
                    return response.status(200).send();
                })
                .catch(error => {
                    console.log(error);
                    response.status(500)
                }))
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