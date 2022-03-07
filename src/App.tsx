import Auth from "./AuthComponent";
import MainComponent from "./MainComponent"
import {useSelector} from "react-redux";
import { selectSuccess } from "./auth/AuthSlice";
import { useEffect } from "react";
export default function App() {
  // the selector that checks if user logged in
  const loginBool = useSelector(selectSuccess);
  useEffect(() => {

  },[loginBool])
  return (  
    <div>
      {loginBool && loginBool ? <MainComponent /> :<Auth/>}
    </div>
  )
}