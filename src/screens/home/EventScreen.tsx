import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchEventsList } from "../../redux/slice/EventsListSlice";
import { EventItem } from "../../redux/slice/EventsListSlice";
import EventCard from "../../components/EventCard";

const EventScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { eventsList, loading } = useSelector((state: RootState) => state.eventsList);

    useEffect(() => {
        dispatch(fetchEventsList());
    }, [dispatch]);

    const onShare = async (item: EventItem) => {
        try {
            await Share.share({
                message: item.event_url ?? item.event_name,
            });
        } catch (err) {
            console.warn(err);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 12 }}>
                <Text style={styles.greeting}>Hello Renzo!</Text>
                <Text style={styles.subtitle}>Are you ready to dance?</Text>
            </View>

            <FlatList
                data={eventsList?.events || []}
                keyExtractor={(item, idx) => (item.event_url ?? String(item.event_id)) + idx}
                renderItem={({ item }) => <EventCard item={item} onShare={onShare} />}
                contentContainerStyle={{ padding: 12, paddingBottom: 40 }}
                ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>{loading ? "Loading..." : "No events found."}</Text>}
            />
        </SafeAreaView>
    );
};

export default EventScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    greeting: { fontSize: 20, fontWeight: "700", marginTop: 10 },
    subtitle: { fontSize: 14, color: "#666", marginBottom: 6 },
    card: { flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 12, elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 } },
    image: { width: 68, height: 68, borderRadius: 8, marginRight: 10 },
    info: { flex: 1, justifyContent: "center" },
    title: { fontSize: 14, fontWeight: "600", marginBottom: 2 },
    date: { fontSize: 12, color: "#666" },
    price: { fontSize: 12, color: "#333", marginBottom: 6 },
    tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
    tag: { backgroundColor: "#f0f0f0", paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6, marginRight: 6, marginTop: 4 },
    tagText: { fontSize: 10 },
    rightSection: { width: 90, alignItems: "flex-end", justifyContent: "space-between" },
    location: { fontSize: 12, color: "#777", textAlign: "right", maxWidth: 90 },
    iconsRow: { flexDirection: "row", marginTop: 6 },
    arrow: { marginTop: 8 },
});
