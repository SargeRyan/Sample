
export async function schedulePushNotification(year, month, day, hour, minute, title, body) {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    console.log('Scheduling notification');
    registerForPushNotificationsAsync();
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
        console.log(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
    });

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "💊 " + title,
            body: body,
            data: {},
            sound: 'default',
        },
        trigger: {
            date: new Date(year, month - 1, day, hour, minute),
            repeats: false,
        },
    });

    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            //alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
