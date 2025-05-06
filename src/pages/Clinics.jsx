import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Addish from '../assets/clinics/ah.jpeg';
import Saint from '../assets/clinics/stg.jpeg';
import Kadisco from '../assets/clinics/k.jpeg';
import Nordic from '../assets/clinics/nor.jpeg';
import Tekle from '../assets/clinics/tk.jpeg';
import Anania from '../assets/clinics/ana.jpeg';
import Hayat from '../assets/clinics/hayat.jpeg';
import Addisc from '../assets/clinics/ac.jpeg';
import Yekatit from '../assets/clinics/yk.jpeg';
import Land from '../assets/clinics/lk.jpeg';
import Cure from '../assets/clinics/cur.jpeg';
import Ethio from '../assets/clinics/rth.jpeg';

const NearbyClinics = () => {
  const [filterName, setFilterName] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');

  const clinics = [
    {
        id: 1,
        name: 'Addis Hiwot General Hospital',
        rating: 1.7,
        contact: '+251 11 618 0449',
        location: 'Bole Sub-city, Wereda 4, Addis Ababa',
        specialty: 'General',
        feedback: 'The facility isn\'t adequate for a hospital, but the doctors are great and nurses were friendly.',
        image: Addish,
        link: 'http://addishiwotgeneralhospital.com'
      },
      {
        id: 2,
        name: 'St. Gabriel General Hospital',
        rating: 4.3,
        contact: '+251 11 662 4942',
        location: 'Addis Ababa',
        specialty: 'General',
        feedback: 'As a foreigner, I had low expectations, but the service was excellent with little wait time.',
        image: Saint,
        link: 'http://saintgabrielgeneralhospital.com'
      },
      {
        id: 3,
        name: 'Kadisco General Hospital',
        rating: 4.5,
        contact: '+251 11 629 8902',
        location: 'Gerji, Addis Ababa',
        specialty: 'General',
        feedback: 'Known for modern practices, very reliable for general surgery and orthopedics.',
        image: Kadisco,
        link: 'http://www.kadcogroup.com'
      },
      {
        id: 4,
        name: 'Nordic Medical Centre',
        rating: 4.8,
        contact: '+251 929 105 653',
        location: 'Bole Sub-city, Kebele 01, Addis Ababa',
        specialty: 'Emergency Medicine',
        feedback: 'High-quality care, preferred by internationals, excellent staff.',
        image: Nordic,
        link: 'http://nordicmedicalcentre.com'
      },
      {
        id: 5,
        name: 'Teklehaimanot General Hospital',
        rating: 2.1,
        contact: '+251 11 551 4141',
        location: 'Gobena Aba Tigu St, Addis Ababa',
        specialty: 'General',
        feedback: 'Service could improve, but useful for research data on diabetes.',
        image: Tekle,
        link: null
      },
      {
        id: 6,
        name: 'Anania Mothers and Children Specialized Medical Center',
        rating: 3.5,
        contact: '+251 11 156 5045',
        location: 'Arbeynoch St, Addis Ababa',
        specialty: 'Pediatrics',
        feedback: 'Great for prenatal care, though limited specialties.',
        image: Anania,
        link: null
      },
      {
        id: 7,
        name: 'Hayat Hospital',
        rating: 2.1,
        contact: '+251 11 662 4488',
        location: 'Bole Sub-city, Addis Ababa',
        specialty: 'General',
        feedback: 'Service can be disrespectful, with occasional misdiagnosis.',
        image: Hayat,
        link: 'http://hayatmcollege.com'
      },
      {
        id: 8,
        name: 'Addis Cardiac Hospital',
        rating: 4.6,
        contact: '+251 911 243 274',
        location: 'Addis Ababa',
        specialty: 'Cardiology',
        feedback: 'Excellent for cardiovascular care, highly specialized.',
        image: Addisc,
        link: null
      },
      {
        id: 9,
        name: 'Yekatit 12 Hospital',
        rating: 3.8,
        contact: '+251 11 155 3065',
        location: 'Piazza, Addis Ababa',
        specialty: 'Obstetrics',
        feedback: 'Affordable and accessible, great for obstetrics and gynecology.',
        image: Yekatit,
        link: null
      },
      {
        id: 10,
        name: 'Landmark General Hospital',
        rating: 3.1,
        contact: '+251 11 552 5463',
        location: 'Mozambique St, Addis Ababa',
        specialty: 'General',
        feedback: 'Poor experience with rude staff, needs better management.',
        image: Land,
        link: 'http://landmarkhospital.et'
      },
      {
        id: 11,
        name: 'CURE Ethiopia',
        rating: 4.7,
        contact: '+251 11 123 7767',
        location: 'Addis Ababa',
        specialty: 'Orthopedics',
        feedback: 'Amazing for pediatric orthopedics, very compassionate care.',
        image: Cure,
        link: 'http://cure.org'
      },
      {
        id: 12,
        name: 'Ethio Tebib General Hospital',
        rating: 3.2,
        contact: '+251 11 551 4141',
        location: 'Sefere Selam, Addis Ababa',
        specialty: 'Maternity',
        feedback: 'Maternity ward is excellent, doctors are committed.',
        image: Ethio,
        link: null
      }
    ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const filteredClinics = clinics.filter(clinic => 
    clinic.name.toLowerCase().includes(filterName.toLowerCase()) &&
    (filterSpecialty === 'All' || clinic.specialty === filterSpecialty)
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <nav className="bg-blue-500 text-white dark:bg-gray-800 dark:text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold">MediHelp</h2>
        </div>
      </nav>

      <main className="container mx-auto p-6">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent p-6">We are here to help.<br/> Find best Nearby Clinics</h2>
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Search by hospital name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full sm:w-1/3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="All">All Specialties</option>
            <option value="General">General</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Obstetrics">Obstetrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Maternity">Maternity</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClinics.length > 0 ? (
            filteredClinics.map(clinic => (
              <div key={clinic.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <a href={clinic.link || '#'} target="_blank" rel="noopener noreferrer">
                  <img src={clinic.image} alt={`${clinic.name} Image`} className="w-full h-32 object-cover rounded-t-md mb-4" />
                </a>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{clinic.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1"><strong>Rating:</strong> {clinic.rating} {renderStars(clinic.rating)}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-1"><strong>Contact:</strong> {clinic.contact}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-1"><strong>Location:</strong> {clinic.location}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-1"><strong>Specialty:</strong> {clinic.specialty}</p>
                <p className="text-gray-600 dark:text-gray-400 italic">"{clinic.feedback}"</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">No clinics found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default NearbyClinics;
