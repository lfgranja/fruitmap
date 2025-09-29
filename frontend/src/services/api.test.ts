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
    });
  });

  describe('speciesAPI', () => {
    describe('getAllSpecies', () => {
      it('should call the correct endpoint', async () => {
        mockedAxios.get.mockResolvedValue({ data: { species: [] } });

        await speciesAPI.getAllSpecies();

        expect(mockedAxios.get).toHaveBeenCalledWith('/species');
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
    });
  });
});