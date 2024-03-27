import React from "react";
import { Link, useHistory } from "react-router-dom";
import geomageLogo from '../../images/geomageLogo.png';

export default function NavOverPage({ pages, onClick }) {
    const history = useHistory();
    const [currentPage, setCurrentPage] = React.useState('main');

    const onButtonClick = (evt) => {
        if (evt.target.innerHTML !== currentPage) {
            setCurrentPage(evt.target.innerHTML);
            onClick(evt.target.innerHTML);
        }
    };

    return (
        <div className="navigation__container">
            <div className="logo__container">
                <img className="logo__image" src={geomageLogo} alt="Geomage-2003 LTD" onClick={() => { window.open('https://www.geomage.com', 'Geomage home page') }} />
                <span className="logo__powered-by" onClick={() => { window.open('https://www.geomage.com', 'Geomage home page') }}>
                    powered by
                </span>
            </div>
            <nav className="nav-over-page">
                {pages && pages.map((page, index) => {
                    return (
                        page.isActive ?
                            <button onClick={onButtonClick} key={index} className={`nav-over-page__button ${page.name === currentPage ? 'button-active' : 'button-inactive'}`}>
                                <Link className='nav-over-page__link' to={`/${page.name}`}>{page.name}</Link>
                            </button>
                            : <button key={index} className='nav-over-page__button button_disabled'>
                                <p className='nav-over-page__link'>{page.name}</p>
                            </button>
                    )
                })}
            </nav>
        </div>
    );
};
