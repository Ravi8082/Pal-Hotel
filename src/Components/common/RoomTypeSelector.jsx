import React, { useState, useEffect } from "react";
import { getRoomTypes } from "../Utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);  // State to hold fetched room types
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);  // Toggle visibility of input for new room type
  const [newRoomType, setNewRoomType] = useState("");  // State to hold new room type input

  useEffect(() => {
    // Fetch room types from the API when the component mounts
    getRoomTypes()
      .then((data) => {
        setRoomTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching room types:", error);
      });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);  // Update the new room type value as the user types
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "" && !roomTypes.includes(newRoomType)) {
      // If new room type is valid, add it to roomTypes and update form state
      setRoomTypes((prevTypes) => [...prevTypes, newRoomType]);
      handleRoomInputChange({ target: { name: "roomType", value: newRoomType } });
      setNewRoomType("");  // Clear the input
      setShowNewRoomTypeInput(false);  // Hide the new room type input field
    }
  };

  return (
    <div>
      <select
        required
        className="form-select"
        name="roomType"
        value={newRoom.roomType}
        onChange={(e) => {
          if (e.target.value === "Add New") {
            setShowNewRoomTypeInput(true);  // Show the new room type input field
          } else {
            handleRoomInputChange(e);  // Handle room type change
          }
        }}
      >
        <option value="">Select a room type</option>
        <option value="Add New">Add New</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      {showNewRoomTypeInput && (
        <div className="mt-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter New Room Type"
              value={newRoomType}
              onChange={handleNewRoomTypeInputChange}
            />
            <button
              className="btn btn-hotel"
              type="button"
              onClick={handleAddNewRoomType}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomTypeSelector;
