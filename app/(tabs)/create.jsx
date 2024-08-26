import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    image: null,
    title: "",
    location: "",
    people: "",
    likes: "",
    users: user?.$id,
    createDate: "",
    eventDate: "",
    eventTime: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    console.log(result.assets[0]);
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          image: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const date = new Date(); // Current date
  const formattedDate = formatDate(date);

  console.log(formattedDate); // Outputs: "12.08.2024"

  const submit = async () => {
    // Empry fields
    // if (
    //   (form.prompt === "") |
    //   (form.title === "") |
    //   !form.thumbnail |
    //   !form.video
    // ) {
    //   return Alert.alert("Please provide all fields");
    // }
    setForm({ ...form, createDate: formattedDate });

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        image: "",
        title: "",
        location: "",
        people: "",
        likes: "",
        users: "",
        createDate: "",
        eventDate: "",
        eventTime: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Details
        </Text>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Image URL
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Title (Required)"
          value={form.title}
          placeholder="Enter title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Location (Required)"
          value={form.location}
          placeholder="Enter location..."
          handleChangeText={(e) => setForm({ ...form, location: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="People (Required)"
          value={form.people}
          placeholder="Enter number of people..."
          handleChangeText={(e) => setForm({ ...form, people: e })}
          otherStyles="mt-10"
          keyboardType="numeric"
        />

        <FormField
          title="Event Date"
          value={form.eventDate}
          placeholder="01.01.2024"
          handleChangeText={(e) => setForm({ ...form, eventDate: e })}
          otherStyles="mt-10"
        />
        <FormField
          title="Event Time"
          value={form.eventTime}
          placeholder="12:00"
          handleChangeText={(e) => setForm({ ...form, eventTime: e })}
          otherStyles="mt-10"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
