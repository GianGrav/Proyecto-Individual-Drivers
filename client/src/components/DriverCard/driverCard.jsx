import Style from './driverCard.module.css';
import { Link } from 'react-router-dom';

const DriverCard = ({ id, name, image, teams, lastName, Teams }) => {
    let forename, surname;
    let imageUrl;
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
        teamsText = Teams[0].name;
    }

    return (
        <div className={Style.card}>
            <Link to={`/details/${id}`}>
                <div className={Style.card_img}>
                    <img
                        className={Style.card_img_2}
                        src={imageUrl}
                        alt={`Image of ${forename && forename.slice(0, 1).toUpperCase() + forename.slice(1)}`}
                    />
                </div>
                <div className={Style.card_info}>
                    <div className={Style.text_body}>
                        <h2>
                            {`${forename && forename.slice(0, 1).toUpperCase() + forename.slice(1)} ${surname && surname.slice(0, 1).toUpperCase() + surname.slice(1)}`}
                        </h2>
                        {teamsText && <h2>{`Teams: ${teamsText}`}</h2>}
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

