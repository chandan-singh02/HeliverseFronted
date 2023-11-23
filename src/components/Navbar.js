import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="flex items-center justify-center bg-violet-300 p-4">
        <Link to="/" class="text-black mr-4 hover:text-gray-500">
          All Users
        </Link>
        <Link to="/createuser" class="text-black mr-4 hover:text-gray-500">
          Create User
        </Link>

        <Link to="/createteam" class="text-black hover:text-white mr-4 ">
          Create Team
        </Link>
        <Link to="/showteams" class="text-black hover:text-gray-500">
          Show Teams
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
