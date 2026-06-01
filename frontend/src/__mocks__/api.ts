/**
 * API Mocks for Testing
 *
 * This module provides mock functions and fixtures for all API calls
 * used in the Todo App. These mocks are used in unit tests to isolate
 * components from actual API calls.
 */

export interface TaskDTO {
  id: number;
  title: string;
  completed: boolean;
  position: number;
}

export interface ReorderPayload {
  tasks: Array<{ id: number; position: number }>;
}

// Mock API responses
export const mockApiResponses = {
  tasks: {
    single: {
      id: 1,
      title: 'Test Task',
      completed: false,
      position: 0,
    } as TaskDTO,

    list: [
      { id: 1, title: 'Task 1', completed: false, position: 0 },
      { id: 2, title: 'Task 2', completed: true, position: 1 },
      { id: 3, title: 'Task 3', completed: false, position: 2 },
    ] as TaskDTO[],

    empty: [] as TaskDTO[],

    withCompletedTasks: [
      { id: 1, title: 'Completed Task 1', completed: true, position: 0 },
      { id: 2, title: 'Incomplete Task', completed: false, position: 1 },
      { id: 3, title: 'Completed Task 2', completed: true, position: 2 },
    ] as TaskDTO[],

    withSpecialCharacters: [
      {
        id: 1,
        title: 'Task with <html> & "quotes"',
        completed: false,
        position: 0,
      },
      {
        id: 2,
        title: "Task with 'apostrophes'",
        completed: false,
        position: 1,
      },
    ] as TaskDTO[],
  },

  reorder: {
    success: { message: 'Tasks reordered successfully' },
    failure: { error: 'Failed to reorder tasks' },
  },

  errors: {
    notFound: { error: 'Task not found' },
    badRequest: { error: 'Bad request' },
    serverError: { error: 'Internal server error' },
    conflict: { error: 'Conflict' },
  },
};

// Mock fetch wrapper
export function mockFetchResponse(
  data: any = null,
  options: {
    status?: number;
    ok?: boolean;
    headers?: Record<string, string>;
  } = {}
) {
  const {
    status = 200,
    ok = status >= 200 && status < 300,
    headers = { 'Content-Type': 'application/json' },
  } = options;

  return {
    status,
    ok,
    headers: new Headers(headers),
    json: jest.fn().mockResolvedValue(data),
    text: jest.fn().mockResolvedValue(JSON.stringify(data)),
    blob: jest.fn().mockResolvedValue(new Blob([JSON.stringify(data)])),
    clone: jest.fn(),
  };
}

// Mock fetch error
export function mockFetchError(message = 'Network error') {
  return Promise.reject(new Error(message));
}

// Mock fetch implementations for different endpoints
export const mockFetchImplementations = {
  getTasks: (apiUrl: string) => {
    return (url: string, init?: RequestInit) => {
      if (url === `https://${apiUrl}/tasks/` && (!init || init.method === 'GET')) {
        return Promise.resolve(
          mockFetchResponse(mockApiResponses.tasks.list)
        );
      }
      return Promise.reject(new Error('Unknown request'));
    };
  },

  createTask: (apiUrl: string, taskData: { title: string }) => {
    return (url: string, init?: RequestInit) => {
      if (url === `https://${apiUrl}/tasks/` && init?.method === 'POST') {
        const newTask: TaskDTO = {
          id: Math.random(),
          title: taskData.title,
          completed: false,
          position: 0,
        };
        return Promise.resolve(mockFetchResponse(newTask));
      }
      return Promise.reject(new Error('Unknown request'));
    };
  },

  updateTask: (apiUrl: string, taskId: number, taskData: Partial<TaskDTO>) => {
    return (url: string, init?: RequestInit) => {
      if (
        url === `https://${apiUrl}/tasks/${taskId}` &&
        init?.method === 'PUT'
      ) {
        const updatedTask: TaskDTO = {
          id: taskId,
          title: taskData.title || 'Task',
          completed: taskData.completed || false,
          position: taskData.position || 0,
        };
        return Promise.resolve(mockFetchResponse(updatedTask));
      }
      return Promise.reject(new Error('Unknown request'));
    };
  },

  deleteTask: (apiUrl: string, taskId: number) => {
    return (url: string, init?: RequestInit) => {
      if (
        url === `https://${apiUrl}/tasks/${taskId}` &&
        init?.method === 'DELETE'
      ) {
        return Promise.resolve(mockFetchResponse({ success: true }));
      }
      return Promise.reject(new Error('Unknown request'));
    };
  },

  updateTaskTitle: (apiUrl: string, taskId: number, title: string) => {
    return (url: string, init?: RequestInit) => {
      if (
        url === `https://${apiUrl}/tasks/${taskId}/title` &&
        init?.method === 'PATCH'
      ) {
        return Promise.resolve(
          mockFetchResponse({ id: taskId, title, updated: true })
        );
      }
      return Promise.reject(new Error('Unknown request'));
    };
  },

  reorderTasks: (apiUrl: string, tasks: ReorderPayload) => {
    return (url: string, init?: RequestInit) => {
      if (
        url === `https://${apiUrl}/tasks/reorder` &&
        init?.method === 'POST'
      ) {
        return Promise.resolve(mockFetchResponse(mockApiResponses.reorder.success));
      }
      return Promise.reject(new Error('Unknown request'));
    };
  },

  error: (errorMessage: string) => {
    return () => mockFetchError(errorMessage);
  },
};

// Helper to set up fetch mock for testing
export function setupFetchMock(
  implementation: (url: string, init?: RequestInit) => Promise<any>
) {
  global.fetch = jest.fn(implementation);
}

// Helper to reset fetch mock
export function resetFetchMock() {
  if (typeof global.fetch !== 'undefined') {
    (global.fetch as jest.Mock).mockClear();
  }
}

// Helper to verify fetch was called with correct parameters
export function verifyFetchCall(
  url: string,
  init?: RequestInit
) {
  const fetchMock = global.fetch as jest.Mock;
  expect(fetchMock).toHaveBeenCalledWith(url, init);
}

// Mock data generators
export function generateMockTask(
  overrides?: Partial<TaskDTO>
): TaskDTO {
  return {
    id: Math.random(),
    title: 'Generated Task',
    completed: false,
    position: 0,
    ...overrides,
  };
}

export function generateMockTasks(
  count: number,
  overrides?: Partial<TaskDTO>
): TaskDTO[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    completed: i % 2 === 0,
    position: i,
    ...overrides,
  }));
}

// Response validators
export function isValidTaskResponse(data: any): data is TaskDTO {
  return (
    data &&
    typeof data.id === 'number' &&
    typeof data.title === 'string' &&
    typeof data.completed === 'boolean' &&
    typeof data.position === 'number'
  );
}

export function isValidTaskListResponse(data: any): data is TaskDTO[] {
  return Array.isArray(data) && data.every(isValidTaskResponse);
}
