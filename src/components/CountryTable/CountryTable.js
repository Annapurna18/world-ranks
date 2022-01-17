import { KeyboardArrowDownRounded, KeyboardArrowUpRounded, SwitchCamera } from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountryTable.module.css"
import Link from "next/Link"

const orderBy = (countries, value, direction) => {
    if (direction === "asc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1 );
    }
    if (direction === "desc") {
        return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1 );
    }
    return countries;
}

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>
    }
    if (direction == "desc") {
        return (<div className={styles.headingArrow}>
            <KeyboardArrowDownRounded color="inherit"></KeyboardArrowDownRounded>
        </div>);
    } else {
        return(<div className={styles.headingArrow}>
            <KeyboardArrowUpRounded color="inherit"></KeyboardArrowUpRounded>
        </div>);
    }

}
const CountryTable = ({countries}) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection("desc");
        } else if(direction === "desc") {
            setDirection("asc");
        } else {
            setDirection(null);
        }
    }

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    }

    return (
        <div>
        <div className={styles.heading}>
            <div className={styles.headingFlag}></div>
            <button className={styles.headingName} onClick={() => setValueAndDirection('name')}>
                <div>Name</div>
                {value === "name" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.headingPopulation} onClick={() => setValueAndDirection('population')}>
                <div>Population</div>
                {value === "population" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.headingArea} onClick={() => setValueAndDirection('area')}>
                <div>Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)</div>
                {value === "area" && <SortArrow direction={direction} />}
            </button>
            <button className={styles.headingGini} onClick={() => setValueAndDirection('gini')}>
                <div>Gini</div>
                {value === "gini" && <SortArrow direction={direction} />}
            </button>
        </div>
        {orderedCountries.map((country, i)=> (
            <Link href={`/country/${country.alpha3Code}`} key={i}>
                <div className={styles.row} key={i}>
                    <div className={styles.flag}>
                        <img src={country.flag} alt={country.name}></img>
                    </div>
                    <div className={styles.name}>{country.name}</div>
                    <div className={styles.population}>{country.population}</div>
                    <div className={styles.area}>{country.area || 0}</div>
                    <div className={styles.gini}>{country.gini || 0} %</div>
                </div>
            </Link>
            )
        )}
    </div>
    );
};

export default CountryTable;