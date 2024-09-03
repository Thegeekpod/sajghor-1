// Loader.js
import React from 'react';


const Loader = () => {
  return (
    <div className="loader-container">
          <div className="loader"></div>
<style jsx>{`
        .container {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f0f0f0; /* Light gray background */
        }

        .loader-container {
          position: relative;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(0 0 0 / 7%); /* Semi-transparent dark background */
          height: 100vh;
        }

        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
