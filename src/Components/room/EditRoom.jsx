import React, { useEffect, useState } from 'react'; // Added useState import
import { getRoomById, updateRoom } from '../Utils/ApiFunctions';
import { Link, useParams } from 'react-router-dom';

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { roomId } = useParams(); // Corrected variable naming style

  // Handle image input and preview
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage }); // Fixed typo from Room to room
    setImagePreview(URL.createObjectURL(selectedImage)); // Generates preview URL for the selected image
  };

  // Handle input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  // Fetch room details on component mount
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo); // Assuming `photo` is a base64 image string
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
  }, [roomId]);

  // Handle form submission to update the room
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Room updated successfully!");
        const updatedRoomData = await getRoomById(roomId); // Fetch updated room details
        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center mb-5 mt-5">Edit Room</h3>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6"> {/* Fixed className syntax */}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage} {/* Fixed typo: successMessagej to successMessage */}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label hotel-color">
                Room Type
              </label>
              <input
                type="text"
                className="form-control" // Added missing class
                id="roomType" // Added missing ID
                name="roomType" // Corrected missing name attribute
                value={room.roomType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label hotel-color">
                Room Price
              </label>
              <input
                type="number"
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                value={room.roomPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label hotel-color">
                Photo
              </label>
              <input
                required
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview} // Fixed template literal syntax
                  alt="Room preview"
                  style={{ maxWidth: "400px", maxHeight: "400px" }} // Fixed missing px unit
                  className="mt-3"
                />
              )}
            </div>
            <div className="d-grid gap-2 d-md-flex mt-2">
              <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                Back
              </Link>
              <button type="submit" className="btn btn-outline-warning">
                Edit Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
