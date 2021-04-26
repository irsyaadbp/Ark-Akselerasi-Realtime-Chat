import { auth } from "../services/firebase";

export const signUp = ({ email, password }) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const login = ({ email, password }) => {
  return auth().signInWithEmailAndPassword(email, password);
};
