import firebase, { firestore } from '../lib/firebase';
import { LOADING_BOOKINGS, REFRESHING_BOOKINGS, FETCH_BOOKINGS, FETCH_MORE_BOOKINGS, DELETE_BOOKING } from './types';
import * as COLLECTIONS from '../constants/collections';

export const fetchBookings = () => dispatch => {
    dispatch({ type: LOADING_BOOKINGS });
    let bookings = firestore.collection(COLLECTIONS.BOOKINGS);

    bookings.orderBy(firebase.firestore.FieldPath.documentId())
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.filter(document => 'stat' !== document.id).map(document => {
                return { ...document.data(), id: document.id };
            })

            dispatch({
                type: FETCH_BOOKINGS,
                payload: data
            })
        });
}

export const fetchMoreBookings = (lastVisible) => dispatch => {
    dispatch({ type: REFRESHING_BOOKINGS });
    let bookings = firestore.collection(COLLECTIONS.BOOKINGS);

    bookings.orderBy(firebase.firestore.FieldPath.documentId())
        .startAfter(lastVisible)
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.filter(document => 'stat' !== document.id).map(document => {
                return { ...document.data(), id: document.id };
            })

            dispatch({
                type: FETCH_MORE_BOOKINGS,
                payload: data
            })
        });
}

export const deleteBooking = (id) => dispatch => {
    let bookings = firestore.collection(COLLECTIONS.BOOKINGS);

    bookings.doc(id)
        .delete()
        .then(() => {
            dispatch({
                type: DELETE_BOOKING,
                payload: id
            })
        })
}