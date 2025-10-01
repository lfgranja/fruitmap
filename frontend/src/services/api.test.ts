// src/services/api.test.ts
import { treeAPI, authAPI, speciesAPI, apiClient } from './api';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
  default: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe('API Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('treeAPI', () => {
    describe('getAllTrees', () => {
      it('should call axios get with correct endpoint', async () => {
        const mockResponse = { data: [] };
        const axiosMock = require('axios').create();
        axiosMock.get.mockResolvedValue(mockResponse);

        await treeAPI.getAllTrees();

        expect(axiosMock.get).toHaveBeenCalledWith('/trees', { params: undefined });
      });

      it('should include query parameters when provided', async () => {
        const mockResponse = { data: [] };
        const axiosMock = require('axios').create();
        axiosMock.get.mockResolvedValue(mockResponse);

        const params = { speciesId: '1', limit: 10 };
        await treeAPI.getAllTrees(params);

        expect(axiosMock.get).toHaveBeenCalledWith('/trees', { params });
      });
    });

    describe('getTreeById', () => {
      it('should call axios get with correct endpoint', async () => {
        const mockResponse = { data: { id: 1 } };
        const axiosMock = require('axios').create();
        axiosMock.get.mockResolvedValue(mockResponse);

        await treeAPI.getTreeById('1');

        expect(axiosMock.get).toHaveBeenCalledWith('/trees/1');
      });
    });

    describe('createTree', () => {
      it('should call axios post with correct endpoint and data', async () => {
        const mockResponse = { data: { id: 1 } };
        const axiosMock = require('axios').create();
        axiosMock.post.mockResolvedValue(mockResponse);

        const treeData = {
          speciesId: 1,
          location: '{"type":"Point","coordinates":[1,2]}',
          title: 'Apple Tree',
          description: 'A delicious apple tree',
          accessibility: 'public',
        };

        await treeAPI.createTree(treeData);

        expect(axiosMock.post).toHaveBeenCalledWith('/trees', treeData);
      });
    });

    describe('updateTree', () => {
      it('should call axios patch with correct endpoint and data', async () => {
        const mockResponse = { data: { id: 1 } };
        const axiosMock = require('axios').create();
        axiosMock.patch.mockResolvedValue(mockResponse);

        const updateData = { title: 'Updated Tree' };
        await treeAPI.updateTree('1', updateData);

        expect(axiosMock.patch).toHaveBeenCalledWith('/trees/1', updateData);
      });
    });

    describe('deleteTree', () => {
      it('should call axios delete with correct endpoint', async () => {
        const mockResponse = { data: {} };
        const axiosMock = require('axios').create();
        axiosMock.delete.mockResolvedValue(mockResponse);

        await treeAPI.deleteTree('1');

        expect(axiosMock.delete).toHaveBeenCalledWith('/trees/1');
      });
    });

    describe('searchTrees', () => {
      it('should call axios get with correct endpoint and search params', async () => {
        const mockResponse = { data: [] };
        const axiosMock = require('axios').create();
        axiosMock.get.mockResolvedValue(mockResponse);

        const searchParams = {
          query: 'apple',
          lat: 40.7128,
          lng: -74.0060,
          radius: 10000,
        };

        await treeAPI.searchTrees(searchParams);

        expect(axiosMock.get).toHaveBeenCalledWith('/trees/search', { params: searchParams });
      });
    });
  });

  describe('authAPI', () => {
    describe('login', () => {
      it('should call axios post with correct endpoint and credentials', async () => {
        const mockResponse = { data: { token: 'fake-token' } };
        const axiosMock = require('axios').create();
        axiosMock.post.mockResolvedValue(mockResponse);

        await authAPI.login('test@example.com', 'password123');

        expect(axiosMock.post).toHaveBeenCalledWith('/auth/login', {
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    describe('register', () => {
      it('should call axios post with correct endpoint and user data', async () => {
        const mockResponse = { data: { message: 'User registered' } };
        const axiosMock = require('axios').create();
        axiosMock.post.mockResolvedValue(mockResponse);

        const userData = {
          email: 'newuser@example.com',
          password: 'password123',
          fullName: 'New User',
          username: 'newuser',
        };

        await authAPI.register(userData);

        expect(axiosMock.post).toHaveBeenCalledWith('/auth/register', userData);
      });
    });

    describe('getProfile', () => {
      beforeEach(() => {
        localStorageMock.getItem.mockReturnValue('fake-jwt-token');
      });

      it('should call axios get with correct endpoint', async () => {
        const mockResponse = { data: { id: 1, email: 'test@example.com' } };
        const axiosMock = require('axios').create();
        axiosMock.get.mockResolvedValue(mockResponse);

        await authAPI.getProfile();

        expect(axiosMock.get).toHaveBeenCalledWith('/auth/profile');
      });
    });
  });

  describe('speciesAPI', () => {
    describe('getAllSpecies', () => {
      it('should call axios get with correct endpoint', async () => {
        const mockResponse = { data: [] };
        const axiosMock = require('axios').create();
        axiosMock.get.mockResolvedValue(mockResponse);

        await speciesAPI.getAllSpecies();

        expect(axiosMock.get).toHaveBeenCalledWith('/species');
      });
    });

    describe('getSpeciesById', () => {
      it('should call axios get with correct endpoint', async () => {
        const mockResponse = { data: { id: 1, name: 'Apple' } };
        const axiosMock = require('axios').create();
        axiosMock.get.mockResolvedValue(mockResponse);

        await speciesAPI.getSpeciesById('1');

        expect(axiosMock.get).toHaveBeenCalledWith('/species/1');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const axiosMock = require('axios').create();
      const error = new Error('Network Error');
      axiosMock.get.mockRejectedValue(error);

      await expect(treeAPI.getAllTrees()).rejects.toThrow('Network Error');
    });

    it('should handle 401 errors by removing token', async () => {
      localStorageMock.getItem.mockReturnValue('fake-jwt-token');
      const axiosMock = require('axios').create();
      
      // Mock the response interceptor behavior
      const mockError = {
        response: { status: 401 },
      };
      axiosMock.get.mockRejectedValue(mockError);

      try {
        await authAPI.getProfile();
      } catch (error) {
        // Expected to throw
      }

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('Request Interceptor', () => {
    beforeEach(() => {
      localStorageMock.getItem.mockReturnValue('fake-jwt-token');
    });

    it('should add Authorization header when token is available', async () => {
      const mockResponse = { data: [] };
      const axiosMock = require('axios').create();
      axiosMock.get.mockResolvedValue(mockResponse);

      await treeAPI.getAllTrees();

      // Check that interceptor was called
      expect(axiosMock.interceptors.request.use).toHaveBeenCalled();
    });

    it('should not add Authorization header when token is not available', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const mockResponse = { data: [] };
      const axiosMock = require('axios').create();
      axiosMock.get.mockResolvedValue(mockResponse);

      await treeAPI.getAllTrees();

      // Check that interceptor was called
      expect(axiosMock.interceptors.request.use).toHaveBeenCalled();
    });
  });

  describe('Response Interceptor', () => {
    it('should remove token from localStorage on 401 error', async () => {
      localStorageMock.getItem.mockReturnValue('fake-jwt-token');
      const axiosMock = require('axios').create();
      
      const mockError = {
        response: { status: 401 },
      };
      axiosMock.get.mockRejectedValue(mockError);

      try {
        await treeAPI.getAllTrees();
      } catch (error) {
        // Expected to throw
      }

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });

    it('should not remove token on other errors', async () => {
      localStorageMock.getItem.mockReturnValue('fake-jwt-token');
      const axiosMock = require('axios').create();
      
      const mockError = {
        response: { status: 500 },
      };
      axiosMock.get.mockRejectedValue(mockError);

      try {
        await treeAPI.getAllTrees();
      } catch (error) {
        // Expected to throw
      }

      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
    });
  });
});