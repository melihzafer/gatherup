import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LiveEventCard = ({ event }) => {
  const navigation = useNavigation(); // Hook to access navigation

  const handlePress = () => {
    // Navigate to the EventDetails screen and pass the event object as a parameter
    navigation.navigate("EventDetails", { event });
  };

  return (
    <View className="bg-white rounded-lg shadow-md p-4 m-2 w-[300px] border border-gray-500 shadow-md">
      <Image
        source={{ uri: event.image }}
        className="w-full h-[150px] rounded-t-lg"
        resizeMode="cover"
      />
      <View className="mt-4">
        <Text className="text-lg font-bold">{event.title}</Text>
        <View className="flex flex-row items-center mt-2">
          <FontAwesome name="calendar" size={16} color="black" />
          <Text className="text-gray-500 ml-2">{event.eventDate}</Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Entypo name="location-pin" size={16} color="black" />
          <Text className="text-gray-500 ml-2">{event.location}</Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <FontAwesome name="users" size={16} color="black" />
          <Text className="text-gray-500 ml-2">{event.people}</Text>
        </View>
        <View className="flex flex-row items-center justify-between mt-4">
          <Text className="text-gray-500">
            <FontAwesome name="clock-o" size={16} color="black" />{" "}
            {event.eventTime}
          </Text>
          <View className="flex flex-row items-center">
            <TouchableOpacity className="p-2">
              <FontAwesome name="heart" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-500 rounded-lg px-4 py-2 m-2"
              onPress={handlePress} // Navigate on press
            >
              <Text className="text-white text-center">Look</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LiveEventCard;
