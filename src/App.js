import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, toggleLoading } from "./features/app/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";
function App() {
  // console.log(process.env);
  // const { isLoading } = useSelector(state => state.auth);
  // console.log(isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getUser(user.email));
      } else {
        dispatch(toggleLoading());
      }
    });
  }, [])
  return (
    <>
      <Toaster />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
