import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";
const Update = () => {
  const { users, loading } = useSelector((state) => {
    return state.app;
  });
  console.log(users);
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState();
  const dispatch = useDispatch();
  //   const taskId = parseInt(id);

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((user) => user._id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);
  console.log(updateData);
  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/");
  };
  return (
    <div>
      <form
        className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md p-6 mt-2"
        onSubmit={handleUpdate}
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
              value={updateData && updateData.first_name}
              onChange={newData}
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
              value={updateData && updateData.last_name}
              onChange={newData}
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
              value={updateData && updateData.email}
              onChange={newData}
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
              value={updateData && updateData.domain}
              onChange={newData}
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
              value={updateData && updateData.gender}
              onChange={newData}
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
            value={updateData && updateData.avatar}
            onChange={newData}
          />
        </div>

        <button
          type="submit"
          className="bg-violet-500 text-white rounded-md py-2 px-4 hover:bg-violet-400 mt-2"
        >
          Update Data
        </button>
      </form>
    </div>
  );
};

export default Update;
