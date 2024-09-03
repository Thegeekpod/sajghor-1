"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewCollection = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        selectedPlatform: '', // radio button selection for YouTube or Facebook
        youtube_link: '',
        facebook_link: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let urlToSubmit = '';

        if (formData.selectedPlatform === 'youtube') {
            urlToSubmit = formData.youtube_link;
        } else if (formData.selectedPlatform === 'facebook') {
            urlToSubmit = formData.facebook_link;
        }

        // Validate URL before conversion to embed format
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if (!urlPattern.test(urlToSubmit)) {
            alert('Invalid URL format');
            return;
        }

        // Convert URL to embed format
        if (formData.selectedPlatform === 'youtube') {
            urlToSubmit = urlToSubmit.replace("watch?v=", "embed/");
        } else if (formData.selectedPlatform === 'facebook') {
            // Facebook video embed format is more complex and depends on the URL structure
            // Here is a basic conversion example (might need to be adjusted based on your use case)
            urlToSubmit = urlToSubmit.replace('www.facebook.com', 'www.facebook.com/plugins/video.php?href=https://www.facebook.com');
        }

        // Prepare the form data for submission
        const formDataToSubmit = new FormData();
        formDataToSubmit.append(formData.selectedPlatform === 'youtube' ? 'youtube_link' : 'facebook_link', urlToSubmit);

        // Submit form data to the API
        try {
            const response = await fetch('/api/backend/newcollection/add', {
                method: 'POST',
                body: formDataToSubmit
            });
            if (response.ok) {
              // Show success message
              if (window.$.notify) {
                  window.$.notify({
                      message: 'New Collection added successfully!'
                  }, {
                      type: 'success',
                      delay: 2000,
                      z_index: 9999
                  });
              }

              // Redirect after a short delay to ensure notification is visible
              setTimeout(() => {
                  router.push('/admin/dashboard/newcollection');
              }, 2000);
          } else {
              console.error('Failed to submit New Collection');
              if (window.$.notify) {
                  window.$.notify({
                      message: 'Failed to add New Collection'
                  }, {
                      type: 'danger',
                      delay: 2000,
                      z_index: 9999
                  });
              }
          }
      } catch (error) {
          console.error('Error:', error);
          if (window.$.notify) {
              window.$.notify({
                  message: 'Failed to add New Collection'
              }, {
                  type: 'danger',
                  delay: 2000,
                  z_index: 9999
              });
          }
      }
    };

    return (
        <div className="container-fluid my-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="card-title mb-0">Add New Collection</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label">Select Platform</label>
                            <div>
                                <input
                                    type="radio"
                                    id="youtube"
                                    name="selectedPlatform"
                                    value="youtube"
                                    checked={formData.selectedPlatform === 'youtube'}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="youtube" className="mx-2">YouTube</label>

                                <input
                                    type="radio"
                                    id="facebook"
                                    name="selectedPlatform"
                                    value="facebook"
                                    checked={formData.selectedPlatform === 'facebook'}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="facebook" className="mx-2">Facebook</label>
                            </div>
                        </div>

                        {formData.selectedPlatform === 'youtube' && (
                            <div className="mb-3">
                                <label htmlFor="youtube_link" className="form-label">YouTube Link</label>
                                <input
                                    type="url"
                                    id="youtube_link"
                                    name="youtube_link"
                                    className="form-control"
                                    value={formData.youtube_link}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {formData.selectedPlatform === 'facebook' && (
                            <div className="mb-3">
                                <label htmlFor="facebook_link" className="form-label">Facebook Link</label>
                                <input
                                    type="url"
                                    id="facebook_link"
                                    name="facebook_link"
                                    className="form-control"
                                    value={formData.facebook_link}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary">Add Collection</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewCollection;
