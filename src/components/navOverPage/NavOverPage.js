import React from "react";
import { Link } from "react-router-dom";
import geomageLogo from '../../images/geomageLogo.png';

export default function NavOverPage({ pages }) {
    const [currentPage, setCurrentPage] = React.useState('main');

    const onButtonClick = (evt) => {
        if (evt.target.innerHTML !== currentPage) {
            setCurrentPage(evt.target.innerHTML);
        } else {

        }
    };

    return (
        <div className="navigation__container">
            <div className="logo__container">
                <img className="logo__image" src={geomageLogo} />
            </div>
            <nav className="nav-over-page">
                {pages && pages.map((page, index) => {
                    return (
                        <button onClick={onButtonClick} key={index} className={`nav-over-page__button ${page === currentPage ? 'button-active' : 'button-inactive'}`}>
                            <Link className='nav-over-page__link' to={`/${page}`}>{page}</Link>
                        </button>
                    )
                })}
            </nav>
        </div>
    );
};
