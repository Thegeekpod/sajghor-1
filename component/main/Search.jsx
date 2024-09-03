"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const InstantSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (query.length >= 3) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(`/api/frontend/product/`, {
            params: { search: query },
          });
          setResults(response.data.slice(0, 5)); // Limit results to 5
        } catch (error) {
          console.error('Error fetching search results', error);
        }
      };

      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (product) => {
    setResults([]); // Clear results after clicking
    router.push(`/${product.category.slug}/${product.slug}`);
  };

  return (
    <div style={{ position: 'relative' }}>
      <form id="pro-search">
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
          style={{ width: '100%' }}
        />
      </form>

      {results.length > 0 && (
        <ul className="list-group ser">
          {results.map((product) => (
            <li key={product.id} className="list-group-item">
              <div
                className="d-flex align-items-center"
                onClick={() => handleResultClick(product)} // Update here
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-thumbnail"
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                <span>{product.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .ser {
          position: absolute;
          top: 128%;
          left: 0;
          right: 0;
          max-height: 380px;
          overflow-y: auto;
          z-index: 9999;
          background-color: white;
          border: 1px solid #ddd;
          /* -webkit-box-shadow: 0 4px 6px rgba(0, 0, 0, .1); */
          -moz-box-shadow: 0 4px 6px rgba(0, 0, 0, .1);
          /* box-shadow: 0 4px 6px rgba(0, 0, 0, .1); */
          width: 100%;
          border-radius: 5px;
        }

        .list-group-item {
          cursor: pointer; /* Add a pointer cursor to indicate clickable items */
        }

        @media (max-width: 768px) {
          .ser {
            max-height: 200px; /* Reduced height for mobile view */
          }
        }
      `}</style>
    </div>
  );
};

export default InstantSearch;
