import { http, HttpResponse } from 'msw'

interface TeamMember {
  id: number
  name: string
}

interface Team {
  id: number
  name: string
  image: string
  leader: TeamMember
  members: TeamMember[]
  room: string | null
}

interface SignupBody {
  name: string
  email: string
}

interface AddMemberBody {
  name: string
}

interface AllocateRoomBody {
  room: string
}

const teams: Team[] = [
  { id: 1, name: 'Team Alpha', image: '', leader: { id: 1, name: 'Alice' }, members: [{id:11,name:'Alice'},{id:12,name:'Bob'}], room:null },
  { id: 2, name: 'Team Beta', image: '', leader: { id: 2, name: 'Bob' }, members: [{id:21,name:'Bob'},{id:22,name:'Charlie'}], room:'R-101' }
]

export const handlers = [
  http.get('/api/teams/', () => {
    return HttpResponse.json(teams)
  }),

  http.post('/api/accounts/signup/', async ({ request }) => {
    // accept signup, pretend to send email
    const body = await request.json() as SignupBody
    // create a team with leader placeholder
    const id = teams.length + 1
    teams.push({ 
      id, 
      name: body.name + "'s Team", 
      image: '', 
      leader: {id, name: body.name}, 
      members: [], 
      room: null 
    })
    return new HttpResponse(null, { status: 201 })
  }),

  http.get('/api/teams/me/', () => {
    // return first team for dev
    return HttpResponse.json(teams[0])
  }),

  http.post('/api/teams/me/members/', async ({ request }) => {
    const body = await request.json() as AddMemberBody
    const t = teams[0]
    const id = Math.floor(Math.random()*10000)
    t.members.push({ id, name: body.name })
    return HttpResponse.json({ id }, { status: 201 })
  }),

  http.post('/api/uploads/ppt/', async () => {
    // pretend accept upload
    return HttpResponse.json({ ok:true }, { status: 201 })
  }),

  http.post('/api/admin/teams/:id/allocate/', async ({ params, request }) => {
    const { id } = params
    const body = await request.json() as AllocateRoomBody
    const t = teams.find(x=>String(x.id)===String(id))
    if(t){ 
      t.room = body.room
      return HttpResponse.json({ok:true})
    }
    return new HttpResponse(null, { status: 404 })
  }),

  http.get('/api/admin/teams/:id/nomination/', ({ params }) => {
    // return a small PDF-like blob (actually plain text) for dev
    const file = new Blob([`Nomination letter for team ${params.id}`], { type: 'application/pdf' })
    return new HttpResponse(file)
  })
]
