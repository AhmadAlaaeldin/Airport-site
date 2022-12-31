const {initializeApp, cert} = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const account = require('./Creds.json');

initializeApp({
    credential: cert(account)
});

const db = getFirestore();

module.exports = {db}