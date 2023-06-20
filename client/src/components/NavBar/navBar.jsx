import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/searchBar";
import axios from "axios";
import {
  getDrivers,
  orderByAtoZ,
  orderByDOB,
  filterByTeams,
  filterByOrigin,
  getTeams,
} from "../../redux/driverSlice";

const NavBar = () => {
  const drivers = useSelector((state) => state.driver.allDrivers);
  const teams = useSelector((state) => state.driver.teams);

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const URL = "http://localhost:3001/drivers";
  const URLT = "http://localhost:3001/drivers/teams";

  useEffect(() => {
    getAllDrivers();
    getTeamsDrivers();
  }, []);

  const getAllDrivers = async () => {
    try {
      const { data } = await axios(URL);
      dispatch(getDrivers(data));
    } catch (error) {
      throw error.message;
    }
  };

  const getTeamsDrivers = async () => {
    try {
      const { data } = await axios(URLT);
      dispatch(getTeams(data));
    } catch (error) {
      throw error.message;
    }
  };

  const handleOrderByAtoZ = (order) => {
    dispatch(orderByAtoZ(order));
  };

  const handleOrderByDOB = (event) => {
    dispatch(orderByDOB(event.target.value));
  };

  const handleFilterByTeams = (event) => {
    const selectedTeamId = event.target.value;
    const selectedTeam = teams.find((team) => team.id === selectedTeamId);
    const selectedTeamName = selectedTeam ? selectedTeam.name : null;
    dispatch(filterByTeams(selectedTeamName));
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  return (
    <div>
      <div>
        <Link to="/home">
          <button onClick={getAllDrivers}>Home</button>
        </Link>
      </div>

      <div>{pathname === "/home" ? <SearchBar /> : null}</div>

      <div>
        {pathname === "/home" && (
          <>
            <div>
              <select
                name="alphabetical"
                onChange={(e) => handleOrderByAtoZ(e.target.value)}
              >
                <option disabled defaultValue>
                  Alphabetical Order
                </option>
                <option value="asc">From A to Z</option>
                <option value="desc">From Z to A</option>
              </select>
            </div>
            <div>
              <select name="dob" onChange={handleOrderByDOB}>
                <option disabled defaultValue>
                  Date of Birth Order
                </option>
                <option value="asc">Oldest First</option>
                <option value="desc">Youngest First</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div>
        {pathname === "/home" && (
          <>
            <div>
              <select name="teams" onChange={handleFilterByTeams}>
                <option disabled defaultValue>
                  Filter by Team
                </option>
                {Array.isArray(teams) &&
                  teams.map((team, index) => (
                    <option key={index} value={team.id}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <select name="origin" onChange={handleFilterByOrigin}>
                <option disabled defaultValue>
                  Filter by Origin
                </option>
                <option value="all">All</option>
                <option value="numeric">Numeric IDs</option>
                <option value="uuid">UUID IDs</option>
              </select>
            </div>
          </>
        )}
      </div>

      {pathname !== "/newdriver" && (
        <div>
          <Link to="/newdriver">
            <button>Create Driver</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
