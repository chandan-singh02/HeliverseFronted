import React, { useEffect } from "react";
import { showTeam } from "../features/teamDetailSlice";
import { useDispatch, useSelector } from "react-redux";
const ShowTeams = () => {
  const dispatch = useDispatch();
  const { showteams } = useSelector((state) => state.team);
  console.log(showteams);
  useEffect(() => {
    dispatch(showTeam());
  }, [dispatch]);
  return (
    <>
      <div className="md:flex items-center justify-evenly m-10 container mx-auto flex-wrap bg  ">
        {showteams.map((team) => (
          <div
            key={team._id}
            className="bg-violet-50 rounded-md shadow-md p-4 m-4 w-full md:w-1/3 lg:w-1/3 "
          >
            <h1 className="text-xl font-bold mb-2">{team.team_name}</h1>
            <h2 className="text-sm text-gray-600 mb-2">
              {team.team_description}
            </h2>
            <h3 className="text-sm text-gray-500">
              Number of Users: {team.users.length}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowTeams;
