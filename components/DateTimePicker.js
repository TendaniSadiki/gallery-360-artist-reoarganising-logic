import React, { useState } from "react";
import { View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDateTimePicker = ({
  visible,
  onDateChange,
  onTimeChange,
  onClose,
}) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(visible);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (event.type === "set" && selectedDate) {
      if (mode === "date") {
        onDateChange(selectedDate);
      } else {
        onTimeChange(selectedDate);
      }
    }
  };

  const showMode = (modeToShow) => {
    setMode(modeToShow);
    setShow(true);
  };

  return (
    <>
      {show && (
        <DateTimePicker
          value={new Date()} // You can customize this initial date
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View>
        <Button title="Select Date" onPress={() => showMode("date")} />
        <Button title="Select Time" onPress={() => showMode("time")} />
        <Button title="Close" onPress={onClose} />
      </View>
    </>
  );
};

export default CustomDateTimePicker;
