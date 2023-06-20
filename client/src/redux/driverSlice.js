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
      const { drivers, allDrivers } = state;
    
      const filteredDrivers = drivers.filter(driver => {
        const teams = driver.teams.split(", "); // Dividir la cadena de texto en un array de equipos
        return teams.some(team => team.name === payload.trim()); // Utilizar trim() para eliminar espacios en blanco alrededor del nombre del equipo
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