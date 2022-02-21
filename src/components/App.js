import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  // 컴포넌트가 처음시작될 때 확인만 하는 작업이니 2번째 파라미터는 비워준다.
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user) {
        // logged in 
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        // logged out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializaing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;