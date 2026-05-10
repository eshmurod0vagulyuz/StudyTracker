import api from './axios'

// AUTH
export const authAPI = {
  register: (data) => api.post('/users/register/', data),
  login: (data) => api.post('/users/login/', data),
  logout: (refresh) => api.post('/users/logout/', { refresh }),
  me: () => api.get('/users/me/'),
  updateProfile: (data) => api.patch('/users/me/', data),
}

// TASKS - backend: /api/tasks/tasks/
export const taskAPI = {
  list: (params) => api.get('/tasks/tasks/', { params }),
  create: (data) => api.post('/tasks/tasks/', data),
  detail: (id) => api.get(`/tasks/tasks/${id}/`),
  update: (id, data) => api.patch(`/tasks/tasks/${id}/`, data),
  delete: (id) => api.delete(`/tasks/tasks/${id}/`),
  complete: (id) => api.post(`/tasks/tasks/${id}/complete/`),
}

// SUBJECTS - backend: /api/tasks/subjects/
export const subjectAPI = {
  list: () => api.get('/tasks/subjects/'),
  create: (data) => api.post('/tasks/subjects/', data),
  delete: (id) => api.delete(`/tasks/subjects/${id}/`),
}

// STATISTICS
export const statsAPI = {
  dashboard: () => api.get('/statistics/dashboard/'),
  weekly: () => api.get('/statistics/weekly/'),
  overdue: () => api.get('/statistics/overdue/'),
  upcoming: () => api.get('/statistics/upcoming/'),
}

// ACHIEVEMENTS
export const achievementAPI = {
  list: () => api.get('/achievements/'),
  mine: () => api.get('/achievements/my_achievements/'),
}

// STUDY HISTORY
export const historyAPI = {
  list: () => api.get('/history/'),
  create: (data) => api.post('/history/', data),
  bySubject: () => api.get('/history/by_subject/'),
}
