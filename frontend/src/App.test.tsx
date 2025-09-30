import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock the Leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TileLayer: () => <div>TileLayer</div>,
  Marker: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the API service
jest.mock('../services/api', () => ({
  treeAPI: {
    getAllTrees: jest.fn(() => Promise.resolve({ data: { trees: [] } })),
    createTree: jest.fn(() => Promise.resolve({ data: { tree: { id: 'test', title: 'Test Tree', location: '{"coordinates": [-46.6333, -23.5505]}' } } })),
  },
  speciesAPI: {
    getAllSpecies: jest.fn(() => Promise.resolve({ data: { species: [] } })),
  }
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Fruit Map 🌳')).toBeInTheDocument();
  });

  test('shows add tree form when button is clicked', () => {
    render(<App />);
    
    const addButton = screen.getByText('Add Tree');
    fireEvent.click(addButton);
    
    expect(screen.getByText('Add New Tree')).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    render(<App />);
    
    // Click add tree button
    const addButton = screen.getByText('Add Tree');
    fireEvent.click(addButton);
    
    // Submit empty form
    const submitButton = screen.getByText('Submit Tree');
    fireEvent.click(submitButton);
    
    // Expect validation error
    await waitFor(() => {
      expect(screen.getByText('Tree name/description is required.')).toBeInTheDocument();
    });
  });

  test('validates coordinate inputs', async () => {
    render(<App />);
    
    // Click add tree button
    const addButton = screen.getByText('Add Tree');
    fireEvent.click(addButton);
    
    // Fill in form with invalid coordinates
    const titleInput = screen.getByPlaceholderText('e.g. Mango Tree near the playground');
    fireEvent.change(titleInput, { target: { value: 'Test Tree' } });
    
    const speciesSelect = screen.getByRole('combobox', { name: /fruit type/i });
    fireEvent.change(speciesSelect, { target: { value: 'mango' } });
    
    // Mock invalid coordinates (outside valid range)
    // Note: This would require mocking the map click functionality
    
    // Submit form
    const submitButton = screen.getByText('Submit Tree');
    fireEvent.click(submitButton);
    
    // Expect validation error for coordinates
    // Note: Implementation would depend on how coordinate validation is implemented
  });

  test('handles API errors gracefully', async () => {
    // Mock API to return an error
    const mockTreeAPI = require('../services/api').treeAPI;
    mockTreeAPI.getAllTrees.mockRejectedValueOnce(new Error('API Error'));
    
    render(<App />);
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error loading trees/i)).toBeInTheDocument();
    });
  });

  test('successfully submits a new tree', async () => {
    // Mock successful API response
    const mockTreeAPI = require('../services/api').treeAPI;
    mockTreeAPI.createTree.mockResolvedValueOnce({
      data: { 
        tree: { 
          id: 'new-tree-id', 
          title: 'New Tree', 
          location: '{"coordinates": [-46.6333, -23.5505]}' 
        } 
      }
    });
    
    render(<App />);
    
    // Click add tree button
    const addButton = screen.getByText('Add Tree');
    fireEvent.click(addButton);
    
    // Fill in the form
    const titleInput = screen.getByPlaceholderText('e.g. Mango Tree near the playground');
    fireEvent.change(titleInput, { target: { value: 'New Tree' } });
    
    const speciesSelect = screen.getByRole('combobox', { name: /fruit type/i });
    fireEvent.change(speciesSelect, { target: { value: 'mango' } });
    
    // Submit the form
    const submitButton = screen.getByText('Submit Tree');
    fireEvent.click(submitButton);
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.queryByText('Add New Tree')).not.toBeInTheDocument();
    });
  });
});