importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD93ILJjfqLAoLosdXn4Gm_0F20WFiYz2I",
  authDomain: "akamsiperdos-84b0b.firebaseapp.com",
  projectId: "akamsiperdos-84b0b",
  storageBucket: "akamsiperdos-84b0b.firebasestorage.app",
  messagingSenderId: "354170675681",
  appId: "1:354170675681:web:33204d35fa6d3e25f732a0"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification?.title || "AKAMSI",
    {
      body: payload.notification?.body || "Ada order baru",
      icon: "/driver-192.png",
      badge: "/driver-192.png"
    }
  );
});