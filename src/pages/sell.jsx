import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Camera, FileText, MapPin, DollarSign, Home, Upload, Building2 } from 'lucide-react';
import Lbar from '../comp/loggesNavbar/Lbar';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';



const LocationSelector = ({ onLocationChange }) => {
  const customIcon = new L.Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition(event.latlng); // Update marker position
      onLocationChange(lat, lng); // Pass latitude and longitude to parent
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const UploadForSellForm = ({ id, onSubmit }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  const handleLocationChange = (lat, lng) => {
    setLocation({ latitude: lat, longitude: lng });
  };

  const [propertyImages, setPropertyImages] = useState([]);
  const [documents, setDocuments] = useState({
    adharCard: null,
    panCard: null,
    proofOfOwnership: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setPropertyImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDocumentChange = (event, documentType) => {
    const file = event.target.files[0];
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [documentType]: file,
    }));
  };

  const handleRemoveImage = (index) => {
    setPropertyImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleRemoveDocument = (documentType) => {
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [documentType]: null,
    }));
  };


  const initialValues = {
    propertyType: '',
    title:'',
    price: '',
    area: '',
    location: '',
    yearBuilt: '',
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    parking: '',
    description: '',
  };

  const validationSchema = Yup.object({
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    area: Yup.number().positive('Area must be positive').required('Area is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('city is required'),
    address: Yup.string().required('Address is required'),
    bedrooms: Yup.number().positive('Must be positive').required('Required'),
    parking: Yup.number().positive('Must be positive').required('Required'),
    bathrooms: Yup.number().positive('Must be positive').required('Required'),
    balconies: Yup.number().positive('Must be positive').required('Required'),
    yearBuilt: Yup.number().positive('Must be positive').required('Required'),
    description: Yup.string().required('Required'),
    title: Yup.string().required('Required'),

  });

  const handleSubmit = async (values) => {
    setUploading(true);

    // Step 2: Organize data into FormData
    const formData = new FormData();
    formData.append('description', values.description);
    formData.append('title', values.title);
    formData.append('type', values.propertyType);
    formData.append('price', values.price);
    formData.append('yearBuilt', values.yearBuilt); // Ensure you append yearBuilt

    // Step 3: Handle amenities
    formData.append('amenities[bedrooms]', values.bedrooms);
    formData.append('amenities[kitchens]', values.kitchens || ''); // Assuming kitchens is part of the form
    formData.append('amenities[bathrooms]', values.bathrooms);
    formData.append('amenities[parking]', values.parking);
    formData.append('amenities[balcony]', values.balconies); // Corrected typo 'balcony' to match the field
    formData.append('amenities[area]', values.area);

// Step 4: Handle Location
formData.append('location[latitude]', location.latitude);
formData.append('location[longitude]', location.longitude || ''); 
formData.append('location[city]', values.city);
formData.append('location[state]', values.state);
formData.append('location[address]', values.address); 


    // Append property images
    propertyImages.forEach((file) => {
      formData.append('propertyImages', file);
    });

    // Append proof of ownership files
    formData.append('adharCard', documents.adharCard);
    formData.append('panCard', documents.panCard);

    // Step 4: Make the API request
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await axios.post(`http://localhost:3000/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Property uploaded successfully', response.data);
      alert("Property uploaded");
    } catch (error) {
      console.error('Error uploading property', error);
      alert("Error uploading property. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Lbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Upload Property</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-8">
              {/* Basic Details Section */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Basic Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Property Type</label>
                    <Field as="select" name="propertyType" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500">
                      <option value="selling">For Sale</option>
                      <option value="rental">For Rent</option>
                    </Field>
                    <ErrorMessage name="propertyType" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <div className="relative">
                      <Field type="text" name="title" className="w-full  rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                      <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Field type="number" name="price" className="w-full pl-10 rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                      <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Area */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Area (sq ft)</label>
                    <Field type="number" name="area" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="area" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Field type="text" name="state" className="w-full pl-10 rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                      <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Field type="text" name="city" className="w-full pl-10 rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Address (Complete)</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Field type="text" name="address" className="w-full pl-10 rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  {/* Year Built */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Year Built</label>
                    <Field type="number" name="yearBuilt" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="yearBuilt" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              </section>

              {/* Property Features Section */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Property Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Bedrooms */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                    <Field type="number" name="bedrooms" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="bedrooms" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Parking */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Parking</label>
                    <Field type="number" name="parking" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="parking" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                    <Field type="number" name="bathrooms" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="bathrooms" component="div" className="text-red-500 text-sm" />
                  </div>

                  {/* Balconies */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Balconies</label>
                    <Field type="number" name="balconies" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="balconies" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section className="space-y-6">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Field as="textarea" name="description" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" rows="4" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </section>

              
              {/* Map */}
                <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Location on Map
                </label>
                <div className="h-96 w-full rounded-lg border">
                  <MapContainer
                   center={[28.6139, 77.2090]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <LocationSelector onLocationChange={handleLocationChange} />
                  </MapContainer>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="latitude"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Latitude
                    </label>
                    <Field
                      type="text"
                      name="latitude"
                      value={location.latitude}
                      readOnly
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="longitude"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Longitude
                    </label>
                    <Field
                      type="text"
                      name="longitude"
                      value={location.longitude}
                      readOnly
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              {/* File Upload Section */}
              <section className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  File Uploads
                </h2>

                {/* Property Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Images</label>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                  <div className="mt-2">
                    {propertyImages.map((file, index) => (
                      <div key={index} className="flex items-center justify-between mt-2">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-500 text-sm">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Proof of Ownership</label>
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={(e) => handleDocumentChange(e, 'proofOfOwnership')} className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    {documents.proofOfOwnership && (
                      <div className="mt-2">
                        <span>{documents.proofOfOwnership.name}</span>
                        <button type="button" onClick={() => handleRemoveDocument('proofOfOwnership')} className="text-red-500 text-sm">Remove</button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">Aadhar Card</label>
                    <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => handleDocumentChange(e, 'adharCard')} className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    {documents.adharCard && (
                      <div className="mt-2">
                        <span>{documents.adharCard.name}</span>
                        <button type="button" onClick={() => handleRemoveDocument('adharCard')} className="text-red-500 text-sm">Remove</button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">PAN Card</label>
                    <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => handleDocumentChange(e, 'panCard')} className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-2 focus:ring-blue-500" />
                    {documents.panCard && (
                      <div className="mt-2">
                        <span>{documents.panCard.name}</span>
                        <button type="button" onClick={() => handleRemoveDocument('panCard')} className="text-red-500 text-sm">Remove</button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Submit Button Section */}
              <section className="flex justify-center mt-6">
                <button
                  type="submit"
                  className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg ${uploading ? 'bg-gray-500' : ''}`}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Submit Property'}
                </button>
              </section>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UploadForSellForm;
