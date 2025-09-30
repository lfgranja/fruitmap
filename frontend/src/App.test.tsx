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
});