import React from "react";

function Logout() {
  const handleLogout = () => {
    // Clear auth tokens or any saved user data
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentPage"); // optional
    window.location.reload(); // simple reload or redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Logout</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Are you sure you want to logout? You will need to login again.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Confirm Logout
      </button>
    </div>
  );
}

export default Logout;
