import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getStorage, ref as reff, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6z0PXAZ8h5zt2xv_y3YEvDU3KcVKVrPk",
    authDomain: "macgpt-2acce.firebaseapp.com",
    databaseURL: "https://macgpt-2acce-default-rtdb.firebaseio.com",
    projectId: "macgpt-2acce",
    storageBucket: "macgpt-2acce.appspot.com",
    messagingSenderId: "830819513296",
    appId: "1:830819513296:web:a9f638fc7b8e8dd323ffd5",
    measurementId: "G-0QMSQFX3FR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage();

class History extends React.Component
{
    constructor(props)
    {
        super();
    }

    render() {
        console.log(this.props.userNow)
        return (
            <h1>
                The user is {this.props.userNow[0].email}
            </h1>
        );
    }
}

export default History