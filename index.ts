import express from 'express';
import * as admin from 'firebase-admin';
import { CollectionReference } from '@google-cloud/firestore';
const serviceAccount = require("~/Documents/firebase-service-accounts/logly-dev-firebase-adminsdk-tlyh5-a8da77051b.json");

const app = express();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://logly-dev.firebaseio.com'
});
const eventsStore = admin.app().database().ref('events-store');
app.post('send', (req, res) => {
    return new Promise((resolve, reject) => {
        const event: Event = new Event(req.body);
        eventsStore.push(event);
        resolve(true);
    })
})

class Event {
    public type: string;
    public payload: any;
    constructor(obj: any) {
        this.type = obj.type;
        this.payload = obj.payload;
    }
}
