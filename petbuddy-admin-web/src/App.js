import React, { useEffect, useState } from 'react';
import NavRouter from './NavRouter';
import { auth } from './lib/firebase';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { fetchProfile, clearProfile } from './actions/profileActions';
import './scss/App.scss';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initializing, setInitializing] = useState(true)

  function onAuthStateChanged(result) {
    if (result != null) {
      result.getIdToken().then(token => {
        if (token) {
          props.fetchProfile(result.uid, token);
          setIsLoggedIn(true);
        }
      });
    }
    else {
      props.clearProfile();
      setIsLoggedIn(false);
    }

    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const authSubscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return authSubscriber;
  }, [])

  if (initializing) {
    return <div className="h-100 d-flex justify-content-center align-items-center"><Spinner size="lg" /></div>
  }
  else {
    return (
      <NavRouter isLoggedIn={isLoggedIn} />
    );
  }
}

export default connect(null, { fetchProfile, clearProfile })(App);