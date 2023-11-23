import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateTeam = () => {
  const [teamName, setTeamName] = useState();
  const [teamDescription, setTeamDescription] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("user already exist");
      return;
    } else {
      alert("User added Successfully");
      setSearchResult([]);
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://crudd-5zab.onrender.com/api/v1/users/allusers?search=${search}`
      );
      const result = await response.json();
      console.log("waiting result createteam");
      console.log(result);

      const usersdata = result.usersdata || [];

      setLoading(false);
      setSearchResult(usersdata);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!teamName || !selectedUsers) {
      alert("please fill all fields");
      return;
    }
    try {
      const response = await fetch(
        "https://crudd-5zab.onrender.com/api/v1/teams/team",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            team_name: teamName,
            team_description: teamDescription,
            users: selectedUsers.map((u) => u._id),
          }),
        }
      );
      const data = await response.json();
      navigate("/showteams");
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleDelete = (delUser) => {
  //     setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  //   };

  return (
    <>
      <div className="container mx-auto mt-8 p-8 bg-violet-50 max-w-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Build a Team</h1>

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Team Name"
          onChange={(e) => setTeamName(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Team Description"
          onChange={(e) => setTeamDescription(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Add Users eg: Benjamin, Ranchell, Ane"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {/* 
        <div className="mb-4">
          {selectedUsers.map((u) => (
            <div key={u._id} className="flex items-center mb-2">
              <span className="mr-2">
                {u.first_name} {u.last_name}
              </span>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(u)}
              >
                Remove
              </button>
            </div>
          ))}
        </div> */}

        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {Array.isArray(searchResult) &&
              searchResult.map((user) => (
                <li
                  key={user._id}
                  className="text-black flex items-center mb-2 bg-purple-500"
                >
                  <div className="mr-2">
                    <span className="font-semibold mr-2">Name:</span>
                    <span>
                      {user.first_name} {user.last_name}
                    </span>
                    <div className="">
                      <h1 className="mb-1 ">
                        <span className="font-semibold mr-2">Available: </span>
                        {user.available}
                      </h1>
                    </div>
                    <div className="">
                      <h1 className="mb-1 ">
                        <span className="font-semibold mr-2">Domain: </span>
                        {user.domain}
                      </h1>
                    </div>
                  </div>
                  <button
                    className="ml-10 px-1 py-1 bg-green-500 text-white rounded flex items-end justify-end"
                    onClick={() => handleGroup(user)}
                  >
                    Add To My Team
                  </button>
                </li>
              ))}
          </ul>
        )}

        <button
          onClick={handleSubmit}
          className="bg-violet-500 hover:bg-violet-400 text-white px-4 py-2 rounded"
        >
          Create Team
        </button>
      </div>
    </>
  );
};
export default CreateTeam;
