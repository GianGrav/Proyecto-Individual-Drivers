import React from 'react';
import styles from './driverCard.module.css';
import { Link } from 'react-router-dom';

const DriverCard = ({ id, name, image, teams, lastName, Teams, dob, birthDate }) => {
    let forename, surname;
    let imageUrl;
    let fechaNacimiento;
    console.log(Teams);

    if (name && lastName) {
        forename = name;
        surname = lastName;
    } else if (name && name.forename && name.surname) {
        forename = name.forename;
        surname = name.surname;
    }

    if (image && image.url) {
        imageUrl = image.url;
    } else if (typeof image === 'string') {
        imageUrl = image;
    }

    let teamsText;
    if (teams) {
        teamsText = teams;
    } else if (Teams && Teams.length > 0) {
        teamsText = Teams.map(team => team.name).join(', ');
    }

    if (dob) {
        fechaNacimiento = dob
    } else if (birthDate) {
        fechaNacimiento = birthDate
    }

    return (
        <div className={styles.card}>
            <Link to={`/details/${id}`}>
                <div className={styles.card_img}>
                    <img
                        className={styles.card_img_2}
                        src={imageUrl}
                        alt={`Image of ${forename && forename.slice(0, 1).toUpperCase() + forename.slice(1)}`}
                    />
                </div>
                <div className={styles.card_info}>
                    <div className={styles.text_body}>
                        <h2>
                            {`${forename && forename.slice(0, 1).toUpperCase() + forename.slice(1)} ${surname && surname.slice(0, 1).toUpperCase() + surname.slice(1)}`}
                        </h2>
                        {teamsText && <h2>{`Teams: ${teamsText}`}</h2>}
                        <h2>{`DOB: ${fechaNacimiento}`}</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DriverCard;

{/* <div className={Style.card}>
    <link to={`/details/${id}`} />
    <div className={Style.card - img}>
        <img src={image} alt={`Image of ${name}`} />
    </div>
    <div className={Style.card - info}>
        <div className={Style.text - body}>
            <h2>{`${name.forename} ${name.surname}`}</h2>
            <h2>{`Teams: ${teams}`}</h2>
        </div>
        <p className={Style.text - title}>{`ID: ${id}`}</p>
    </div>
</div> */}

