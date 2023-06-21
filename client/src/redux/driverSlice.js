import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drivers: [],
  allDrivers: [],
  driver: {},
  teams: [],
  originFilter: "",
  postDrivers: [],
};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    getDrivers: (state, { payload }) => {
      const data = payload;
      state.allDrivers = data;
      state.drivers = data;
    },
    getTeams: (state, { payload }) => {
      const data = payload;
      state.teams = data;
    },
    orderByAtoZ: (state, { payload }) => {
      const data = payload;
      const driversCopy = [...state.allDrivers];
      state.allDrivers = data === "asc"
        ? driversCopy.sort((a, b) => a.name.forename.localeCompare(b.name.forename))
        : driversCopy.sort((a, b) => b.name.forename.localeCompare(a.name.forename));
    },
    orderByDOB: (state, { payload }) => {
      const data = payload;
      const driversCopy = state.drivers.slice();
      state.allDrivers = data === "asc"
        ? driversCopy.sort((a, b) => new Date(a.dob) - new Date(b.dob))
        : driversCopy.sort((a, b) => new Date(b.dob) - new Date(a.dob));
    },
    filterByTeams: (state, { payload }) => {
      const filteredDrivers = state.drivers.filter((driver) => {
        const driverTeams = driver.teams ? driver.teams.split(",").map((team) => team.trim()) : [];
        const databaseTeams = driver.Teams ? driver.Teams.map((team) => team.name) : [];
        const allTeams = [...driverTeams, ...databaseTeams];
        return allTeams.some((team) => team === payload);
      });
      state.allDrivers = filteredDrivers;
    },
    filterByOrigin: (state, { payload }) => {
      const { drivers, allDrivers } = state;

      let filteredDrivers = [];

      if (payload === "all") {
        filteredDrivers = [...drivers];
      } else if (payload === "numeric") {
        filteredDrivers = drivers.filter(driver => typeof driver.id === "number");
      } else if (payload === "uuid") {
        filteredDrivers = drivers.filter(driver => typeof driver.id === "string");
      }

      return {
        ...state,
        allDrivers: filteredDrivers
      };
    },
    getDriverById: (state, { payload }) => {
      const data = payload;
      state.driver = data;
    },
    getDriverByName: (state, { payload }) => {
      const data = payload;
      state.allDrivers = data;
      state.drivers = data; 
    },
    postDrivers: (state, { payload }) => {
      const data = payload;
      state.postDrivers = data;
    },
    
  },
});

export const {
  getDrivers,
  getDriverById,
  orderByAtoZ,
  orderByDOB,
  filterByTeams,
  filterByOrigin,
  getDriverByName,
  getTeams,
  postDrivers,
} = driverSlice.actions;

export default driverSlice.reducer;