import { db } from './firebase';

export const doCreateUser = (uid, username, email, date) =>
  db.ref(`users/${uid}`).set({
    uid,
    username,
    email,
    date,
  });
