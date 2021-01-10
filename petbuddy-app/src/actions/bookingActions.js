import firestore from '@react-native-firebase/firestore';
import { LOADING_BOOKINGS, REFRESHING_BOOKINGS, FETCH_BOOKINGS, FETCH_MORE_BOOKINGS, FETCH_UPDATED_BOOKINGS, UPDATE_BOOKING_STATUS } from './types';
import * as COLLECTIONS from '../constants/collections';

export const fetchBookings = (filter, role, uid) => dispatch => {
    dispatch({ type: LOADING_BOOKINGS });

    let bookings = firestore()
        .collection(COLLECTIONS.BOOKINGS)
        .where(role, '==', uid);

    if (filter !== null) {
        bookings = bookings.where('status', '==', filter);
    }

    bookings.orderBy('fromDate', 'desc')
        .limit(10)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                document.data().id = document.id;
                return document.data();
            })

            dispatch({
                type: FETCH_BOOKINGS,
                payload: data
            })
        });
}

export const fetchMoreBookings = (filter, role, uid, lastVisible) => dispatch => {
    dispatch({ type: REFRESHING_BOOKINGS });

    let bookings = firestore()
        .collection(COLLECTIONS.BOOKINGS)
        .where(role, '==', uid);

    if (filter !== null) {
        bookings = bookings.where('status', '==', filter);
    }

    bookings.orderBy('fromDate', 'desc')
        .startAfter(lastVisible)
        .limit(20)
        .get()
        .then(querySnapshot => {
            let data = querySnapshot.docs.map(document => {
                document.data().id = document.id;
                return document.data();
            })

            dispatch({
                type: FETCH_MORE_BOOKINGS,
                payload: data
            })
        });
}

export const updateBookings = (data) => dispatch => {
    dispatch({
        type: FETCH_UPDATED_BOOKINGS,
        payload: data
    });
}

export const updateStatus = (bookings, bookingid, status) => dispatch => {
    firestore()
        .collection(COLLECTIONS.BOOKINGS)
        .doc(bookingid)
        .update({ status: status })
        .then(() => {
            let cloned = [...bookings];

            let i = cloned.findIndex(item => item.id === bookingid);

            if (i !== null) {
                cloned[i].status = status;
            }

            dispatch({
                type: UPDATE_BOOKING_STATUS,
                payload: cloned
            });
        });
}