import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, EventItem } from "../redux/slice/EventsListSlice";
import { AppDispatch, RootState } from "../redux/store";

type Props = {
    item: EventItem;
    onShare: (item: EventItem) => void;
};

const EventCard: React.FC<Props> = ({ item, onShare }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { wishlist } = useSelector((state: RootState) => state.eventsList);
    const isFav = wishlist?.some((w) => w.event_date_id === item.event_date_id);

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <Image source={{ uri: item.event_profile_img }} style={styles.image} />

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{item.event_name}</Text>
                <Text style={styles.date}>
                    {item.readable_from_date ?? ""} {item.readable_to_date ? `– ${item.readable_to_date}` : ""}
                </Text>
                <Text style={styles.price}>
                    {item.event_price_from === 0 && item.event_price_to === 0
                        ? "Free"
                        : `€${item.event_price_from} – €${item.event_price_to}`}
                </Text>

                <View style={styles.tagsContainer}>
                    {item.keywords?.map((name, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{name}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.rightSection}>
                <Text style={styles.location}>{item.city ?? ""}, {item.country ?? ""}</Text>

                <View style={styles.iconsRow}>
                    <TouchableOpacity onPress={() => onShare(item)}>
                        <Icon name="share-outline" size={20} color="#555" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginLeft: 12 }}
                        onPress={() => dispatch(toggleWishlist(item))}
                    >
                        <Icon
                            name={isFav ? "heart" : "heart-outline"}
                            size={20}
                            color={isFav ? "green" : "#555"}
                        />
                    </TouchableOpacity>
                </View>

                <Icon name="chevron-forward" size={20} color="#555" style={styles.arrow} />
            </View>
        </TouchableOpacity>
    );
};

export default EventCard;

const styles = StyleSheet.create({
    card: { flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 12, elevation: 2 },
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
