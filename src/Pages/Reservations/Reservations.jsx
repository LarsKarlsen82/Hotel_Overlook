// //Reservations.jsx
// import React, { useState, useEffect } from 'react';
// import { useSupabase } from '../../Providers/SupabaseProvider';
// import { useParams } from 'react-router-dom';

// const Reservation = () => {
//   const initialFormData = {
//     destination: '',
//     roomType: '',
//     numberOfPeople: '',
//     priceClass: '',
//     checkInDate: '',
//     checkOutDate: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     comments: '',
//     acceptTerms: false,
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const today = new Date().toISOString().split('T')[0];
//   const urlParams = new URLSearchParams(window.location.search);
//   const hotelId = urlParams.get('hotelId');
//   const hotelTitle = urlParams.get('hotelTitle');
//   const roomId = urlParams.get('roomId');

//   const supabase = useSupabase();
//   const [hotelIds, setHotelIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const priceClass = urlParams.get('priceClass'); 

//   const validateForm = () => {
//     const errors = {};

//     ['destination', 'roomType', 'numberOfPeople', 'priceClass', 'checkInDate', 'checkOutDate', 'firstName', 'lastName', 'email', 'phone', 'acceptTerms'].forEach((field) => {
//       if (!formData[field]) {
//         errors[field] = 'Dette felt skal udfyldes.';
//       }
//     });

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: checked ? name : '',
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//       setIsSubmitted(true);
//     }
//   };

//   const handleCancel = () => {
//     setFormData(initialFormData);
//     setFormErrors({});
//     setIsSubmitted(false);
//   };

//   // Set the initial state of formData.priceClass using the received price class
//   useEffect(() => {
//     setFormData(prevData => ({
//       ...prevData,
//       priceClass: priceClass || '' // Set the received price class or an empty string if not provided
//     }));
//   }, [priceClass]);

//   // Set the state of the radio buttons when the price class changes
//   useEffect(() => {
//     // Update the state based on the selected price class
//     if (priceClass === 'Normal' || priceClass === 'Flex') {
//       setFormData(prevData => ({
//         ...prevData,
//         priceClass: priceClass
//       }));
//     }
//   }, [priceClass]);


//   useEffect(() => {
//     async function fetchHotelIds() {
//       try {
//         const { data, error } = await supabase.supabase
//           .from('hotels')
//           .select('title');

//         if (error) {
//           console.error('Error fetching hotel IDs:', error.message);
//           setLoading(false);
//           return;
//         }

//         const ids = data.map(hotel => hotel.title);
//         setHotelIds(ids);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching hotel IDs:', error.message);
//         setLoading(false);
//       }
//     }

//     fetchHotelIds();
//   }, [supabase]);

//   // Define a lookup object mapping room IDs to room titles
// const roomTitles = {
//   1: 'Economy Room',
//   2: 'Superior Plus Room',
//   3: 'Superior',
//   4: 'Junior Suite',
//   5: 'Presidential Suite',
//   6: 'Standard Single',
//   7: 'Standard'
//   // Add more room IDs and titles as needed
// };

// const renderHotelDetails = hotelId && hotelTitle && roomId && (
//   <div className="mt-8 p-4 bg-gray-100">
//     <h2 className="text-xl font-bold">Huskeseddel</h2>
//     <br />
//     <p>Valgt hotel : {hotelTitle}</p>
//     <p>Valgt værelse: {roomTitles[roomId]}</p>
//   </div>
// );
//   return (
//     <div className="container mx-auto mt-8 p-4">
//       <div className="reservation-form-container max-w-md mr-4">
//         <h2 className="text-xl font-bold">Hotel Overlook &gt; Reservation</h2>
//         <br />
//         <h3 className="text-2xl font-bold mb-4">Reservation</h3>

//         {renderHotelDetails}

//         <p>Udfyld nedenstående formular for at reservere et af vores værelser.</p>

//         {/* Vertical red line on the right side */}
//         <div className="vl bg-gray-400 h-3/4 w-1 absolute lg:right-64 sm:right-0 right-0 lg:left-auto left-auto" />
 
      
//         <form className="max-w-md  mt-4" onSubmit={handleSubmit}>
//         <div className="mb-4">
//     <label className="block text-sm font-medium">Vælg hotel:</label>
//     <select
//   name="destination"
//   value={formData.destination}
//   onChange={handleInputChange}
//   className="mt-1 p-2 w-full border rounded"
// >
//   <option value="">Vælg hotel</option>
//   {/* Map hotel IDs to options */}
//   {hotelIds.map(id => (
//     <option key={id} value={id}>{id}</option>
//   ))}
// </select>
//     {formErrors.destination && <p className="text-red-500 text-sm">{formErrors.destination}</p>}
//   </div>

//         <div className="mb-4 flex">
//           <div className="w-1/2 mr-2">
//             <label className="block text-sm font-medium">Vælg værelse:</label>
//             <select
//               name="roomType"
//               value={formData.roomType}
//               onChange={handleInputChange}
//               className="mt-1 p-2 w-full border rounded"
//             >
//               <option value="">Vælg værelse</option>
//               <option value="single">Economy Room</option>
//               <option value="single">Superior Plus Room</option>
//               <option value="single">Superior Room</option>
//               <option value="single">Junior Suite Room</option>
//               <option value="single">Presidential Suite Room</option>
//               <option value="single">Standard Single Room</option>
//               <option value="single">Standard Room</option>
//               {/* Add more options as needed */}
//             </select>
//             {formErrors.roomType && <p className="text-red-500 text-sm">{formErrors.roomType}</p>}
//           </div>

//           <div className="w-1/2 ml-2">
//             <label className="block text-sm font-medium">Vælg antal personer:</label>
//             <select
//               name="numberOfPeople"
//               value={formData.numberOfPeople}
//               onChange={handleInputChange}
//               className="mt-1 p-2 w-full border rounded"
//             >
//               <option value="">Vælg antal personer</option>
//               <option value="1">1 person</option>
//               <option value="2">2 personer</option>
//               <option value="3">3 personer</option>
//               <option value="4"> Flere personer</option>
//               {/* Add more options as needed */}
//             </select>
//             {formErrors.numberOfPeople && <p className="text-red-500 text-sm">{formErrors.numberOfPeople}</p>}
//           </div>
//         </div>

//         <div className="mb-4">
//   <label className="block text-sm font-medium">Vælg prisklasse:</label>
//   <div>
//     <label className="flex items-center">
//       <input
//         type="radio"
//         name="priceClass"
//         value="Normal"
//         checked={formData.priceClass === 'Normal'}
//         onChange={handleInputChange}
//         className="rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
//       />
//       <span className="ml-2">Normal</span>
//     </label>
//     <label className="flex items-center">
//       <input
//         type="radio"
//         name="priceClass"
//         value="Flex"
//         checked={formData.priceClass === 'Flex'}
//         onChange={handleInputChange}
//         className="rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
//       />
//       <span className="ml-2">Flex</span>
//     </label>
//   </div>
//   {formErrors.priceClass && <p className="text-red-500 text-sm">{formErrors.priceClass}</p>}
// </div>

// <div className="mb-4 flex">
//           <div className="w-1/2 mr-2">
//             <label className="block text-sm font-medium">Check-in date:</label>
//             <input
//               type="date"
//               name="checkInDate"
//               value={formData.checkInDate}
//               onChange={handleInputChange}
//               min={today} // Set the minimum date to today
//               className="mt-1 p-2 w-full border rounded"
//             />
//             {formErrors.checkInDate && <p className="text-red-500 text-sm">{formErrors.checkInDate}</p>}
//           </div>

//           <div className="w-1/2 ml-2">
//             <label className="block text-sm font-medium">Check-out date:</label>
//             <input
//               type="date"
//               name="checkOutDate"
//               value={formData.checkOutDate}
//               onChange={handleInputChange}
//               min={formData.checkInDate || today} // Set the minimum date to check-in date or today if check-in date is not selected
//               className="mt-1 p-2 w-full border rounded"
//             />
//             {formErrors.checkOutDate && <p className="text-red-500 text-sm">{formErrors.checkOutDate}</p>}
//           </div>
//         </div>


//         <div className="mb-4">
//           <label className="block text-sm font-medium">Fornavn:</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded"
//           />
//           {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Efternavn(e):</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded"
//           />
//           {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
//         </div>

//         <div className="mb-4 flex">
//           <div className="w-1/2 mr-2">
//             <label className="block text-sm font-medium">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="mt-1 p-2 w-full border rounded"
//             />
//             {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
//           </div>

//           <div className="w-1/2 ml-2">
//             <label className="block text-sm font-medium">Telefon:</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="mt-1 p-2 w-full border rounded"
//             />
//             {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
//           </div>
//         </div>

//         {/* ... (existing form fields) */}

//         <div className="mb-4">
//           <label className="block text-sm font-medium">Kommentarer:</label>
//           <textarea
//             name="comments"
//             value={formData.comments}
//             onChange={handleInputChange}
//             className="mt-1 p-2 w-full border rounded"
//           />
//           {formErrors.comments && <p className="text-red-500 text-sm">{formErrors.comments}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               name="acceptTerms"
//               checked={formData.acceptTerms}
//               onChange={handleCheckboxChange}
//               className="mr-2"
//             />
//             Jeg accepterer vilkår og betingelser
//           </label>
//           {formErrors.acceptTerms && <p className="text-red-500 text-sm">{formErrors.acceptTerms}</p>}
//         </div>

//               {/* Display confirmation message */}
//       {isSubmitted && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Success!</strong>
//           <span className="block sm:inline"> Your reservation has been submitted.</span>
//           <button
//             type="button"
//             className="absolute top-0 right-0 px-4 py-3"
//             onClick={() => setIsSubmitted(false)}
//           >
//             <span className="text-green-500">×</span>
//           </button>
//         </div>
//       )}


//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
//           >
//             Send reservation
//           </button>
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="bg-red-500 text-white px-12 py-2 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
//           >
//             Annuller
//           </button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Reservation;


//Reservations.jsx
import React, { useState, useEffect } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider';
import { useParams } from 'react-router-dom';

const Reservation = () => {
  const initialFormData = {
    destination: '',
    roomType: '',
    numberOfPeople: '',
    priceClass: '',
    checkInDate: '',
    checkOutDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comments: '',
    acceptTerms: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = urlParams.get('hotelId');
  const hotelTitle = urlParams.get('hotelTitle');
  const roomId = urlParams.get('roomId');

  const supabase = useSupabase();
  const [hotelIds, setHotelIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const priceClass = urlParams.get('priceClass'); 

  const validateForm = () => {
    const errors = {};

    ['destination', 'roomType', 'numberOfPeople', 'priceClass', 'checkInDate', 'checkOutDate', 'firstName', 'lastName', 'email', 'phone', 'acceptTerms'].forEach((field) => {
      if (!formData[field]) {
        errors[field] = 'Dette felt skal udfyldes.';
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked ? name : '',
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   if (validateForm()) {
  //     console.log('Form submitted:', formData);
  //     setIsSubmitted(true);
  
  //     // Redirect to login page with data as URL parameters
  //     const queryString = new URLSearchParams({
  //       checkInDate: formData.checkInDate,
  //       checkOutDate: formData.checkOutDate,
  //       destination: formData.destination, 
  //       roomType: formData.roomType 
  //     }).toString();
  //     // Store the reservation data using ReservationStorage

    
  //     // Redirect to login page with URL parameters
  //     window.location.href = `/login?${queryString}`;

  //   }
  // };
  
  const saveReservationLocally = (reservationData) => {
    try {
      // Save the reservation to local storage
      const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
      const updatedReservations = [...existingReservations, reservationData];
      localStorage.setItem('reservations', JSON.stringify(updatedReservations));

      // Update state if needed
      setReservations(updatedReservations);

      console.log("Reservation saved locally:", reservationData);
    } catch (error) {
      console.error("Error saving reservation locally:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
  
      // Save the reservation data locally
      saveReservationLocally(formData);

      // Redirect to login page
      window.location.href = '/login';
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setIsSubmitted(false);
  };

  // Set the initial state of formData.priceClass using the received price class
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      priceClass: priceClass || '' // Set the received price class or an empty string if not provided
    }));
  }, [priceClass]);

  // Set the state of the radio buttons when the price class changes
  useEffect(() => {
    // Update the state based on the selected price class
    if (priceClass === 'Normal' || priceClass === 'Flex') {
      setFormData(prevData => ({
        ...prevData,
        priceClass: priceClass
      }));
    }
  }, [priceClass]);


  useEffect(() => {
    async function fetchHotelIds() {
      try {
        const { data, error } = await supabase.supabase
          .from('hotels')
          .select('title');

        if (error) {
          console.error('Error fetching hotel IDs:', error.message);
          setLoading(false);
          return;
        }

        const ids = data.map(hotel => hotel.title);
        setHotelIds(ids);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel IDs:', error.message);
        setLoading(false);
      }
    }

    fetchHotelIds();
  }, [supabase]);

  // Define a lookup object mapping room IDs to room titles
const roomTitles = {
  1: 'Economy Room',
  2: 'Superior Plus Room',
  3: 'Superior',
  4: 'Junior Suite',
  5: 'Presidential Suite',
  6: 'Standard Single',
  7: 'Standard'
  // Add more room IDs and titles as needed
};

const renderHotelDetails = hotelId && hotelTitle && roomId && (
  <div className="mt-8 p-4 bg-gray-100">
    <h2 className="text-xl font-bold">Huskeseddel</h2>
    <br />
    <p>Valgt hotel : {hotelTitle}</p>
    <p>Valgt værelse: {roomTitles[roomId]}</p>
  </div>
);
  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="reservation-form-container max-w-md mr-4">
        <h2 className="text-xl font-bold">Hotel Overlook &gt; Reservation</h2>
        <br />
        <h3 className="text-2xl font-bold mb-4">Reservation</h3>

        {renderHotelDetails}

        <p>Udfyld nedenstående formular for at reservere et af vores værelser.</p>

        {/* Vertical red line on the right side */}
        <div className="vl bg-gray-400 h-3/4 w-1 absolute lg:right-64 sm:right-0 right-0 lg:left-auto left-auto" />
 
      
        <form className="max-w-md  mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
    <label className="block text-sm font-medium">Vælg hotel:</label>
    <select
  name="destination"
  value={formData.destination}
  onChange={handleInputChange}
  className="mt-1 p-2 w-full border rounded"
>
  <option value="">Vælg hotel</option>
  {/* Map hotel IDs to options */}
  {hotelIds.map(id => (
    <option key={id} value={id}>{id}</option>
  ))}
</select>
    {formErrors.destination && <p className="text-red-500 text-sm">{formErrors.destination}</p>}
  </div>

        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-medium">Vælg værelse:</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Vælg værelse</option>
              <option value="single">Economy Room</option>
              <option value="single">Superior Plus Room</option>
              <option value="single">Superior Room</option>
              <option value="single">Junior Suite Room</option>
              <option value="single">Presidential Suite Room</option>
              <option value="single">Standard Single Room</option>
              <option value="single">Standard Room</option>
              {/* Add more options as needed */}
            </select>
            {formErrors.roomType && <p className="text-red-500 text-sm">{formErrors.roomType}</p>}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block text-sm font-medium">Vælg antal personer:</label>
            <select
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Vælg antal personer</option>
              <option value="1">1 person</option>
              <option value="2">2 personer</option>
              <option value="3">3 personer</option>
              <option value="4"> Flere personer</option>
              {/* Add more options as needed */}
            </select>
            {formErrors.numberOfPeople && <p className="text-red-500 text-sm">{formErrors.numberOfPeople}</p>}
          </div>
        </div>

        <div className="mb-4">
  <label className="block text-sm font-medium">Vælg prisklasse:</label>
  <div>
    <label className="flex items-center">
      <input
        type="radio"
        name="priceClass"
        value="Normal"
        checked={formData.priceClass === 'Normal'}
        onChange={handleInputChange}
        className="rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      <span className="ml-2">Normal</span>
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="priceClass"
        value="Flex"
        checked={formData.priceClass === 'Flex'}
        onChange={handleInputChange}
        className="rounded-full border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      <span className="ml-2">Flex</span>
    </label>
  </div>
  {formErrors.priceClass && <p className="text-red-500 text-sm">{formErrors.priceClass}</p>}
</div>

<div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-medium">Check-in date:</label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleInputChange}
              min={today} // Set the minimum date to today
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.checkInDate && <p className="text-red-500 text-sm">{formErrors.checkInDate}</p>}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block text-sm font-medium">Check-out date:</label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleInputChange}
              min={formData.checkInDate || today} // Set the minimum date to check-in date or today if check-in date is not selected
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.checkOutDate && <p className="text-red-500 text-sm">{formErrors.checkOutDate}</p>}
          </div>
        </div>


        <div className="mb-4">
          <label className="block text-sm font-medium">Fornavn:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
          {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Efternavn(e):</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
          {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          <div className="w-1/2 ml-2">
            <label className="block text-sm font-medium">Telefon:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>
        </div>

        {/* ... (existing form fields) */}

        <div className="mb-4">
          <label className="block text-sm font-medium">Kommentarer:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
          {formErrors.comments && <p className="text-red-500 text-sm">{formErrors.comments}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Jeg accepterer vilkår og betingelser
          </label>
          {formErrors.acceptTerms && <p className="text-red-500 text-sm">{formErrors.acceptTerms}</p>}
        </div>

              {/* Display confirmation message */}
      {isSubmitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your reservation has been submitted.</span>
          <button
            type="button"
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setIsSubmitted(false)}
          >
            <span className="text-green-500">×</span>
          </button>
        </div>
      )}


        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Send reservation
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-12 py-2 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
          >
            Annuller
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Reservation;
