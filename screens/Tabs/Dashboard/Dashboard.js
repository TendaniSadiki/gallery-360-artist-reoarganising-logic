import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
//import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.
import auth from "../../../firebase/firebase.config.js";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB, storage } from "../../../firebase/firebase.config.js";
import { useProfileData } from "../../../hooks/useProfilePic.jsx";

import ProfilePic from "../../../components/ProfilePic.js";
import ProfileCard from "../../../components/ProfileCard.js";
import loader2 from "../../../assets/images/loader2.gif"; // this is the bad guy

//import { useSelector } from "react-redux";
import data from "./utils/data.js";
import styles from "./styles.js";
import { useFetchProfileData } from "../../../hooks/useFetchProfileData.jsx";

const DashboardScreen = ({ navigation }) => {
  const profilePic = require("../../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture
  console.log('in dashboard');
  const [navStack, setNavStack] = useState("NewArtwork");
  const [desc, setDesc] = useState(
    " make your first sale by adding artwork collections"
  );
  const [btnText, setBtnText] = useState("Add Artworks");
  const { image, name, userData } = useFetchProfileData();

  const data = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(206, 184, 158, ${opacity})`, // Set the color of the line chart
      },
    ],
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

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: "#1E1E1E",
    backgroundGradientTo: "#1E1E1E",
    color: (opacity = 1) => `rgba(206, 184, 158, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
  };

  const [selectedOption, setSelectedOption] = useState("All");

  // Function to render the content based on the selected option
  const renderContent = () => {
    if (selectedOption === "All") {
      // Render the profile card for "All" option
      return (
        <ProfileCard
          data={{ name, image, desc, btnText, navStack, navigation }}
        />
      );
    } else if (selectedOption === "Painting") {
      const salesData = [
        {
          name: "Painting 1",
          status: "SOLD",
          date: "2023-07-19",
          price: "R100",
        },
        {
          name: "Painting 2",
          status: "SOLD",
          date: "2023-07-18",
          price: "R150",
        },
        // Add more sales data as needed
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index} style={styles.saleItem}>
              <View>
                <Text style={styles.saleItemName}>{sale.name}</Text>
                <View style={styles.saleItemDateStatus}>
                  <Text style={styles.saleGreenText}>
                    {" "}
                    {sale.status} - {sale.date}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.salePriceText}>Price: {sale.price}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (selectedOption === "Printmaking") {
      const salesData = [
        {
          name: "Printmaking 1",
          status: "SOLD",
          date: "2023-07-19",
          price: "R100",
        },
        {
          name: "Printmaking 2",
          status: "SOLD",
          date: "2023-07-18",
          price: "R150",
        },
        // Add more sales data as needed
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index} style={styles.saleItem}>
              <View>
                <Text style={styles.saleItemName}>{sale.name}</Text>
                <View style={styles.saleItemDateStatus}>
                  <Text style={styles.saleGreenText}>
                    {" "}
                    {sale.status} - {sale.date}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.salePriceText}>Price: {sale.price}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (selectedOption === "Textile Art") {
      const salesData = [
        {
          name: "Textile Art 1",
          status: "SOLD",
          date: "2023-07-19",
          price: "R100",
        },
        {
          name: "Textile Art 2",
          status: "SOLD",
          date: "2023-07-18",
          price: "R150",
        },
      ];
      return (
        <View style={styles.salesList}>
          {salesData.map((sale, index) => (
            <View key={index} style={styles.saleItem}>
              <View>
                <Text style={styles.saleItemName}>{sale.name}</Text>
                <View style={styles.saleItemDateStatus}>
                  <Text style={styles.saleGreenText}>
                    {" "}
                    {sale.status} - {sale.date}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.salePriceText}>Price: {sale.price}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    }
    // Add other cases for other navigation options if needed
  };
  return userData === null ? (
    <View style={styles.container}>
      <Imageloader />
    </View>
  ) : (
    <View style={styles.container}>
      <ProfilePic data={{ name, image, navigation }} />

      <Text style={styles.welcomeHeader}>Welcome to your Dashboard</Text>

      <LineChart
        data={data}
        width={350}
        height={200}
        chartConfig={chartConfig}
        style={styles.lineChart}
      />
      <Text style={styles.artworksHeader}>Artwork Sales</Text>

      {/* Navigation Menu */}
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
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Painting" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("Painting")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "Painting" && styles.activeMenuText,
            ]}
          >
            Painting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Printmaking" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("Printmaking")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "Printmaking" && styles.activeMenuText,
            ]}
          >
            Printmaking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.menuItem,
            selectedOption === "Textile Art" && styles.activeMenuItem,
          ]}
          onPress={() => setSelectedOption("Textile Art")}
        >
          <Text
            style={[
              styles.menuText,
              selectedOption === "Textile Art" && styles.activeMenuText,
            ]}
          >
            Textile Art
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginBottom: 30 }}>{renderContent()}</ScrollView>
    </View>
  );
};

export default DashboardScreen;
