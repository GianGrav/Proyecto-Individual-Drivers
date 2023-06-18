const axios = require('axios');
const { Teams } = require('../db');
const URL = 'http://localhost:5000/drivers';

const getTeams = async (req, res) => {
  try {
    const { data } = await axios.get(URL);
    let teams = data.map(obj => obj.teams);
    teams = teams.join(',').split(',');
    teams = teams.filter(team => team.trim() !== '' && team !== 'undefined');
    teams = [...new Set(teams)];

    await Teams.sync({ alter: true });

    for (const team of teams) {
      await Teams.create({ name: team });
    }

    res.status(200).json({ message: 'Tabla Teams creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los teams' });
  }
};

module.exports = { getTeams };