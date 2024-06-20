import create from 'zustand';

// Define the Request interface
interface Request {
  id: string; // Added an 'id' field for unique identification
  name: string;
  course: string;
  description: string;
  roles: string[];
  stack: string[];
  contactUser: string;
  contactGroup: string;
  creater: string;
  dateCreated: string;
  group: string;
}

// Define the Store interface
interface Store {
  requests: Request[];
  addRequest: (request: Request) => void;
  removeRequest: (requestId: string) => void;
  updateRequest: (updatedRequest: Request) => void;
  loadRequests: (requests: Request[]) => void;
}

// Create the useStore hook using zustand
const useStore = create<Store>((set) => ({
  requests: [],

  // Action to add a new request
  addRequest: (request) =>
    set((state) => ({
      requests: [...state.requests, request],
    })),

  // Action to remove a request
  removeRequest: (requestId) =>
    set((state) => ({
      requests: state.requests.filter((request) => request.id !== requestId),
    })),

  // Action to update a request
  updateRequest: (updatedRequest) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      ),
    })),

  // Action to load an array of requests
  loadRequests: (requests: Request[]) =>
    set((state) => ({
      requests: [...state.requests, ...requests], // Spread the existing requests with the new ones
    })),
}));

export default useStore;