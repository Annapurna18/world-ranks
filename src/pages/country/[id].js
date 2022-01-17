import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout'
import styles from './country.module.css'

const getCountry = async (id) => {
    const response = await fetch(
        `https://restcountries.com/v2/alpha/${id}`
    );
    const country = await response.json();
    return country;
}
const Country = ({ country }) => {
    const [borders, setBorder] = useState([]);

    const getBorders = async () => {
        if (country.borders) {
            const borders = await Promise.all(
                country.borders.map((border) => getCountry(border))
            );
            setBorder(borders);
        }
    }

    useEffect(() => {
        getBorders();
    }, []);

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <div className={styles.overviewPanel}>
                        <img src={country.flag} alt={country.name}></img>

                        <h1 className={styles.overviewName}>{country.name}</h1>
                        <div className={styles.overviewRegion}>{country.region}</div>

                        <div className={styles.overviewNumbers}>
                            <div className={styles.overviewPopulation}>
                                <div className={styles.overviewValue}>{country.population}</div>
                                <div className={styles.overviewLabel}>Population</div>
                            </div>
                            <div className={styles.overviewArea}>
                                <div className={styles.overviewValue}>{country.area}</div>
                                <div className={styles.overviewLabel}>Area</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerRight}>
                    <div className={styles.detailPanel}>
                        <h4 className={styles.detailPanelHeading}>Details</h4>
                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailPanelLabel}>Capital</div>
                            <div className={styles.detailPanelValue}>{country.capital}</div>
                        </div>
                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailPanelLabel}>Subregion</div>
                            <div className={styles.detailPanelValue}>{country.subregion}</div>
                        </div>
                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailPanelLabel}>Subregion</div>
                            <div className={styles.detailPanelValue}>{country.subregion}</div>
                        </div>
                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailPanelLabel}>Languages</div>
                            <div className={styles.detailPanelValue}>{country.languages.map(({name}) => name).join(", ")}</div>
                        </div>
                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailPanelLabel}>Currencies</div>
                            <div className={styles.detailPanelValue}>{country.currencies.map(({name, symbol}) => `${name} (${symbol})`)}</div>
                        </div>
                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailPanelLabel}>Native name</div>
                            <div className={styles.detailPanelValue}>{country.nativeName}</div>
                        </div>
                        <div className={styles.detailPanelRow}>
                            <div className={styles.detailPanelLabel}>Gini</div>
                            <div className={styles.detailPanelValue}>{country.gini} %</div>
                        </div>

                        <div className={styles.detailPanelBorders}>
                            <div className={styles.detailPanelBordersLabel}>
                                Neighbouring Countries
                            </div>
                            <div className={styles.detailPanelBordersContainer}>
                                {borders.map(({flag, name}, i) => (
                                    <div className={styles.detailPanelBordersCountry} key={i}>
                                        <img src={flag} alt={name}></img>
                                        <div className={styles.detailPanelBordersName}>
                                            {name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Country;

export const getStaticPaths = async() => {
    const res = await fetch("https://restcountries.com/v2/all");
    const countries = await res.json();

    const paths = countries.map((country) => ({
        params: {id : country.alpha3Code}
    }));
    return {
        paths,
        fallback : false
    }

}

export const getStaticProps = async ({params}) => {
    const country = await getCountry(params.id);
    return {
        props: {country}
    };
};