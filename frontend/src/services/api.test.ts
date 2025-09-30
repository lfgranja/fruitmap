import axios from 'axios';
import { treeAPI, speciesAPI, authAPI } from './api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('treeAPI', () => {
    describe('getAllTrees', () => {
      it('should call the correct endpoint with parameters', async () => {
        const params = { speciesId: '1', accessibility: 'public' };
        mockedAxios.get.mockResolvedValue({ data: { trees: [] } });

        await treeAPI.getAllTrees(params);

        expect(mockedAxios.get).toHaveBeenCalledWith('/trees', { params });
      });

      it('should handle errors gracefully', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValue(error);

        await expect(treeAPI.getAllTrees()).rejects.toThrow('Network error');
      });

      it('should handle 404 errors correctly', async () => {
        const error = new Error('Not Found');
        error.response = { status: 404, data: {} };
        mockedAxios.get.mockRejectedValue(error);

        await expect(treeAPI.getAllTrees()).rejects.toHaveProperty('response.status', 404);
      });

      it('should handle unauthorized access correctly', async () => {
        const error = new Error('Unauthorized');
        error.response = { status: 401, data: {} };
        mockedAxios.get.mockRejectedValue(error);

        await expect(treeAPI.getAllTrees()).rejects.toHaveProperty('response.status', 401);
      });
    });

    describe('createTree', () => {
      it('should call the correct endpoint with tree data', async () => {
        const treeData = {
          speciesId: 1,
          location: '{"type": "Point", "coordinates": [-46.6333, -23.5505]}',
          title: 'Test Tree',
          description: 'A test tree',
          accessibility: 'public'
        };
        mockedAxios.post.mockResolvedValue({ data: { tree: { id: '1' } } });

        await treeAPI.createTree(treeData);

        expect(mockedAxios.post).toHaveBeenCalledWith('/trees', treeData);
      });

      it('should handle errors gracefully', async () => {
        const treeData = {
          speciesId: 1,
          location: '{"type": "Point", "coordinates": [-46.6333, -23.5505]}',
          title: 'Test Tree',
          description: 'A test tree',
          accessibility: 'public'
        };
        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValue(error);

        await expect(treeAPI.createTree(treeData)).rejects.toThrow('Network error');
      });

      it('should handle validation errors correctly', async () => {
        const treeData = {
          speciesId: 1,
          location: '{"type": "Point", "coordinates": [-46.6333, -23.5505]}',
          title: 'Test Tree',
          description: 'A test tree',
          accessibility: 'public'
        };
        const error = new Error('Validation failed');
        error.response = { 
          status: 400, 
          data: { 
            error: 'Validation failed',
            details: [
              { field: 'title', message: 'Title is required' }
            ]
          } 
        };
        mockedAxios.post.mockRejectedValue(error);

        await expect(treeAPI.createTree(treeData)).rejects.toHaveProperty('response.status', 400);
      });
    });

    describe('getTreeById', () => {
      it('should call the correct endpoint with tree ID', async () => {
        const treeId = '123';
        mockedAxios.get.mockResolvedValue({ data: { tree: { id: treeId } } });

        await treeAPI.getTreeById(treeId);

        expect(mockedAxios.get).toHaveBeenCalledWith(`/trees/${treeId}`);
      });

      it('should handle errors gracefully', async () => {
        const treeId = '123';
        const error = new Error('Tree not found');
        mockedAxios.get.mockRejectedValue(error);

        await expect(treeAPI.getTreeById(treeId)).rejects.toThrow('Tree not found');
      });
    });

    describe('updateTree', () => {
      it('should call the correct endpoint with tree ID and data', async () => {
        const treeId = '123';
        const treeData = { title: 'Updated Tree' };
        mockedAxios.patch.mockResolvedValue({ data: { tree: { id: treeId, title: 'Updated Tree' } } });

        await treeAPI.updateTree(treeId, treeData);

        expect(mockedAxios.patch).toHaveBeenCalledWith(`/trees/${treeId}`, treeData);
      });

      it('should handle errors gracefully', async () => {
        const treeId = '123';
        const treeData = { title: 'Updated Tree' };
        const error = new Error('Update failed');
        mockedAxios.patch.mockRejectedValue(error);

        await expect(treeAPI.updateTree(treeId, treeData)).rejects.toThrow('Update failed');
      });
    });

    describe('deleteTree', () => {
      it('should call the correct endpoint with tree ID', async () => {
        const treeId = '123';
        mockedAxios.delete.mockResolvedValue({ data: { message: 'Tree deleted successfully' } });

        await treeAPI.deleteTree(treeId);

        expect(mockedAxios.delete).toHaveBeenCalledWith(`/trees/${treeId}`);
      });

      it('should handle errors gracefully', async () => {
        const treeId = '123';
        const error = new Error('Delete failed');
        mockedAxios.delete.mockRejectedValue(error);

        await expect(treeAPI.deleteTree(treeId)).rejects.toThrow('Delete failed');
      });
    });

    describe('searchTrees', () => {
      it('should call the correct endpoint with search parameters', async () => {
        const params = { query: 'mango', lat: -23.5505, lng: -46.6333, radius: 10 };
        mockedAxios.get.mockResolvedValue({ data: { trees: [] } });

        await treeAPI.searchTrees(params);

        expect(mockedAxios.get).toHaveBeenCalledWith('/trees/search', { params });
      });

      it('should handle errors gracefully', async () => {
        const params = { query: 'mango' };
        const error = new Error('Search failed');
        mockedAxios.get.mockRejectedValue(error);

        await expect(treeAPI.searchTrees(params)).rejects.toThrow('Search failed');
      });
    });
  });

  describe('speciesAPI', () => {
    describe('getAllSpecies', () => {
      it('should call the correct endpoint', async () => {
        mockedAxios.get.mockResolvedValue({ data: { species: [] } });

        await speciesAPI.getAllSpecies();

        expect(mockedAxios.get).toHaveBeenCalledWith('/species');
      });

      it('should handle errors gracefully', async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValue(error);

        await expect(speciesAPI.getAllSpecies()).rejects.toThrow('Network error');
      });
    });

    describe('getSpeciesById', () => {
      it('should call the correct endpoint with species ID', async () => {
        const speciesId = '1';
        mockedAxios.get.mockResolvedValue({ data: { species: { id: speciesId } } });

        await speciesAPI.getSpeciesById(speciesId);

        expect(mockedAxios.get).toHaveBeenCalledWith(`/species/${speciesId}`);
      });

      it('should handle errors gracefully', async () => {
        const speciesId = '1';
        const error = new Error('Species not found');
        mockedAxios.get.mockRejectedValue(error);

        await expect(speciesAPI.getSpeciesById(speciesId)).rejects.toThrow('Species not found');
      });
    });
  });

  describe('authAPI', () => {
    describe('login', () => {
      it('should call the correct endpoint with credentials', async () => {
        const credentials = { email: 'test@example.com', password: 'password' };
        mockedAxios.post.mockResolvedValue({ data: { token: 'test-token' } });

        await authAPI.login(credentials.email, credentials.password);

        expect(mockedAxios.post).toHaveBeenCalledWith('/auth/login', credentials);
      });

      it('should handle errors gracefully', async () => {
        const credentials = { email: 'test@example.com', password: 'password' };
        const error = new Error('Network error');
        mockedAxios.post.mockRejectedValue(error);

        await expect(authAPI.login(credentials.email, credentials.password)).rejects.toThrow('Network error');
      });

      it('should handle invalid credentials correctly', async () => {
        const credentials = { email: 'test@example.com', password: 'wrong-password' };
        const error = new Error('Invalid credentials');
        error.response = { status: 401, data: { error: 'Invalid credentials' } };
        mockedAxios.post.mockRejectedValue(error);

        await expect(authAPI.login(credentials.email, credentials.password)).rejects.toHaveProperty('response.status', 401);
      });
    });

    describe('register', () => {
      it('should call the correct endpoint with user data', async () => {
        const userData = { 
          email: 'test@example.com', 
          password: 'password', 
          fullName: 'Test User', 
          username: 'testuser' 
        };
        mockedAxios.post.mockResolvedValue({ data: { token: 'test-token' } });

        await authAPI.register(userData.email, userData.password, userData.fullName, userData.username);

        expect(mockedAxios.post).toHaveBeenCalledWith('/auth/register', userData);
      });

      it('should handle errors gracefully', async () => {
        const userData = { 
          email: 'test@example.com', 
          password: 'password', 
          fullName: 'Test User', 
          username: 'testuser' 
        };
        const error = new Error('Registration failed');
        mockedAxios.post.mockRejectedValue(error);

        await expect(authAPI.register(userData.email, userData.password, userData.fullName, userData.username)).rejects.toThrow('Registration failed');
      });

      it('should handle validation errors correctly', async () => {
        const userData = { 
          email: 'invalid-email', 
          password: 'short', 
          fullName: '', 
          username: 'testuser' 
        };
        const error = new Error('Validation failed');
        error.response = { 
          status: 400, 
          data: { 
            error: 'Validation failed',
            details: [
              { field: 'email', message: 'Email is invalid' },
              { field: 'password', message: 'Password is too short' },
              { field: 'fullName', message: 'Full name is required' }
            ]
          } 
        };
        mockedAxios.post.mockRejectedValue(error);

        await expect(authAPI.register(userData.email, userData.password, userData.fullName, userData.username)).rejects.toHaveProperty('response.status', 400);
      });
    });

    describe('getProfile', () => {
      it('should call the correct endpoint', async () => {
        mockedAxios.get.mockResolvedValue({ data: { user: { id: '1', email: 'test@example.com' } } });

        await authAPI.getProfile();

        expect(mockedAxios.get).toHaveBeenCalledWith('/auth/profile');
      });

      it('should handle errors gracefully', async () => {
        const error = new Error('Profile not found');
        mockedAxios.get.mockRejectedValue(error);

        await expect(authAPI.getProfile()).rejects.toThrow('Profile not found');
      });
    });
  });
});