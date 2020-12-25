import firestore from '@react-native-firebase/firestore';
import { LOADING_BOOKINGS, REFRESHING_BOOKINGS, FETCH_BOOKINGS, FETCH_MORE_BOOKINGS } from './types';

export const fetchBookings = (filter, details) => dispatch => {
    dispatch({ type: LOADING_BOOKINGS });

    let bookings = firestore()
        .collection('bookings')
        .where(details.role, '==', details.uid);

    if (filter !== null) {
        bookings = bookings.where('status', '==', filter);
    }

    bookings.orderBy(firestore.FieldPath.documentId())
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

export const fetchMoreBookings = (filter, details, lastVisible) => dispatch => {
    dispatch({ type: REFRESHING_BOOKINGS });

    let bookings = firestore()
        .collection('bookings')
        .where(details.role, '==', details.uid);

    if (filter !== null) {
        bookings = bookings.where('status', '==', filter);
    }

    bookings.orderBy(firestore.FieldPath.documentId())
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