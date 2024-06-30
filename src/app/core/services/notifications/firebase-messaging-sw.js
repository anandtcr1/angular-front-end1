importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js'); 
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyAUvFhFs7w0RnZrhaJQ8FteoUp2D439sGA",
    authDomain: "owl-ghada.firebaseapp.com",
    projectId: "owl-ghada",
    storageBucket: "owl-ghada.appspot.com",
    messagingSenderId: "796597453686",
    appId: "1:796597453686:web:29e0e3820e74815fd33057",
    measurementId: "G-BG40HX7B2K"
})


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message ", payload);
    
});
