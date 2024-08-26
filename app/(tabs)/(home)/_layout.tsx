import { Text, View } from "react-native";
import React, { Component } from "react";
import { Stack } from "expo-router";

export default class HomeLayout extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen name="EventDetails" options={{ headerShown: false }} />
        <Stack.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
      </Stack>
    );
  }
}
