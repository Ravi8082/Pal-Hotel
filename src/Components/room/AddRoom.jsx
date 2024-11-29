import React, { useState, useEffect } from "react";
import { addRoom, getRoomTypes } from "../Utils/ApiFunctions";  // Make sure getRoomTypes is imported
import RoomTypeSelector from "../common/RoomTypeSelector"; // Assuming this is a custom component
import { Link } from "react-router-dom";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    // Fetch room types when the component mounts
    async function fetchRoomTypes() {
      try {
        const types = await getRoomTypes(); // Assuming getRoomTypes() is a function from ApiFunctions
        setRoomTypes(types);
      } catch (error) {
        setErrorMessage("Error fetching room types: " + error.message);
      }
    }

    fetchRoomTypes();
  }, []);

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "roomPrice" && isNaN(value)) {
      setErrorMessage("Room price must be a valid number.");
      return;
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages
    setSuccessMessage(""); // Clear success message before submit

    if (!newRoom.roomType || !newRoom.roomPrice || !newRoom.photo) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Assuming addRoom returns a response indicating success/failure
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      
      if (success) {
        setSuccessMessage("A new room was added successfully!");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
      } else {
        setErrorMessage("Error adding new room. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error adding room: " + error.message); // Improved error handling
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  // Function to format price with the ₹ symbol
  const formatPrice = (price) => {
    if (price) {
      return `₹ ${price.toLocaleString()}`;  // Format with comma separators
    }
    return "₹ 0";  // Default if price is empty
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Add a New Room</h2>
          {successMessage && <div className="alert alert-success fade show">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger fade show">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">Room Type</label>
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={newRoom}
                roomTypes={roomTypes} // Pass roomTypes to the selector
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">Room Price (in ₹)</label>
              <input
                required
                type="number"
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
                placeholder="Enter room price"
              />
              {newRoom.roomPrice && (
                <small className="form-text text-muted">
                  Price: {formatPrice(newRoom.roomPrice)}
                </small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Room Photo</label>
              <input
                required
                name="photo"
                id="photo"
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview room photo"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mb-3"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link to="/existing-rooms" className="btn btn-outline-info">Existing rooms</Link>
              <button type="submit" className="btn btn-outline-primary ml-5">Save Room</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
