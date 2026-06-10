importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyD93ILJjfqLAoLosdXn4Gm_0F20WFiYz2I",
  authDomain: "akamsiperdos-84b0b.firebaseapp.com",
  projectId: "akamsiperdos-84b0b",
  storageBucket: "akamsiperdos-84b0b.firebasestorage.app",
  messagingSenderId: "354170675681",
  appId: "1:354170675681:web:33204d35fa6d3e25f732a0"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

function getIconByRole(role) {
  switch(role) {
    case 'driver': return './driver-192.png';
    case 'resto': return './resto-192.png';
    case 'admin': return './admin-192.png';
    default: return './customer-192.png';
  }
}

messaging.onBackgroundMessage((payload) => {
  console.log('[FCM Background] Pesan diterima:', payload);
  
  const role = payload.data?.role || 'customer';
  const icon = getIconByRole(role);
  
  const notificationTitle = payload.notification?.title || "AKAMSI";
  const notificationOptions = {
    body: payload.notification?.body || "Ada update baru",
    icon: icon,
    badge: icon,
    vibrate: [200, 100, 200],
    data: payload.data || {},
    requireInteraction: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});