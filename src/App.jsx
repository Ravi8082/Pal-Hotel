import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import NavBar from "./Components/layout/NavBar"
import EditRoom from "./Components/room/EditRoom"
import ExistingRooms from "./Components/room/ExistingRooms"
import RequireAuth from "./Components/auth/RequireAuth"
import Checkout from "./Components/booking/Checkout"
import RoomListing from "./Components/room/RoomListing"
import Admin from "./Components/Admin/Admin"
import BookingSuccess from "./Components/Booking/BookingSuccess"
import FindBooking from "./Components/booking/FindBooking"
import Login from "./Components/auth/Login"
import Registration from "./Components/auth/Registration"
import Profile from "./Components/auth/Profile"
import Bookings from "./Components/booking/Booking"
import Footer from "./Components/layout/Footer"
import AddRoom from "./Components/room/AddRoom"


function App() {
	return (
		<AuthProvider>
			<main>
				<Router>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/edit-room/:roomId" element={<EditRoom />} />
						<Route path="/existing-rooms" element={<ExistingRooms />} />
						<Route path="/add-room" element={<AddRoom />} />

						<Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<Checkout />
								</RequireAuth>
							}
						/>
						<Route path="/browse-all-rooms" element={<RoomListing />} />

						<Route path="/admin" element={<Admin/>} />
						<Route path="/booking-success" element={<BookingSuccess />} />
						<Route path="/existing-bookings" element={<Bookings />} />
						<Route path="/find-booking" element={<FindBooking />} />

						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />

						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<FindBooking />} />
					</Routes>
				</Router>
				<Footer />
			</main>
		</AuthProvider>
	)
}

export default App
