import React, { useState } from "react";
import { createUser } from "../features/userDetailSlice";
import { useDispatch } from "react-redux";
const Create = () => {
  const [users, setUsers] = useState({});
  const dispatch = useDispatch();

  const getUsersData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    console.log(users);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(users));
  };
  return (
    <div>
      <form
        className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6 mt-2"
        onSubmit={onSubmitHandler}
      >
        <div className="">
          <div className="mb-2">
            <label htmlFor="first_name" className="text-gray-700 font-bold">
              First Name:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              onChange={getUsersData}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="last_name" className="text-gray-700 font-bold">
              Last Name:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              onChange={getUsersData}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="text-gray-700 font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={getUsersData}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="domain" className="text-gray-700 font-bold">
              Domain:
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              onChange={getUsersData}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="gender" className="text-gray-700 font-bold">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              className="border border-gray-300 rounded-md p-2 w-full"
              onChange={getUsersData}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <label htmlFor="avatar" className="text-gray-700 font-bold">
            Avatar URL:
          </label>
          <input
            type="text"
            id="avatar"
            name="avatar"
            className="ml-2 border border-gray-300 rounded-md p-2 w-full"
            onChange={getUsersData}
          />
        </div>

        <button
          type="submit"
          className=" bg-violet-400 text-white rounded-md py-2 px-4 hover:bg-violet-300 mt-2"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Create;
