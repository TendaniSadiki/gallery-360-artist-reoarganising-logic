import React, { useState } from "react";
// import { View, Text, StyleSheet, Button, TextInput, Picker } from 'react-native'
// import DateTimePicker from '@react-native-community/datetimepicker'

export default function useInput() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    setToggleInput(true);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const showDatepicker2 = () => {
    showMode("time");
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  return {
    date,
    showDatepicker,
    showDatepicker2,
    show,
    mode,
    onChange,
    toggleInput,
  };
}
