import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
// import React, { useState, useEffect } from 'react';
// import moment from 'moment';

// const data = [
//     // Your data here
// ];

// const EventList = ({ category }) => {
//     const [events, setEvents] = useState([]);

//     useEffect(() => {
//         filterEventsByCategory(category);
//     }, [category]);

//     const filterEventsByCategory = (category) => {
//         const currentDate = moment();
//         const filteredEvents = data.filter((event) => {
//             const eventDate = moment(event.date.fromDate, 'D MMM,YYYY');
//             const timeDifference = eventDate.diff(currentDate);

//             if (category === 'future' && timeDifference > 0) {
//                 return true;
//             } else if (category === 'present' && timeDifference === 0) {
//                 return true;
//             } else if (category === 'past' && timeDifference < 0) {
//                 return true;
//             }
//             return false;
//         });

//         setEvents(filteredEvents);
//     };

//     return (
//         <div>
//             <h2>{category.toUpperCase()} Events</h2>
//             <ul>
//                 {events.map((item, index) => (
//                     <li key={index}>
//                         Name: {item.name}
//                         <br />
//                         Address: {item.address}
//                         <br />
//                         From Date: {item.date.fromDate}
//                         <br />
//                         To Date: {item.date.toDate}
//                         <br />
//                         Description: {item.desc}
//                         <br />
//                         Email: {item.email}
//                         <br />
//                         Contact Number: {item.contactNumber}
//                         <br />
//                         <br />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

//export default EventList;

const DateCheck = ({ newDate }) => {
  // Get the current date
  const currentDate = moment();

  console.log("newDate : ", newDate);
  // Create a target date from your date string
  //const dateString = "29 Jun, 2024";
  const targetDate = moment(newDate, "DD MMM, YYYY");

  let dateStatus = "";

  // Compare the current date with the target date
  if (currentDate.isBefore(targetDate)) {
    dateStatus = "Future";
  } else if (currentDate.isAfter(targetDate)) {
    dateStatus = "Past";
  } else {
    dateStatus = "Present";
  }

  return (
    <View>
      <Text
        style={{ color: "white" }}
      >{`The date is in the ${dateStatus}`}</Text>
    </View>
  );
};

export default DateCheck;
