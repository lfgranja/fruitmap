import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { treeAPI, speciesAPI } from './services/api';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Define TypeScript interfaces
interface Tree {
  id: string;
  position: [number, number];
  title: string;
  species: string;
  season: string;
  description: string;
  accessibility: string;
  contributor?: string;
  rating?: number;
  image?: string;
}

interface TreeApiResponse {
  id: string;
  location: string | { coordinates: [number, number] };
  title: string;
  description: string;
  accessibility: string;
  contributor?: { username: string };
  species?: { name: string };
}

interface Species {
  id: number;
  name: string;
  scientificName?: string;
}

interface TreeFormState {
  title: string;
  species: string;
  accessibility: string;
  description: string;
}

const App: React.FC = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([-14.2350, -51.9253]); // Center of Brazil
  const [zoom, setZoom] = useState<number>(4);
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [showAddTreeForm, setShowAddTreeForm] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  
  // State for tree form
  const [treeFormData, setTreeFormData] = useState<TreeFormState>({
    title: '',
    species: '',
    accessibility: 'public',
    description: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // State for toast notifications
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);
  
  // State for species data
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [speciesLoading, setSpeciesLoading] = useState(true);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load trees data
  useEffect(() => {
    const fetchTrees = async () => {
      try {
        // Try to load from API first
        const response = await treeAPI.getAllTrees();
        // Parse location safely with try-catch
        setTrees(response.data.trees.map((tree: TreeApiResponse) => {
          let position: [number, number] = [0, 0]; // Default fallback position
          try {
            const locationData = typeof tree.location === 'string' ? JSON.parse(tree.location) : tree.location;
            position = [
              locationData.coordinates[1], // latitude
              locationData.coordinates[0]  // longitude
            ];
          } catch (error) {
            console.error(`Error parsing location for tree ${tree.id}:`, error);
            // Use a default position if parsing fails
            position = [-14.2350, -51.9253]; // Center of Brazil as fallback
          }
          
          return {
            id: tree.id,
            position,
            title: tree.title,
            species: tree.species?.name || 'Unknown',
            season: 'Year-round', // Will be updated when seasonal data API is available
            description: tree.description,
            accessibility: tree.accessibility,
            contributor: tree.contributor?.username
          };
        }));
      } catch (error: unknown) {
        console.error('Error fetching trees:', error);
        
        // Show error notification
        setToast({message: 'Error loading trees. Showing offline data.', type: 'error'});
        setTimeout(() => setToast(null), 3000);
        
        // Fallback to mock data if API fails
        const mockTrees: Tree[] = [
          {
            id: '1',
            position: [-23.5505, -46.6333], // São Paulo
            title: 'Mango Tree',
            species: 'Mangifera indica',
            season: 'Summer',
            description: 'Large mango tree with delicious fruit. Available during summer months.',
            accessibility: 'Public Park',
            contributor: 'Maria Silva',
            rating: 4.5
          },
          {
            id: '2',
            position: [-19.9167, -43.9345], // Belo Horizonte
            title: 'Guava Tree',
            species: 'Psidium guajava',
            season: 'Spring/Fall',
            description: 'Abundant guava tree in the community garden.',
            accessibility: 'Community Garden',
            contributor: 'João Oliveira',
            rating: 4.8
          },
          {
            id: '3',
            position: [-15.7942, -47.8822], // Brasília
            title: 'Orange Tree',
            species: 'Citrus sinensis',
            season: 'Winter',
            description: 'Sweet oranges available during winter season.',
            accessibility: 'Public Plaza',
            contributor: 'Ana Santos',
            rating: 4.2
          },
          {
            id: '4',
            position: [-3.7184, -38.5414], // Fortaleza
            title: 'Cashew Tree',
            species: 'Anacardium occidentale',
            season: 'Spring',
            description: 'Produces cashew nuts and fruit during spring season.',
            accessibility: 'Public Access',
            contributor: 'Carlos Mendes',
            rating: 4.0
          }
        ];
        
        setTrees(mockTrees);
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  // Load species data
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        // Try to load species from API
        const response = await speciesAPI.getAllSpecies();
        setSpeciesList(response.data.species);
      } catch (error: any) {
        console.error('Error fetching species:', error);
        
        // Show error notification
        let errorMessage = 'Error loading species list.';
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        setToast({message: errorMessage, type: 'error'});
        setTimeout(() => setToast(null), 3000);
        
        // Fallback to hardcoded species if API fails
        setSpeciesList([
          { id: 1, name: 'mango', scientificName: 'Mangifera indica' },
          { id: 2, name: 'guava', scientificName: 'Psidium guajava' },
          { id: 3, name: 'orange', scientificName: 'Citrus sinensis' },
          { id: 4, name: 'cashew', scientificName: 'Anacardium occidentale' },
          { id: 5, name: 'jackfruit', scientificName: 'Artocarpus heterophyllus' },
          { id: 6, name: 'avocado', scientificName: 'Persea americana' },
          { id: 7, name: 'other', scientificName: 'Other fruit species' }
        ]);
      } finally {
        setSpeciesLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  const handleMapClick = (e: { latlng: { lat: number; lng: number } }) => {
    // Handle map click for adding new tree
    console.log('Map clicked at:', e.latlng);
  };

  const handleAddTree = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAddTreeForm(true);
  };

  const handleTreeSelect = (tree: Tree) => {
    setSelectedTree(tree);
  };

  // Handle input changes for the tree form
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTreeFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // State to track the selected location for new tree
  const [newTreePosition, setNewTreePosition] = useState<[number, number] | null>(null);
  
  // Handle map click to select tree location or interact with existing trees
  const handleMapClick = (e: { latlng: { lat: number; lng: number } }) => {
    if (showAddTreeForm) {
      // If adding a new tree, set the position
      setNewTreePosition([e.latlng.lat, e.latlng.lng]);
      // Update map center to the selected position
      setMapCenter([e.latlng.lat, e.latlng.lng]);
    } else {
      // Handle map click for other purposes (e.g., deselecting a tree)
      setSelectedTree(null);
      console.log('Map clicked at:', e.latlng);
    }
  };

  // Validate form inputs
  const validateForm = (): boolean => {
    if (!treeFormData.title.trim()) {
      setFormError('Tree name/description is required.');
      return false;
    }
    
    if (!treeFormData.species) {
      setFormError('Please select a fruit type.');
      return false;
    }
    
    if (!newTreePosition) {
      setFormError('Please select a location on the map for the new tree.');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmitTree = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs before proceeding
    if (!validateForm()) {
      return;
    }
    
    setFormSubmitting(true);
    setFormError(null);

    try {
      // Check if user has selected a position on the map
      if (!newTreePosition) {
        throw new Error('Please select a location on the map for the new tree.');
      }
      
      const locationData = {
        type: 'Point',
        coordinates: [newTreePosition[1], newTreePosition[0]] // [longitude, latitude]
      };

      // Find the species ID from the species list
      const selectedSpecies = speciesList.find(species => species.name === treeFormData.species);
      
      // Validate that we have a valid species
      if (!selectedSpecies) {
        throw new Error('Please select a valid fruit type.');
      }

      // Create the tree data object
      const treeData = {
        speciesId: selectedSpecies.id,
        location: JSON.stringify(locationData),
        title: treeFormData.title,
        description: treeFormData.description,
        accessibility: treeFormData.accessibility
      };

      // Call the API to create the tree
      const response = await treeAPI.createTree(treeData);

      // On success, add the new tree to the list using the API response
      const createdTree: TreeApiResponse = response.data.tree;
      let treePosition: [number, number] = [0, 0]; // Default fallback position
      
      try {
        const locationData = typeof createdTree.location === 'string' 
          ? JSON.parse(createdTree.location) 
          : createdTree.location;
        treePosition = [
          locationData.coordinates[1], // latitude
          locationData.coordinates[0]  // longitude
        ];
      } catch (error) {
        console.error(`Error parsing location for new tree ${createdTree.id}:`, error);
        // Use the position from form if parsing fails
        treePosition = [newTreePosition[0], newTreePosition[1]];
      }

      const newTree: Tree = {
        id: createdTree.id,
        position: treePosition,
        title: createdTree.title,
        species: createdTree.species?.name || treeFormData.species || 'Unknown',
        season: 'Year-round', // Will be updated when seasonal data API is available
        description: createdTree.description,
        accessibility: createdTree.accessibility,
        contributor: createdTree.contributor?.username || 'You' // Placeholder for current user
      };

      setTrees(prev => [newTree, ...prev]);
      
      // Reset form and close modal
      setTreeFormData({
        title: '',
        species: '',
        accessibility: 'public',
        description: ''
      });
      setNewTreePosition(null); // Clear selected position
      setShowAddTreeForm(false);
      
      // Show success notification
      setToast({message: 'Tree added successfully!', type: 'success'});
      setTimeout(() => setToast(null), 3000); // Auto-hide after 3 seconds
    } catch (error: any) {
      console.error('Error adding tree:', error);
      // Handle error based on error type and response
      let errorMessage = 'Failed to add tree. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setFormError(errorMessage);
      setToast({message: errorMessage, type: 'error'});
      setTimeout(() => setToast(null), 5000); // Auto-hide after 5 seconds
    } finally {
      setFormSubmitting(false);
    }
  };

  // For mobile, adjust the tree detail panel height
  const treeDetailBottom = isMobile ? '60px' : '90px';

  return (
    <div className="app-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <header className="app-header" 
        style={{ 
          backgroundColor: '#2E8B57', 
          padding: isMobile ? '0.75rem' : '1rem', 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1003
        }}>
        <h1 style={{ margin: 0, fontSize: isMobile ? '1.2rem' : '1.5rem' }}>Fruit Map 🌳</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={handleAddTree}
            style={{ 
              backgroundColor: '#FFA500', 
              border: 'none', 
              padding: isMobile ? '0.5rem' : '0.5rem 1rem', 
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              fontSize: isMobile ? '0.8rem' : '1rem'
            }}
          >
            Add Tree
          </button>
          <button 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              border: '1px solid rgba(255, 255, 255, 0.5)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            📋
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, position: 'relative' }}>
        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            backgroundColor: '#f5f5f5'
          }}>
            <div style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>Loading map and trees...</div>
          </div>
        ) : (
          <MapContainer 
            center={mapCenter} 
            zoom={zoom} 
            style={{ height: '100%', width: '100%' }}
            whenCreated={(map) => {
              map.on('click', handleMapClick);
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {trees.map(tree => (
              <Marker 
                key={tree.id} 
                position={tree.position}
                eventHandlers={{
                  click: () => handleTreeSelect(tree)
                }}
              >
                <Popup>
                  <div style={{ minWidth: isMobile ? '180px' : '200px' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: isMobile ? '0.9rem' : '1rem' }}>{tree.title}</h3>
                    <p style={{ margin: '0.25rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}><strong>Species:</strong> {tree.species}</p>
                    <p style={{ margin: '0.25rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}><strong>Season:</strong> {tree.season}</p>
                    <p style={{ margin: '0.25rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}><strong>Accessibility:</strong> {tree.accessibility}</p>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: isMobile ? '0.7rem' : '0.8rem' }}>{tree.description}</p>
                    {tree.rating && (
                      <div style={{ marginTop: '0.5rem', fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#666' }}>
                        ⭐ {tree.rating} ({tree.contributor || 'Community'})
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Tree Detail Panel - Appears when a tree is selected */}
        {selectedTree && (
          <div 
            style={{
              position: 'absolute',
              bottom: treeDetailBottom, // Adjusted for mobile
              left: isMobile ? '5px' : '10px',
              right: isMobile ? '5px' : '10px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: isMobile ? '0.75rem' : '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              maxHeight: isMobile ? '40vh' : '300px',
              overflowY: 'auto',
              zIndex: 1000,
              fontSize: isMobile ? '0.85rem' : '1rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: isMobile ? '1.1rem' : '1.2rem' }}>{selectedTree.title}</h3>
                <p style={{ margin: '0.25rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}><strong>Species:</strong> {selectedTree.species}</p>
                <p style={{ margin: '0.25rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}><strong>Season:</strong> {selectedTree.season}</p>
              </div>
              <button 
                onClick={() => setSelectedTree(null)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: isMobile ? '1.2rem' : '1.5rem', 
                  cursor: 'pointer',
                  color: '#999',
                  padding: '0.25rem'
                }}
              >
                ×
              </button>
            </div>
            <p style={{ margin: '0.5rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{selectedTree.description}</p>
            <p style={{ margin: '0.5rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}><strong>Accessibility:</strong> {selectedTree.accessibility}</p>
            {selectedTree.contributor && (
              <p style={{ margin: '0.5rem 0', fontSize: isMobile ? '0.8rem' : '0.9rem' }}><strong>Added by:</strong> {selectedTree.contributor}</p>
            )}
            {selectedTree.rating && (
              <div style={{ marginTop: '0.5rem', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>
                ⭐ Rating: {selectedTree.rating}/5
              </div>
            )}
            <div style={{ display: 'flex', gap: isMobile ? '0.25rem' : '0.5rem', marginTop: '1rem' }}>
              <button 
                style={{ 
                  flex: 1,
                  backgroundColor: '#2E8B57', 
                  color: 'white',
                  border: 'none', 
                  padding: isMobile ? '0.5rem' : '0.75rem', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '1rem'
                }}
              >
                Navigate
              </button>
              <button 
                style={{ 
                  flex: 1,
                  backgroundColor: '#FFA500', 
                  color: 'white',
                  border: 'none', 
                  padding: isMobile ? '0.5rem' : '0.75rem', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '1rem'
                }}
              >
                Add Review
              </button>
            </div>
          </div>
        )}

        {/* Add Tree Form - Modal */}
        {showAddTreeForm && (
          <div 
            style={{
              position: 'absolute',
              top: isMobile ? '10px' : '50%',
              left: isMobile ? '10px' : '50%',
              right: isMobile ? '10px' : 'auto',
              bottom: isMobile ? '10px' : 'auto',
              transform: isMobile ? 'none' : 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: isMobile ? '1rem' : '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              zIndex: 1001,
              maxHeight: isMobile ? '90vh' : '90vh',
              width: isMobile ? 'auto' : '90%',
              maxWidth: isMobile ? 'auto' : '500px',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, fontSize: isMobile ? '1.2rem' : '1.5rem' }}>Add New Tree</h2>
              <button 
                onClick={() => setShowAddTreeForm(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: isMobile ? '1.2rem' : '1.5rem', 
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmitTree}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>Tree Name/Description</label>
                <input 
                  type="text" 
                  name="title"
                  value={treeFormData.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Mango Tree near the playground" 
                  style={{ 
                    width: '100%', 
                    padding: isMobile ? '0.5rem' : '0.75rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>Fruit Type</label>
                <select 
                  name="species"
                  value={treeFormData.species}
                  onChange={handleFormChange}
                  style={{ 
                    width: '100%', 
                    padding: isMobile ? '0.5rem' : '0.75rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                  required
                >
                  <option value="">Select fruit type</option>
                  {speciesLoading ? (
                    <option value="">Loading...</option>
                  ) : (
                    speciesList.map(species => (
                      <option key={species.id} value={species.name}>
                        {species.name.charAt(0).toUpperCase() + species.name.slice(1)}
                        {species.scientificName && ` (${species.scientificName})`}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>Accessibility</label>
                <select 
                  name="accessibility"
                  value={treeFormData.accessibility}
                  onChange={handleFormChange}
                  style={{ 
                    width: '100%', 
                    padding: isMobile ? '0.5rem' : '0.75rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                >
                  <option value="public">Public Access</option>
                  <option value="community">Community Garden</option>
                  <option value="private">Private (with permission)</option>
                  <option value="restricted">Restricted Access</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: isMobile ? '0.9rem' : '1rem' }}>Description</label>
                <textarea 
                  name="description"
                  value={treeFormData.description}
                  onChange={handleFormChange}
                  placeholder="Describe the tree location, fruit quality, and any special instructions" 
                  rows={isMobile ? 2 : 3}
                  style={{ 
                    width: '100%', 
                    padding: isMobile ? '0.5rem' : '0.75rem', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}
                />
              </div>
              
              {formError && (
                <div style={{ 
                  color: 'red', 
                  marginBottom: '1rem', 
                  padding: '0.5rem', 
                  backgroundColor: '#ffe6e6', 
                  borderRadius: '4px' 
                }}>
                  {formError}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: isMobile ? '0.25rem' : '0.5rem', marginTop: '1.5rem' }}>
                <button 
                  type="button"
                  onClick={() => setShowAddTreeForm(false)}
                  style={{ 
                    flex: 1,
                    backgroundColor: '#f0f0f0', 
                    color: '#333',
                    border: '1px solid #ddd', 
                    padding: isMobile ? '0.5rem' : '0.75rem', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '0.8rem' : '1rem'
                  }}
                  disabled={formSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ 
                    flex: 1,
                    backgroundColor: formSubmitting ? '#1a6d3c' : '#2E8B57', 
                    color: 'white',
                    border: 'none', 
                    padding: isMobile ? '0.5rem' : '0.75rem', 
                    borderRadius: '4px',
                    cursor: formSubmitting ? 'wait' : 'pointer',
                    fontSize: isMobile ? '0.8rem' : '1rem'
                  }}
                  disabled={formSubmitting}
                >
                  {formSubmitting ? 'Submitting...' : 'Submit Tree'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Overlay when forms are open */}
        {(showAddTreeForm) && (
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1000
            }}
            onClick={() => {
              setShowAddTreeForm(false);
            }}
          />
        )}
        
        {/* Toast Notification */}
        {toast && (
          <div 
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              padding: '15px 20px',
              borderRadius: '4px',
              color: 'white',
              backgroundColor: toast.type === 'success' ? '#2E8B57' : 
                             toast.type === 'error' ? '#e74c3c' : '#3498db',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1005,
              maxWidth: '300px',
              wordWrap: 'break-word'
            }}
          >
            {toast.message}
          </div>
        )}
      </main>

      {/* Bottom Navigation - Hidden on desktop, shown on mobile */}
      {isMobile && (
        <nav style={{ 
          backgroundColor: 'white', 
          padding: '0.5rem', 
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-around',
          zIndex: 1002,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }}>
          <button 
            style={{ 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#2E8B57',
              fontWeight: 'bold'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>📍</span>
            <span style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Map</span>
          </button>
          <button 
            style={{ 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#666'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <span style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Search</span>
          </button>
          <button 
            style={{ 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#666'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🌿</span>
            <span style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Seasons</span>
          </button>
          <button 
            style={{ 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#666'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>👤</span>
            <span style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;