import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { PERMISSIONS, request } from 'react-native-permissions';

// Get FCM Token
export const getFcmToken = async () => {
  let token = null;
  try {
    await checkApplicationNotificationPermission();
    await registerAppWithFCM();
    token = await messaging().getToken();
    console.log('FCM Token:', token);
  } catch (error) {
    console.log('getFcmToken Device Token error:', error);
  }
  return token;
};

// Register app with FCM
export async function registerAppWithFCM() {
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      console.log('Device registered for remote messages');
    } catch (error) {
      console.log('registerDeviceForRemoteMessages error:', error);
    }
  }
};

// Unregister app from FCM
export async function unRegisterAppWithFCM() {
  if (messaging().isDeviceRegisteredForRemoteMessages) {
    try {
      await messaging().unregisterDeviceForRemoteMessages();
      console.log('Device unregistered from remote messages');
    } catch (error) {
      console.log('unregisterDeviceForRemoteMessages error:', error);
    }
  }
  try {
    await messaging().deleteToken();
    console.log('FCM token deleted');
  } catch (error) {
    console.log('deleteToken error:', error);
  }
};

// Check and request notification permissions
export const checkApplicationNotificationPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }

    // Request Android-specific notification permission (Android 13+)
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log('Android POST_NOTIFICATIONS permission:', result);
    }
  } catch (error) {
    console.log('Permission check error:', error);
  }
};

// Foreground and event listeners
export function registerListenerWithFCM() {
  // Handle foreground messages
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('Foreground message received:', remoteMessage);
    const title = remoteMessage?.notification?.title || remoteMessage?.data?.title;
    const body = remoteMessage?.notification?.body || remoteMessage?.data?.body;
    const data = remoteMessage?.data;

    if (title && body) {
      await onDisplayNotification(title, body, data);
    }
  });

  // Handle notification tap when app is in background
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log('Notification opened from background:', remoteMessage);
    // Add navigation logic here if needed
  });

  // Handle notification tap when app was terminated
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification opened from terminated state:', remoteMessage);
        // Add navigation logic here if needed
      }
    });

  // Notifee foreground event handling (e.g., dismiss or press)
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log('Notification dismissed:', detail.notification);
        break;
      case EventType.PRESS:
        console.log('Notification pressed:', detail.notification);
        // Add navigation or action logic here
        break;
    }
  });

  return unsubscribe;
};

// Background message handler (for data-only messages when app is closed)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background message received:', remoteMessage);
  const title = remoteMessage?.notification?.title || remoteMessage?.data?.title;
  const body = remoteMessage?.notification?.body || remoteMessage?.data?.body;
  const data = remoteMessage?.data;

  if (title && body) {
    await onDisplayNotification(title, body, data);
  }
});

// Display notification using Notifee
async function onDisplayNotification(title, body, data) {
  try {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create or reuse notification channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
      vibration: true,
      sound: 'default',
    });

    // Display the notification
    await notifee.displayNotification({
      title: title || 'Default Title',
      body: body || 'Default Message',
      data: data ? { screen: data } : {},
      android: {
        channelId,
        smallIcon: 'ic_notification', 
        pressAction: {
          id: 'default',
        },
        importance: AndroidImportance.HIGH,
        autoCancel: true,
        showTimestamp: true,
      },
      ios: {
        foregroundPresentationOptions: {
          banner: true,
          badge: true,
          sound: true,
        },
      },
    });
    console.log('Notification displayed successfully');
  } catch (error) {
    console.error('Notification display error:', error);
    throw error; // Optionally rethrow to handle upstream
  }
}

// Initialize notifications
export async function initializeNotifications() {
  try {
    await checkApplicationNotificationPermission();
    await registerAppWithFCM();
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe; // Return unsubscribe function to clean up if needed
  } catch (error) {
    console.error('Notification initialization error:', error);
  }
}

// Test function to trigger a local notification
export async function showTestNotification() {
  await onDisplayNotification(
    'Test Notification',
    'This is a test message',
    { screen: 'Home' }
  );
}