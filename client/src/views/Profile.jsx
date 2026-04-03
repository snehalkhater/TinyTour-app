import Navbar from "../components/Navbar"

function Profile() {
  return (
    <div>
      <Navbar />

      <h1 className="text-3xl text-center mt-10 playpen-sans">My Profile</h1>
      <div className="max-w-md mx-auto mt-6 bg-white p-5 rounded-lg shadow">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
      </div>
    </div>
  )
}

export default Profile