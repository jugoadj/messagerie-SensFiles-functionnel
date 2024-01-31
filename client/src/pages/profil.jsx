import React, { useContext } from 'react';
import Log from '../components/log';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/navbar';
import Footer from '../components/landing/Footer';

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <>
      <Navbar />
      <div className='App'>
      <div className='contact-page-wrapper'>
        {uid ? (
          <h1>UPDATE PAGE</h1>
        ) : (
          <div className='log-container'>
            
            <Log signin={true} signup={false} />
            
            <div className='img-container'>
              <img src='./img/log1.png' alt='img-log' />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
  
  .log-container {
  
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Styles pour le conteneur de l'image */
  .img-container {
    max-width: 50%;
  }

  @media (max-width: 600px) {
    
    .log-container {
      flex-direction: column; 
      align-items: center;
    }

     
    .img-container {
      max-width: 100%; 
      margin-top: 10px; 
    }
  }
`}</style>
    
       <Footer/>
    </div>
    
    </>
  );
};

export default Profil;