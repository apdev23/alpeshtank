import React from 'react';
import { Image, View } from 'react-native';
import Search from '../screens/home/Search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "@react-native-vector-icons/fontisto";
import WishlistScreen from '../screens/home/WishlistScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventScreen from '../screens/home/EventScreen';
import ProfileScreen from '../screens/home/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (props: any) => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
                let iconName = 'home';
                if (route.name === 'Wishlist') {
                    iconName = 'heart';
                }
                else if (route.name === 'Event') {
                    iconName = 'calendar';
                }
                else if (route.name === 'Profile') {
                    iconName = 'person';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            }
        })}>
            <Tab.Screen
                name={'Search'}
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarActiveTintColor: 'skyblue',
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <Icon name='search' size={20} color={'blue'} />
                        );
                    },
                }}
            />
            <Tab.Screen name="Event" component={EventScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigation;
