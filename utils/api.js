import API from '../API'

export function getClasses (params) {
  return API.get('/api/classes', { params }).then(({ data }) => data)
}

export function createClass (data) {
  return API.post('/api/classes', data)
}

export function getStudents (params) {
  return API.get('/api/students', { params }).then(({ data }) => data)
}

export function createStudent (data) {
  return API.post('/api/students', data)
}

export function deleteStudent (id) {
  return API.delete(`/api/students/${id}`)
}

export function getGuardians (params) {
  return API.get('/api/guardians', { params }).then(({ data }) => data)
}

export function createGuardian (data) {
  return API.post('/api/guardians', data)
}

export function deleteGuardian (id) {
  return API.delete(`/api/guardians/${id}`)
}
