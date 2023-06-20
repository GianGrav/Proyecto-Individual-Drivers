import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allDrivers: [],
  drivers: [],
  driver: {},
  teams: [],
  originFilter: "",
};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    getDrivers: (state, { payload }) => {
      const data = payload;
      state.allDrivers = data;
      console.log(state.allDrivers);
      state.drivers = data;
    },
    getTeams: (state, { payload }) => {
      const data = payload;
      state.teams = data;
    },
    orderByAtoZ: (state, { payload }) => {
      const data = payload;
      const driversCopy = [...state.allDrivers];
      console.log(driversCopy);
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
        return teams.includes(payload.trim()); // Utilizar trim() para eliminar espacios en blanco alrededor del nombre del equipo
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
    addDriver: async (state, { payload }) => {
      const newDriver = {
        name: payload.name,
        lastName: payload.lastName,
        nationality: payload.nationality,
        image: payload.image,
        dateOfBirth: payload.dateOfBirth,
        description: payload.description,
        teams: payload.selectedTeams,
      };
    
      try {
        const response = await axios.post('http://localhost:3001/drivers', newDriver);
        const createdDriver = response.data;
        const updatedDrivers = [...state.allDrivers, createdDriver];
        return { ...state, allDrivers: updatedDrivers };
      } catch (error) {
        console.log('Error al crear el conductor:', error);
        return state;
      }
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
  addDriver,
} = driverSlice.actions;

export default driverSlice.reducer;