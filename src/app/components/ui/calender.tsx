

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function Calender({mode, dateSelected, onSelect}: any) {

  return (
    <DayPicker
      animate
      mode="single"
      selected={dateSelected}
      onSelect={onSelect}
      footer={
        dateSelected ? `Selected: ${dateSelected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}
