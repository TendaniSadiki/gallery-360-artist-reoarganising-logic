import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  orderBy, // Import orderBy for sorting
  onSnapshot,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { View, Text } from "react-native";

function useFetchUpcoming() {
  const [upComing, setUpComing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Function to fetch and sort data
  const fetchData = () => {
    const colRef = collection(FIRESTORE_DB, "exhibition");
    const currentDate = moment().format("YYYY-MM-DD");
    const timestamp = Timestamp.fromDate(new Date(currentDate)); // Create a Timestamp object

    // Query for upcoming events, sort by fromDate in ascending order
    const q = query(
      colRef,
      where("fromDate", ">=", timestamp), // Filter for upcoming events
      orderBy("fromDate", "asc") // Sort by fromDate in ascending order
    );

    onSnapshot(
      q,
      (querySnapshot) => {
        const collection = [];
        querySnapshot.docs.forEach((doc) => {
          collection.push({ ...doc.data(), key: doc.id });
        });

        setUpComing(collection);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("upcoming : ", upComing);
  if (isLoading) {
    return (
      <View style={{ color: "white", backgroundColor: "white" }}>
        <Text style={{ color: "white", backgroundColor: "white" }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ color: "white", backgroundColor: "white" }}>
        <Text style={{ color: "white", backgroundColor: "white" }}>
          Error fetching data
        </Text>
      </View>
    );
  }

  return (
    <View style={{ color: "white", backgroundColor: "white" }}>
      {upComing.map((item) => (
        <>
          <Text style={{ color: "white", backgroundColor: "white" }}>
            Upcoming Data
          </Text>
          <Text
            style={{ color: "white", backgroundColor: "white" }}
            key={item.key}
          >
            {item.name}
          </Text>
        </>
      ))}
    </View>
  );
}

export default useFetchUpcoming;

/*
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../firebase/firebase.config";
import {
  collection,
  query,
  where,
  orderBy, // Import orderBy for sorting
  onSnapshot,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { View, Text } from "react-native";

function useFetchUpcoming() {
  const [upComing, setUpComing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Function to fetch and sort data
  const fetchData = () => {
    const colRef = collection(FIRESTORE_DB, "exhibition");
    const currentDate = moment().format("YYYY-MM-DD");
    const timestamp = Timestamp.fromDate(new Date(currentDate)); // Create a Timestamp object

    // Query for upcoming events, sort by fromDate in ascending order
    const q = query(
      colRef,
      where("fromDate", ">=", timestamp), // Filter for upcoming events
      orderBy("fromDate", "asc") // Sort by fromDate in ascending order
    );

    onSnapshot(
      q,
      (querySnapshot) => {
        const collection = [];
        querySnapshot.docs.forEach((doc) => {
          collection.push({ ...doc.data(), key: doc.id });
        });

        setUpComing(collection);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... rest of your code
}

export default useFetchUpcoming;
*/
