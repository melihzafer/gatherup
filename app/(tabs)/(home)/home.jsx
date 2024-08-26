import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { images } from "../../../constants";
import useAppwrite from "../../../lib/useAppwrite";
import {
  getAllPosts,
  getLatestPosts,
  getLiveEvents,
  getAccount,
} from "../../../lib/appwrite";
import {
  EmptyState,
  SearchInput,
  Trending,
  VideoCard,
  EventCard,
} from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";
import LiveEventCard from "../../../components/LiveEventCard";

const Home = () => {
  const { data: posts, refetch: refetchPosts } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [liveEvents, setLiveEvents] = useState([]);

  useEffect(() => {
    const fetchLiveEvents = async () => {
      try {
        const account = await getAccount();
        if (!account) {
          throw new Error("User not authenticated");
        }
        const events = await getLiveEvents();
        setLiveEvents(events);
      } catch (error) {
        console.error("Error fetching live events:", error);
      }
    };

    fetchLiveEvents();
  }, setLiveEvents);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPosts();
    // Optionally refetch live events
    const events = await getLiveEvents();
    setLiveEvents(events);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary gray h-[100vh]">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            location={item.location}
            people={item.people}
            likes={item.likes}
            image={item.image}
          />
          // <Text>Hello</Text>
          // Trending Video
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 ">
            <View className="flex justify-between items-start flex-row border-b-2 border-gray-950">
              <View>
                <Text className="font-pmedium text-sm text-white ">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white ">
                  {user?.username}
                </Text>
              </View>
            </View>

            {/* <SearchInput /> */}

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-white mb-3">
                Upcoming Events
              </Text>
              <FlatList
                data={liveEvents}
                horizontal
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <LiveEventCard event={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-white mb-3">
                Trending
              </Text>
              {/* {/<Trending posts={l[atestPosts] ?? []} /> } */}
              <Trending posts={[]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Events Found"
            subtitle="No events created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
