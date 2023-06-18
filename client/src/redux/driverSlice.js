import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allDrivers: [],
    drivers: [],
    driver: {},
    newDrivers: [],
    teams: [],
    originFilter: "",
    filteredDrivers: [],
};

export const countrySlice = createSlice({
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
        getDriverById: (state, { payload }) => {
            const data = payload;
            state.driver = data;
        },
        orderByAtoZ: (state, { payload }) => {
            const data = payload;
            const driversCopy = state.drivers.slice();
            state.drivers = data === "A"
                ? driversCopy.sort((a, b) => a.name.localeCompare(b.name))
                : driversCopy.sort((a, b) => b.name.localeCompare(a.name));
        },
        orderByDOB: (state, { payload }) => {
            const data = payload;
            const driversCopy = state.drivers.slice();
            state.drivers = data === "A"
                ? driversCopy.sort((a, b) => new Date(a.dob) - new Date(b.dob))
                : driversCopy.sort((a, b) => new Date(b.dob) - new Date(a.dob));
        },
        filterByTeams: (state, { payload }) => {
            const selectedTeams = payload;
            state.drivers = state.filteredDrivers.filter((driver) =>
                selectedTeams.includes(driver.team)
            );

            const sortedDrivers = state.drivers
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name));
            state.drivers = sortedDrivers;
        },
        filterByOrigin: (state, { payload }) => {
            const selectedOrigin = payload;
            state.originFilter = selectedOrigin;

            if (selectedOrigin === "all") {
                state.filteredDrivers = state.allDrivers;
            } else {
                state.filteredDrivers = state.allDrivers.filter((driver) => {
                    const isNumericId = typeof driver.id === "number";
                    return (selectedOrigin === "numeric" && isNumericId) ||
                        (selectedOrigin === "uuid" && !isNumericId);
                });
            }

            const sortedDrivers = state.filteredDrivers
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name));
            state.filteredDrivers = sortedDrivers;
        },
        getDriverByName: (state, { payload }) => {
            const data = payload;
            state.drivers = data;
            state.allDrivers = data;
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
} = countrySlice.actions;

export default countrySlice.reducer;