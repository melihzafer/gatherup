import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const EventDetails = () => {
  const route = useRoute(); // Hook to access the route object
  const { event } = route.params; // Destructure the event object from params

  if (!event) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <Text className="text-white p-4">Event not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="p-4">
        <Image
          source={{ uri: event.image }}
          className="w-full h-[300px] rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-2xl text-white font-bold mt-4">
          {event.title}
        </Text>
        <Text className="text-gray-400 mt-2">{event.eventDate}</Text>
        <Text className="text-gray-400 mt-2">{event.location}</Text>
        <Text className="text-gray-400 mt-2">People: {event.people}</Text>
        <Text className="text-gray-400 mt-2">Time: {event.eventTime}</Text>
        <Text className="text-white mt-4">{event.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default EventDetails;
