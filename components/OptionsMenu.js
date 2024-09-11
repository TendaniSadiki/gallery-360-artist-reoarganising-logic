import React from "react";

export default function ProfilePic() {
  const renderContent = () => {
    if (selectedOption === "All") {
      // Render the profile card for "All" option
      return (
        <View style={styles.cardContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image source={profilePic} style={styles.profilePic} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileInfoText}>
                  make your first sale by adding artwork
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Artworks</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (selectedOption === "UPCOMING") {
      const cardsData = [
        {
          id: "1",
          image: require("./assets/images/art1.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("./assets/images/art2.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardInfoContainer}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            <Text style={styles.cardAddress}>{item.address}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      );

      return (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        </View>
      );
    } else if (selectedOption === "PAST") {
      const cardsData = [
        {
          id: "1",
          image: require("./assets/images/art1.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("./assets/images/art2.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardInfoContainer}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            <Text style={styles.cardAddress}>{item.address}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      );

      return (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        </View>
      );
    } else if (selectedOption === "DRAFTS") {
      const cardsData = [
        {
          id: "1",
          image: require("./assets/images/art1.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("./assets/images/art2.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
          <View style={styles.cardInfoContainer}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            <Text style={styles.cardAddress}>{item.address}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.artworksMenu}>
        {/* Add your navigation menu items here */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "All" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("All")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "All" && styles.activeMenuText,
            ]}
          >
            ALL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "UPCOMING" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("UPCOMING")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "UPCOMING" && styles.activeMenuText,
            ]}
          >
            UPCOMING
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "PAST" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("PAST")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "PAST" && styles.activeMenuText,
            ]}
          >
            PAST
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "DRAFTS" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("DRAFTS")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "DRAFTS" && styles.activeMenuText,
            ]}
          >
            DRAFTS
          </Text>
        </TouchableOpacity>
        {/* Add more menu items as needed */}
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 200,
  },
  welcomeHeader: {
    color: "white",
    marginLeft: 10,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  artworksHeader: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },

  navigationMenu: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 0,
    width: 350,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#CEB89E",
    paddingTop: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    marginBottom: 5,
  },
  menuText: {
    color: "white",
    fontSize: 10,
  },
  artworksMenu: {
    width: 270,
    flexDirection: "row",
    justifyContent: "space-around",

    paddingTop: 10,
    marginBottom: 20,
  },
  menuItem: {
    alignItems: "center",
  },

  cardContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
  salesList: {
    marginTop: 20,
  },
  saleItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  activeMenuItem: {
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#616161",
  },
  activeMenuText: {
    color: "black",
  },
  signInButton: {
    width: "40%",
    height: 50,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 15,
  },
  newArtworkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#616161",
    borderRadius: 15,
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 200, // Adjust this value to control the image height
    resizeMode: "cover",
  },
  cardInfoContainer: {
    padding: 10,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 14,
    color: "white",
  },
  cardAddress: {
    marginBottom: 5,
    fontSize: 14,
    color: "white",
  },
  cardDescription: {
    fontSize: 14,
    color: "white",
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    paddingTop: 20,
    marginBottom: 30,
  },
});
