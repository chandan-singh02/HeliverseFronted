import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDetailSlice";
import { Link } from "react-router-dom";

const Card = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [gender, setGender] = useState("");
  const [available, setAvailable] = useState("");

  const { users, loading, currentPage, totalPages } = useSelector(
    (state) => state.app
  );
  //   console.log("users");
  //   console.log(users);

  useEffect(() => {
    dispatch(
      showUser({
        page: currentPage,
        search: searchInput,
        gender: gender,
        available: available,
      })
    );
  }, [dispatch, currentPage, searchInput, gender, available]);

  const handlePageChange = (newPage) => {
    dispatch(showUser({ page: newPage }));
  };

  const handleGenderChange = (e) => {
    dispatch(setGender(e.target.value));
    setGender(" ");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Loading Data...</h1>
      </div>
    );
  }

  const handleAvailableChange = (value) => {
    dispatch(setAvailable(value));
  };

  return (
    <>
      <div className="justify-center items-center flex mt-4">
        <input
          type="text"
          className="search-user-box m-0 p-0"
          placeholder="Search User"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center mt-3">
        <div className="flex items-center space-x-2 mr-4">
          <h1 className="font-semibold text-black dark:text-white">Gender:</h1>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 bg-white dark:bg-gray-800 text-black dark:text-white text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 dark:focus:border-blue-500 focus:shadow-outline-blue dark:focus:shadow-outline-blue transition ease-in-out duration-150"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="ml-4">
          <h1 className="font-semibold text-black dark:text-white">
            Available:
          </h1>
          <label className="flex items-center space-x-2 ">
            <input
              type="radio"
              name="available"
              value=""
              checked={available === " "}
              onChange={() => handleAvailableChange(" ")}
              className="form-radio h-4 w-4 text-black dark:text-white transition duration-150 ease-in-out"
            />
            <span className="text-black dark:text-white">All</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="available"
              value="true"
              checked={available === "true"}
              onChange={() => handleAvailableChange("true")}
              className="form-radio h-4 w-4 text-black dark:text-white transition duration-150 ease-in-out"
            />
            <span className="text-black dark:text-white">Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="available"
              value="false"
              checked={available === "false"}
              onChange={() => handleAvailableChange("false")}
              className="form-radio h-4 w-4 text-black dark:text-white transition duration-150 ease-in-out"
            />
            <span className="text-black dark:text-white">No</span>
          </label>
        </div>
      </div>
      <section className="py-7">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10 ">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((data) => (
              <div
                className="flex flex-col rounded-md shadow-md lg:mb-8 bg-violet-50"
                key={data._id}
              >
                <div className="p-2 flex flex-col items-center">
                  <img
                    src={data.avatar}
                    alt="user avatar"
                    className="w-20 h-20 border-b"
                  />
                  <h3 className="mt-2 mb-2 text-bookmark-blue text-lg font-semibold">
                    {data.first_name} {data.last_name}
                  </h3>
                </div>
                <hr className="border-b border-bookmark-whitee"></hr>
                <div className="flex justify-around p-3">
                  <div className="mt-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {data.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Gender:</span>
                      {data.gender}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Domain:</span>
                      {data.domain}
                      <p />

                      <div className="flex justify-around mt-1">
                        <Link
                          to={`/update/${data._id}`}
                          className="border-1 rounded-md p-1 text-blue-500 font-semibold hover:text-blue-500 transition ease-out duration-700 hover:scale-90"
                        >
                          Update
                        </Link>
                        <button
                          className="border-1 rounded-md p-1 text-red-500 font-semibold hover:text-red-600 transition ease-out duration-700 hover:scale-90"
                          onClick={() => {
                            console.log("Delete button clicked");
                            dispatch(deleteUser(data._id));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              <h1 className="text-3xl text-red-500 text-center">
                No Result Found
              </h1>
            </div>
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`mx-2 p-2 border ${
                  currentPage === page ? "bg-blue-500 text-red-500" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      </section>
      {/* Pagination */}
    </>
  );
};

export default Card;
