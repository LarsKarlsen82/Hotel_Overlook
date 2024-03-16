// //HotelDetails.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { useSupabase } from '../../Providers/SupabaseProvider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
// import { faCircleUp, faCircleDown } from '@fortawesome/free-regular-svg-icons';

// const HotelDetails = ({ navigateToReservations }) => { 
//   const { city, hotelId } = useParams();
//   const { supabase } = useSupabase();
//   const [hotel, setHotel] = useState(null);
//   const [facilities, setFacilities] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [collapsedRooms, setCollapsedRooms] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { data: hotelData, error: hotelError } = await supabase
//           .from('hotels')
//           .select('*')
//           .eq('id', hotelId)
//           .single();

//         if (hotelError) {
//           throw new Error('Error fetching hotel details');
//         }

//         setHotel(hotelData);

//         const roomIds = hotelData.rooms ? hotelData.rooms.split(',').map(id => parseInt(id.trim(), 10)) : [];

//         const { data: roomsData, error: roomsError } = await supabase
//           .from('rooms')
//           .select('*')
//           .in('id', roomIds);

//         if (roomsError) {
//           throw new Error('Error fetching rooms');
//         }

//         setRooms(roomsData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching hotel details:', error.message);
//         setError(error.message);
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [supabase, hotelId]);

//   useEffect(() => {
//     async function fetchHotelFacilities() {
//       try {
//         if (!hotel) {
//           throw new Error('Hotel data is not available');
//         }

//         const { data: facilitiesData, error: facilitiesError } = await supabase
//           .from('hotel_facilities')
//           .select('*')
//           .in('id', hotel && hotel.hotelfacility_ids ? hotel.hotelfacility_ids.split(',') : []);

//         if (facilitiesError) {
//           throw new Error('Error fetching hotel facilities');
//         }

//         setFacilities(facilitiesData);
//       } catch (error) {
//         console.error('Error fetching hotel facilities:', error.message);
//         setError(error.message);
//       }
//     }

//     if (hotel) {
//       fetchHotelFacilities();
//     }
//   }, [supabase, hotel]);

//   const toggleRoomCollapse = async (roomId) => {
//     setCollapsedRooms((prevState) => ({
//       ...prevState,
//       [roomId]: !prevState[roomId],
//     }));

//     if (!collapsedRooms[roomId]) {
//       try {
//         const room = rooms.find((room) => room.id === roomId);
//         if (!room || !room.id) {
//           throw new Error('Room ID not found');
//         }

//         const { data: roomFacilitiesData, error: roomFacilitiesError } = await supabase
//           .from('room_facilities')
//           .select('*')
//           .eq('room_facility_category_id', roomId);

//         if (roomFacilitiesError) {
//           throw new Error('Error fetching room facilities');
//         }

//         setRooms((prevRooms) =>
//           prevRooms.map((room) =>
//             room.id === roomId
//               ? {
//                   ...room,
//                   facilities: roomFacilitiesData,
//                 }
//               : room
//           )
//         );
//       } catch (error) {
//         console.error('Error fetching room facilities:', error.message);
//         setError(error.message);
//       }
//     }
//   };

//   // const handleReservation = (roomId) => {
//   //   navigate(`/reservation?hotelId=${hotelId}&hotelTitle=${encodeURIComponent(hotel.title)}&roomId=${roomId}`);
//   // };
//   const handleReservation = (roomId, dayPriceNormal, dayPriceFlex) => {
//     navigate(`/reservation?hotelId=${hotelId}&hotelTitle=${encodeURIComponent(hotel.title)}&roomId=${roomId}&priceClass=${dayPriceFlex ? 'Flex' : 'Normal'}`);
//   };
  


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="relative">
//       <img src="/src/Assets/images/HotelRoom.jpg" alt="Hotel Room" className="w-full h-auto object-cover" />
//       <div className="flex flex-col md:flex-row m-10">
//         <div className="flex-1 md:pr-4">
//           <div>
//             <Link to="/">Home</Link> {'>'}
//             <Link to="/hotels"> Hotels</Link> {'>'}
//             <span>{hotel && hotel.title}</span>
//           </div>
//           <br />
//           <h2 className="text-2xl font-bold mb-4">{hotel && hotel.title}</h2>
//           <br />
//           <p>{hotel && hotel.description}</p>
//           <br />
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Vores værelser</h2>
//             {rooms && rooms.map(room => (
//               <div key={room.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white  p-4 rounded-md mb-4 hover:bg-gray-100 transition duration-300 relative">
//                 <div key="image">
//                   {room.image_id && <img src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${room.image_id}.jpg`} alt={room.title} className="w-full h-auto object-cover" />}
//                 </div>
//                 <div key="icon" className="flex flex-col justify-center items-center absolute inset-x-0 bottom-0">
//                   <FontAwesomeIcon icon={collapsedRooms[room.id] ? faCircleUp : faCircleDown} className="text-gray-500 text-4xl" onClick={() => toggleRoomCollapse(room.id)} style={{ zIndex: 10 }} />
//                 </div>
//                 <div key="details">
//                   <h3 className="text-lg font-bold">{room.title}</h3>
//                   <p>Areal: {room.area}</p>
//                   <p>Antal personer: {room.num_persons}</p>
//                   <br />
//                   <p>{room.description}</p>
//                   {collapsedRooms[room.id] && room.facilities !== undefined && (
//                     <>
//                       <h4 className="text-lg font-bold mt-6">Vores værelser er udstyret med:</h4>
//                       {room.facilities.map(facility => (
//                         <p key={facility.id}><span className="mr-2 mt-10">•</span>{facility.title}</p>
//                       ))}
//                     </>
//                   )}
//                 </div>
//                 {collapsedRooms[room.id] && (
//                   <>
//                     <div className="bg-gray-200 p-4 rounded-md relative">
//                       <h4 className="text-lg font-bold">Day Price Normal</h4>
//                       <p>Kan ikke ændres eller afbestilles</p>
//                       <p className="text-left">{room.day_price_normal} DKK</p>
//                       <button onClick={() => handleReservation(room.id, room.day_price_normal, room.day_price_flex)} className="bg-red-500 text-white p-2 rounded-md absolute bottom-2 right-4">Book</button>

//                     </div>
//                     <div className="bg-gray-200 p-4 rounded-md relative">
//                       <h4 className="text-lg font-bold">Day Price Flex</h4>
//                       <p>Kan ændres eller afbestilles</p>
//                       <p className="text-left">{room.day_price_flex} DKK</p>
//                       <button onClick={() => handleReservation(room.id, room.day_price_normal, room.day_price_flex)} className="bg-red-500 text-white p-2 rounded-md absolute bottom-2 right-4">Book</button>

//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Faciliteter */}
//         <div className="flex-1 md:pl-4">
//           <h2 className="text-2xl font-bold mb-4">Faciliteter</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {facilities && facilities.map(facility => (
//               <div key={facility.id} className="bg-white p-4 rounded-md hover:bg-gray-100 transition duration-300">
//                 <h3 className="text-lg font-bold">{facility.title}</h3>
//                 <p>{facility.description}</p>
//               </div>
//             ))}
//           </div>
//           <br />
//           <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
//           <div className="bg-white p-4 rounded-md hover:bg-gray-100 transition duration-300">
//             <p><FontAwesomeIcon icon={faLocationDot} className="mr-2" />{hotel && hotel.address}</p>
//             <p><FontAwesomeIcon icon={faPhone} className="mr-2" />{hotel && hotel.phone}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelDetails;

//HotelDetails
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSupabase } from '../../Providers/SupabaseProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faCircleUp, faCircleDown } from '@fortawesome/free-regular-svg-icons';

const HotelDetails = ({ navigateToReservations }) => {
  const { city, hotelId } = useParams();
  const { supabase } = useSupabase();
  const [hotel, setHotel] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedRooms, setCollapsedRooms] = useState({});
  const [selectedPriceClass, setSelectedPriceClass] = useState('Normal'); // State for selected price class
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch hotel data
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', hotelId)
          .single();

        if (hotelError) {
          throw new Error('Error fetching hotel details');
        }

        setHotel(hotelData);

        // Fetch room data
        const roomIds = hotelData.rooms ? hotelData.rooms.split(',').map(id => parseInt(id.trim(), 10)) : [];
        const { data: roomsData, error: roomsError } = await supabase
          .from('rooms')
          .select('*')
          .in('id', roomIds);

        if (roomsError) {
          throw new Error('Error fetching rooms');
        }

        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel details:', error.message);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase, hotelId]);

  useEffect(() => {
    async function fetchHotelFacilities() {
      try {
        if (!hotel) {
          throw new Error('Hotel data is not available');
        }

        // Fetch hotel facilities
        const { data: facilitiesData, error: facilitiesError } = await supabase
          .from('hotel_facilities')
          .select('*')
          .in('id', hotel.hotelfacility_ids ? hotel.hotelfacility_ids.split(',') : []);

        if (facilitiesError) {
          throw new Error('Error fetching hotel facilities');
        }

        setFacilities(facilitiesData);
      } catch (error) {
        console.error('Error fetching hotel facilities:', error.message);
        setError(error.message);
      }
    }

    if (hotel) {
      fetchHotelFacilities();
    }
  }, [supabase, hotel]);

  useEffect(() => {
    // Initialize selected price class based on URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const priceClass = urlParams.get('priceClass');
    if (priceClass && (priceClass === 'Normal' || priceClass === 'Flex')) {
      setSelectedPriceClass(priceClass);
    }
  }, []);

  const toggleRoomCollapse = async (roomId) => {
    setCollapsedRooms((prevState) => ({
      ...prevState,
      [roomId]: !prevState[roomId],
    }));

    if (!collapsedRooms[roomId]) {
      try {
        const room = rooms.find((room) => room.id === roomId);
        if (!room || !room.id) {
          throw new Error('Room ID not found');
        }

        const { data: roomFacilitiesData, error: roomFacilitiesError } = await supabase
          .from('room_facilities')
          .select('*')
          .eq('room_facility_category_id', roomId);

        if (roomFacilitiesError) {
          throw new Error('Error fetching room facilities');
        }

        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId
              ? {
                  ...room,
                  facilities: roomFacilitiesData,
                }
              : room
          )
        );
      } catch (error) {
        console.error('Error fetching room facilities:', error.message);
        setError(error.message);
      }
    }
  };

  const handlePriceClassChange = (priceClass) => {
    setSelectedPriceClass(priceClass); // Update selected price class when the Normal or Flex button is clicked
  };

  // Function to handle reservation
  const handleReservation = (roomId, dayPriceNormal, dayPriceFlex) => {
    // Pass the selected price class as a query parameter
    navigate(`/reservation?hotelId=${hotelId}&hotelTitle=${encodeURIComponent(hotel.title)}&roomId=${roomId}&priceClass=${selectedPriceClass}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      <img src="/src/Assets/images/HotelRoom.jpg" alt="Hotel Room" className="w-full h-auto object-cover" />
      <div className="flex flex-col md:flex-row m-10">
        <div className="flex-1 md:pr-4">
          {/* Hotel details */}
          <div>
            <Link to="/">Home</Link> {'>'}
            <Link to="/hotels"> Hotels</Link> {'>'}
            <span>{hotel && hotel.title}</span>
          </div>
          <br />
          <h2 className="text-2xl font-bold mb-4">{hotel && hotel.title}</h2>
          <br />
          <p>{hotel && hotel.description}</p>
          <br />
          <div>
            <h2 className="text-2xl font-bold mb-4">Vores værelser</h2>
            {/* Render room details */}
            {rooms && rooms.map(room => (
              <div key={room.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white  p-4 rounded-md mb-4 hover:bg-gray-100 transition duration-300 relative">
                <div key="image">
                  {room.image_id && <img src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${room.image_id}.jpg`} alt={room.title} className="w-full h-auto object-cover" />}
                </div>
                <div key="icon" className="flex flex-col justify-center items-center absolute inset-x-0 bottom-0">
                  <FontAwesomeIcon icon={collapsedRooms[room.id] ? faCircleUp : faCircleDown} className="text-gray-500 text-4xl" onClick={() => toggleRoomCollapse(room.id)} style={{ zIndex: 10 }} />
                </div>
                <div key="details">
                  <h3 className="text-lg font-bold">{room.title}</h3>
                  <p>Areal: {room.area}</p>
                  <p>Antal personer: {room.num_persons}</p>
                  <br />
                  <p>{room.description}</p>
                  {/* Render room facilities */}
                  {collapsedRooms[room.id] && room.facilities !== undefined && (
                    <>
                      <h4 className="text-lg font-bold mt-6">Vores værelser er udstyret med:</h4>
                      {room.facilities.map(facility => (
                        <p key={facility.id}><span className="mr-2 mt-10">•</span>{facility.title}</p>
                      ))}
                    </>
                  )}
                </div>
                {collapsedRooms[room.id] && (
  // Render book buttons
  <>
    <div className="bg-gray-200 p-4 rounded-md relative">
      <h4 className="text-lg font-bold">Day Price Normal</h4>
      <p>Kan ikke ændres eller afbestilles</p>
      <p className="text-left">{room.day_price_normal} DKK</p>
      {/* Use handleReservation function with the selected price class */}
      <button onClick={() => { handlePriceClassChange('Normal'); handleReservation(room.id, room.day_price_normal, room.day_price_flex); }} className="bg-red-500 text-white p-2 rounded-md absolute bottom-2 right-4">Book</button>
    </div>
    <div className="bg-gray-200 p-4 rounded-md relative">
      <h4 className="text-lg font-bold">Day Price Flex</h4>
      <p>Kan ændres eller afbestilles</p>
      <p className="text-left">{room.day_price_flex} DKK</p>
      {/* Use handleReservation function with the selected price class */}
      <button onClick={() => { handlePriceClassChange('Flex'); handleReservation(room.id, room.day_price_normal, room.day_price_flex); }} className="bg-red-500 text-white p-2 rounded-md absolute bottom-2 right-4">Book</button>
    </div>
  </>
)}

              </div>
            ))}
          </div>
        </div>

        {/* Faciliteter */}
        <div className="flex-1 md:pl-4">
          <h2 className="text-2xl font-bold mb-4">Faciliteter</h2>
          {/* Render hotel facilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities && facilities.map(facility => (
              <div key={facility.id} className="bg-white p-4 rounded-md hover:bg-gray-100 transition duration-300">
                <h3 className="text-lg font-bold">{facility.title}</h3>
                <p>{facility.description}</p>
              </div>
            ))}
          </div>
          <br />
          <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
          {/* Render contact details */}
          <div className="bg-white p-4 rounded-md hover:bg-gray-100 transition duration-300">
            <p><FontAwesomeIcon icon={faLocationDot} className="mr-2" />{hotel && hotel.address}</p>
            <p><FontAwesomeIcon icon={faPhone} className="mr-2" />{hotel && hotel.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
