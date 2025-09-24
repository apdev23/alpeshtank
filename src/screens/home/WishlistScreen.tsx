import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import EventCard from "../../components/EventCard";
import { EventItem } from "../../redux/slice/EventsListSlice";

const WishlistScreen: React.FC = () => {
  const { wishlist } = useSelector((state: RootState) => state.eventsList);

  const onShare = async (item: EventItem) => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 12 }}>
        <Text style={styles.greeting}>Hello Renzo!</Text>
        <Text style={styles.subtitle}>Are you ready to dance?</Text>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item, idx) => (item.event_url ?? String(item.event_id)) + idx}
        renderItem={({ item }) => <EventCard item={item} onShare={onShare} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 40 }}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>No items in wishlist.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  greeting: { fontSize: 20, fontWeight: "700", marginTop: 10 },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 6 },

});

export default WishlistScreen;
