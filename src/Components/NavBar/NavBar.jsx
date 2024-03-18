// NavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../Providers/AuthContext';

// Import your logo image
import LogoImage from '../../Assets/images/Logo.jpg';

const NavBar = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { user } = useAuth();

  const handleMenuToggle = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Listen for changes in the authentication status
  useEffect(() => {
    // You can perform any other actions here when the authentication status changes
    console.log('Authentication status changed:', user);
  }, [user]);

  return (
    <div>
      <header>
        <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-white bg-gray-800">
          {/* Line 2px above "Hotel Overlook" */}
          <div className="relative">
          <div className="absolute top-0 left-1/4 w-1/2 h-0.5 bg-yellow-500 opacity-50"></div>

            <h2 className="text-4xl relative z-10">Hotel Overlook</h2>
          </div>

          <FontAwesomeIcon
            icon={faBars}
            className="h-6 w-6 cursor-pointer md:hidden block text-gray-700 bg-gray-800"
            onClick={handleMenuToggle}
          />

          <div
            className={`${
              isMenuVisible ? 'block' : 'hidden'
            } w-full md:flex md:items-center md:w-auto`}
            id="menu"
          >
            <ul className="pt-4 text-base text-gray-100 md:flex md:justify-between md:pt-0 pr-16">
              <li>
                <Link to="/" className="md:p-4 py-2 block hover:text-red-600">
                  Forside&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>

              <li>
                <Link to="/hotels" className="md:p-4 py-2 block hover:text-red-600">
                  Hoteller & destinationer&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="md:p-4 py-2 block hover:text-red-600">
                  Værelser&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="md:p-4 py-2 block hover:text-red-600">
                  Reservation&nbsp;&nbsp;&nbsp;&nbsp;|
                </Link>
              </li>
              <li>
                <Link to="/login" className="md:p-4 py-2 block hover:text-red-600">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="text-yellow-500 pl-20 bg-gray-800 relative">
  {/* First star */}
  <FontAwesomeIcon icon={faStar} />
  {/* Line after the first star */}
  <div className="absolute top-1/2 left-8 transform -translate-y-0.5 w-56 h-0.5 bg-yellow-500"></div>
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
</div>




      {user && (
        <div className="text-white mt-4 bg-gray-800 p-2">
          You are logged in as {user.email}
        </div>
      )}
    </div>
  );
};

export default NavBar;

