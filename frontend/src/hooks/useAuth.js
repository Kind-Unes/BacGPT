import {AuthContext} from "../context/AuthContext";
import { useContext } from "react";
const useAuth = () => {
  const Context = useContext(AuthContext);
  if (Context == undefined) {
    throw new Error("useAuth must be use inside an AuthProvider");
  }
  return Context;
};

export default useAuth;
