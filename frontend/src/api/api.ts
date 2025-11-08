import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'
const client = axios.create({ baseURL: API_BASE })

// --- Public API used by the UI (these map to expected backend endpoints)

export async function getTeams(){
  // GET /teams/
  const res = await client.get('/teams/')
  return res.data
}

export async function signup(payload:{name:string,email:string,password:string}){
  // POST /accounts/signup/
  await client.post('/accounts/signup/', payload)
}

export async function getMyTeam(){
  // GET /teams/me/
  const res = await client.get('/teams/me/')
  return res.data
}

export async function addMember(payload:{name:string}){
  // POST /teams/me/members/
  const res = await client.post('/teams/me/members/', payload)
  return res.data
}

export async function uploadPPT(file:File){
  const fd = new FormData()
  fd.append('ppt', file)
  // POST /uploads/ppt/
  const res = await client.post('/uploads/ppt/', fd, { headers: {'Content-Type':'multipart/form-data'} })
  return res.data
}

export async function allocateRoom(teamId:number, payload:{room:string}){
  // POST /admin/teams/:id/allocate/
  const res = await client.post(`/admin/teams/${teamId}/allocate/`, payload)
  return res.data
}

export async function generateNomination(teamId:number){
  // GET /admin/teams/:id/nomination/ (returns application/pdf)
  const res = await client.get(`/admin/teams/${teamId}/nomination/`, { responseType: 'blob' })
  return res.data
}

// Exports for testing / future expansion
export default client
