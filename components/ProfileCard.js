import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileCard = ({ data }) => {
  const navigation = data.navigation;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Image source={data.image} style={styles.profilePic} />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{data.name}</Text>
            <Text style={styles.profileInfoText}>{data.desc}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate(data.navStack)}
        >
          <Text style={styles.addButtonText}>{data.btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Define your styles for ProfileCard component here
  // ...

  profileCard: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: "#CEB89E",
    padding: 10,
  },

  profileText: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 320,
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileInfoText: {
    fontSize: 14,
    color: "white",
  },
  profileInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#CEB89E",
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProfileCard;
