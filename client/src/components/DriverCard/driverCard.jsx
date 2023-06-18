import Style from './driverCard.module.css';

const DriverCard = ({ id, name, image, teams }) => {


    return (
        <div className={Style.card}>
            <link to={`/details/${id}`} />
            <div className={Style.card_img}>
                <img src={image} alt={`Image of ${name.forename.slice(0,1).toUpperCase() + name.forename.slice(1)}`}/>
            </div>
            <div className={Style.card_info}>
                <div className={Style.text_body}>
                    <h2>{`${name.forename.slice(0,1).toUpperCase() + name.forename.slice(1)}} ${name.surname.slice(0,1).toUpperCase() + name.surname.slice(1)}}`}</h2>
                    <h2>{`Teams: ${teams}`}</h2>
                </div>
                <p className={Style.text_title}>{`ID: ${id}`}</p>
            </div>
        </div>
    )

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

