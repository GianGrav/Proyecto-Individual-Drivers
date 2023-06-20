import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { getDrivers, postDrivers } from '../../redux/driverSlice';

const DriverForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const teams = useSelector(state => state.driver.teams);

    console.log(teams);

    const [driverData, setDriverData] = useState({
        name: '',
        lastName: '',
        description: '',
        image: '',
        nationality: '',
        birthDate: '',
        teams: []
    });
    
    console.log(driverData); 
    const [error, setError] = useState({});

    useEffect(() => {
        validate();
    }, [driverData]);

    const handleChange = (event) => {
        setDriverData({
            ...driverData,
            [event.target.name]: event.target.value
        });
        validate();
    };

    const handleTeamChange = (event) => {
        const selectedTeams = Array.from(event.target.selectedOptions, option => option.value);
        setDriverData({
            ...driverData,
            teams: selectedTeams
        });
        validate();
    };

    const validate = () => {
        let errorValidate = {};

        if (driverData.name.length === 0) {
            errorValidate.name = 'Name must be provided';
        }

        if (driverData.name.length >= 50) {
            errorValidate.name = 'Name can only have 50 characters';
        }

        if (driverData.name.length > 0 && !/^[^0-9]*$/.test(driverData.name)) {
            errorValidate.name = 'Name must contain only characters';
        }

        setError(errorValidate);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(error).length === 0) {
            try {
                const { data } = await axios.post('http://localhost:3001/drivers', driverData);
                dispatch(postDrivers(data));

                const driversInfo = await axios('http://localhost:3001/drivers');
                dispatch(getDrivers(driversInfo.data));

                window.alert("Driver created successfully!");
                navigate('/home');
            } catch (error) {
                window.alert("There is an issue with creating the driver");
            }
        }
    };

    return (
        <div>
            <h1>📍 FORM PAGE | Create a New Driver</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label><br />
                    <input required type="text" name="name" value={driverData.name} onChange={handleChange} />
                    {
                        error.name && <p>{error.name}</p>
                    }
                </div>
                <br />

                <div>
                    <label htmlFor="lastName">Last Name:</label><br />
                    <input required type="text" name="lastName" value={driverData.lastName} onChange={handleChange} />
                </div>
                <br />

                <div>
                    <label htmlFor="nationality">Nationality:</label><br />
                    <input required type="text" name="nationality" value={driverData.nationality} onChange={handleChange} />
                </div>
                <br />

                <div>
                    <label htmlFor="image">Image:</label><br />
                    <input required type="text" name="image" value={driverData.image} onChange={handleChange} />
                </div>
                <br />

                <div>
                    <label htmlFor="birthDate">Birth Date:</label><br />
                    <input required type="date" name="birthDate" value={driverData.birthDate} onChange={handleChange} />
                </div>
                <br />

                <div>
                    <label htmlFor="description">Description:</label><br />
                    <textarea required name="description" value={driverData.description} onChange={handleChange}></textarea>
                </div>
                <br />

                <div>
                    <label htmlFor="teams">Teams:</label><br />
                    <select name="teams" multiple value={driverData.teams} onChange={handleTeamChange}>
                        {Array.isArray(teams) &&
                            teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <br />

                <div>
                    <button type="submit">Create Driver</button>
                </div>
            </form>
        </div>
    );
};

export default DriverForm;