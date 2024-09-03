'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles

const Page = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('/api/frontend/newcollection/');
        setCollections(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <>
      <section id="innerPG-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="banner-item col-lg-12">
              <img src={"/images/inn-banner.jpg"} className="img-fluid" alt="Banner" />
            </div>
          </div>
        </div>
      </section>
      <section id="collection-list" className='mt-4'>
        <div className="container">
          <div className="row">
            {loading ? (
              // Skeleton loader while data is loading
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <Skeleton height={200} />
                      <Skeleton count={3} />
                    </div>
                  </div>
                </div>
              ))
            ) : collections.length > 0 ? (
              collections.map((collection) => (
                <div key={collection.id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">
                        {collection.youtube_link ? (
                          <iframe
                            width="100%"
                            height="200"
                            src={collection.youtube_link.replace('watch?v=', 'embed/')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <iframe
                            width="100%"
                            height="200"
                            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(collection.facebook_link)}`}
                            title="Facebook video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p>No collections found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
