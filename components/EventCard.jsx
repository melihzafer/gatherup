import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const EventCard = ({
  title,
  location,
  people,
  likes,
  image,
  eventDate,
  eventTime,
}) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start w-full">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: image }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-semibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-regular"
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Text className="text-xs text-gray-300 font-regular">
            {eventDate}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
      >
        <Image
          source={{ uri: image }}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View className="flex flex-row justify-between w-full mt-3 px-1">
        <View className="flex flex-row items-center">
          <FontAwesome name="users" size={16} color="white" />
          <Text className="text-sm text-white ml-2">{people} People</Text>
        </View>

        <View className="flex flex-row items-center">
          <FontAwesome name="heart" size={16} color="red" />
          <Text className="text-sm text-white ml-2">{likes} Likes</Text>
        </View>
      </View>

      <View className="flex flex-row justify-between w-full mt-1 px-1">
        <Text className="text-sm text-gray-400">{eventTime}</Text>
      </View>
    </View>
  );
};

export default EventCard;
