// Login.jsxx

import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../../Providers/SupabaseProvider";
import { ContentWrapper } from "../../Components/ContentWrapper/ContentWrapper";
import { useAuth } from '../../Providers/AuthContext';

const LoginPage = () => {
    const { supabase } = useSupabase();
    const { login, logout } = useAuth();
    const [session, setSession] = useState(null);
    const [reservations, setReservations] = useState([]);
    const location = useLocation();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }

            // Clear reservations from local storage for the current user
            const currentUserEmail = session.user.email;
            localStorage.removeItem(currentUserEmail);

            // Redirect or perform any additional actions after logout
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    useEffect(() => {
        supabase?.auth?.getSession().then(({ data: { session } }) => {
            if (session) {
                login(session.user);
            } else {
                logout();
            }
        });
        if (supabase && supabase.auth) {
            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });
            return () => subscription.unsubscribe();
        }
    }, [supabase]);

    useEffect(() => {
      const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
      setReservations(storedReservations);
    }, []);
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const checkInDate = searchParams.get('checkInDate');
      const checkOutDate = searchParams.get('checkOutDate');
      const destination = searchParams.get('destination');
      const roomType = searchParams.get('roomType');
  
      if (checkInDate && checkOutDate && destination && roomType) {
        const newReservation = {
          checkInDate,
          checkOutDate,
          destination,
          roomType
        };
  
        // Save the reservation to local storage
        const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        const updatedReservations = [...existingReservations, newReservation];
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
  
        // Update state
        setReservations(updatedReservations);
      }
    }, [location.search]);
    useEffect(() => {
        // Retrieve reservations from localStorage when component mounts
        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        setReservations(storedReservations);
    }, []);

    const handleDeleteReservation = (index) => {
        const updatedReservations = [...reservations];
        updatedReservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(updatedReservations));
        setReservations(updatedReservations);
    };

    const saveReservation = async (reservationData) => {
        try {
            const user = supabase.auth.user();
            if (!user) {
                throw new Error("User not authenticated");
            }

            // Get existing reservations for the user from local storage
            const existingReservations = JSON.parse(localStorage.getItem(user.email)) || [];

            // Add the new reservation to the existing list
            const updatedReservations = [...existingReservations, reservationData];

            // Save the updated reservations back to local storage
            localStorage.setItem(user.email, JSON.stringify(updatedReservations));

            console.log("Reservation saved successfully:", reservationData);
        } catch (error) {
            console.error("Error saving reservation:", error.message);
        }
    };

    if (!session) {
        return (
            <ContentWrapper title="Hotel Overlook > Login" description="Login to the site">
                <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                        <h3 className="text-2xl font-bold mb-4">Login</h3>
                        <Auth
                            supabaseClient={supabase}
                            appearance={{ theme: ThemeSupa }}
                            providers={[]} // Remove providers if not needed
                        />
                    </div>
                    {/* Vertical red line on the right side */}
                    <div className="vl bg-gray-400 h-3/4 w-1 absolute lg:right-64 sm:right-0 right-0 lg:left-auto left-auto" />
                </div>
            </ContentWrapper>
        );
    } else {
        return (
<ContentWrapper title="Logged in">
    <p>You are logged in as {session.user.email}</p>
    <button onClick={handleLogout} className="text-indigo-500 hover:text-indigo-600">
        Log out
    </button>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> {/* Brug CSS grid til at oprette et grid-layout med en kolonne på mindre skærme og flere kolonner på større skærme */}
        {/* Display imported reservation details */}
        {reservations.map((reservation, index) => (
            <div key={index} className="border p-4"> {/* Tilføjet en border og padding til hver reservation */}
                <h4 className="font-bold">Reservation {index + 1}:</h4>
                <p>Check-in Date: {reservation.checkInDate}</p>
                <p>Check-out Date: {reservation.checkOutDate}</p>
                <p>Destination: {reservation.destination}</p>
                <p>Room Type: {reservation.roomType}</p>
                <button onClick={() => handleDeleteReservation(index)}>Delete</button>
            </div>
        ))}
    </div>
</ContentWrapper>



        );
    }
};

export default LoginPage;
