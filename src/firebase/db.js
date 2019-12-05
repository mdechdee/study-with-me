import { db } from './firebase';

export const doCreateUser = (uid, username, email, date) =>
  db.ref(`users/${uid}`).set({
    uid,
    username,
    email,
    point: 20,
    stickerOne: false,
    stickerTwo: false,
    stickerThree: false,
    stickerFour: false,
    date,
  });

  export const onceGetOneUser = (uid) =>
    db.ref(`users/${uid}`).once('value');

  export const getHistory = () =>
    db.ref('redeem_hist').once('value')
