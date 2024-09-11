import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import auth from "../../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../../firebase/firebase.config";
import loader2 from "../../../assets/images/loader2.gif";
import { useSelector } from "react-redux";
import { setLoading } from "../../../features/loginDetails.js";
import { useDispatch } from "react-redux";
import ProfilePic from "../../../components/ProfilePic.js";
import { useFetchExhibition } from "../../../hooks/useFetchExhibition.jsx";
import styles from "./styles.js";
import { useProfileData } from "../../../hooks/useProfilePic.jsx";
//import uuid from "react-native-uuid";
import DateCheck from "../../../components/DateCheck.jsx";

export default function ExhibitionScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState("All");
  console.log('in exhibtion');
  const { exhibionData, firebaseExhibition } = useFetchExhibition();

  const firebaseExhibitionLength = firebaseExhibition?.length;
  console.log("Exhibition Screen : ", firebaseExhibition);

  const { image, name, userData } = useProfileData();
  const handleAddArtwork = () => {
    navigation.navigate("NewExhibition");
  };

  const Imageloader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image source={loader2}></Image>
      </View>
    );
  };

  const exhibitionItem = (renderItem) => {
    if (firebaseExhibitionLength > 1) {
      return (
        <View style={styles.container}>
          <View style={styles.flatlistContainer}>
            <FlatList
              data={firebaseExhibition}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={1}
            />
          </View>
        </View>
      );
    }
    if (firebaseExhibitionLength < 1) {
      return (
        <View style={styles.cardContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image source={image} style={styles.profilePic} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileInfoText}>
                  Your Exhibitions will be listed here.{" "}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddArtwork()}
            >
              <Text style={styles.addButtonText}>LIST EXHIBITION</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const renderContent = () => {
    if (selectedOption === "All") {
      // Render the profile card for "All" option
      const renderItem = ({ item, index }) => (
        <View style={styles.card} key={index} /*key={uuid} */>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExhibitionShow2", { item, image, name })
            }
          >
            <Image
              source={{ uri: item?.imgUrls[0].imgUrl }}
              style={styles.cardImage}
            />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item?.name}</Text>
                {/* <Text style={styles.cardDate}>{item?.date?.fromDate}</Text> */}
              </View>
              <Text style={styles.cardAddress}>{item?.address}</Text>
              <Text style={styles.cardDescription}>
                {item?.desc.slice(0, 160)}
                {item?.desc.length < 160 ? "" : "..."}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );

      return exhibitionItem(renderItem);
    } else if (selectedOption === "UPCOMING") {
      const cardsData = [
        {
          id: "1",
          image: require("../../../assets/images/art3.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("../../../assets/images/art4.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        // <View style={styles.card} /*key={uuid} */>
        //   <TouchableOpacity
        //     onPress={() =>
        //       navigation.navigate("ExhibitionShow2", { item, image, name })
        //     }
        //   >
        //     <Image
        //       source={{ uri: item?.imgUrls[0].imgUrl }}
        //       style={styles.cardImage}
        //     />
        //     <View style={styles.cardInfoContainer}>
        //       <View style={styles.cardContent}>
        //         <Text style={styles.cardTitle}>{item.name}</Text>
        //         <Text style={styles.cardDate}>{item?.date?.fromDate}</Text>
        //       </View>
        //       <Text style={styles.cardAddress}>{item.address}</Text>
        //       <Text style={styles.cardDescription}>
        //         {item.desc.slice(0, 160)}
        //         {item.desc.length < 160 ? "" : "..."}
        //       </Text>
        //     </View>
        //   </TouchableOpacity>
        // </View>
        <View style={styles.card} /*key={uuid} */>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExhibitionShow2", { item, image, name })
            }
          >
            <Image source={item?.image} style={styles.cardImage} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item?.title}</Text>
                <Text style={styles.cardDate}>{item?.date}</Text>
              </View>
              <Text style={styles.cardAddress}>{item?.address}</Text>
              <Text style={styles.cardDescription}>
                {item?.description.slice(0, 160)}
                {item?.description.length < 160 ? "" : "..."}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );

      return true ? (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={cardsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image source={image} style={styles.profilePic} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileInfoText}>
                  Your Exhibitions will be listed here.{" "}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddArtwork()}
            >
              <Text style={styles.addButtonText}>LIST EXHIBITION</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (selectedOption === "PAST") {
      const cardsData = [
        {
          id: "1",
          image: require("../../../assets/images/art2.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("../../../assets/images/art3.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        // <View style={styles.card} /*key={uuid} */>
        //   <TouchableOpacity
        //     onPress={() =>
        //       navigation.navigate("ExhibitionShow2", { item, image, name })
        //     }
        //   >
        //     <Image
        //       source={{ uri: item?.imgUrls[0].imgUrl }}
        //       style={styles.cardImage}
        //     />
        //     <View style={styles.cardInfoContainer}>
        //       <View style={styles.cardContent}>
        //         <Text style={styles.cardTitle}>{item.name}</Text>
        //         <Text style={styles.cardDate}>{item?.date?.fromDate}</Text>
        //       </View>
        //       <Text style={styles.cardAddress}>{item.address}</Text>
        //       <Text style={styles.cardDescription}>
        //         {item.desc.slice(0, 160)}
        //         {item.desc.length < 160 ? "" : "..."}
        //       </Text>
        //     </View>
        //   </TouchableOpacity>
        // </View>
        <View style={styles.card} /*key={uuid} */>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExhibitionShow2", { item, image, name })
            }
          >
            <Image source={item?.image} style={styles.cardImage} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item?.title}</Text>
                <Text style={styles.cardDate}>{item?.date}</Text>
              </View>
              <Text style={styles.cardAddress}>{item?.address}</Text>
              <Text style={styles.cardDescription}>
                {item?.description.slice(0, 160)}
                {item?.description.length < 160 ? "" : "..."}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );

      return true ? (
        <View style={styles.flatlistContainer}>
          <FlatList
            data={true ? cardsData : past}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
          />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image source={image} style={styles.profilePic} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileInfoText}>
                  Your Exhibitions will be listed here.{" "}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddArtwork()}
            >
              <Text style={styles.addButtonText}>LIST EXHIBITION</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (selectedOption === "DRAFTS") {
      const cardsData = [
        {
          id: "1",
          image: require("../../../assets/images/art1.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        {
          id: "2",
          image: require("../../../assets/images/art3.png"), // Replace with the path to your image
          title: "Reflections in Color",
          date: "July 19, 2023",
          address: "Gallery XYZ, 123 Main Street, Anytown USA",
          description: `Reflections in Color" is a vibrant and dynamic exhibition featuring the artwork of emerging and established artists who explore the interplay of color and form in their work.`,
        },
        // Add more cards data as needed
      ];

      const renderItem = ({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExhibitionShow2")}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <Text style={styles.cardAddress}>{item.address}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
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
    }
  };

  return userData === null ? (
    <View style={styles.container}>
      <Imageloader />
    </View>
  ) : (
    <View style={styles.container}>
      <View>
        <ProfilePic data={{ name, image, navigation }} />
      </View>
      {/* <DateCheck newDate={newDate} /> */}
      <View style={styles.newArtworkContainer}>
        <Text style={styles.welcomeHeader}>Exhibition</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleAddArtwork()}
        >
          <Text style={styles.buttonText}>NEW EXHIBITION</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.artworksMenu}
          style={styles.scrollView}
        >
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
        </ScrollView>
      </View>
      {renderContent()}
    </View>
  );
}
