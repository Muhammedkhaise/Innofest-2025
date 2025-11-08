import React, { useState } from 'react'
import { addMember, uploadPPT, getMyTeam } from '../api/api'

export default function TeamDashboard() {
  const [team, setTeam] = useState<any>(null)
  const [memberName, setMemberName] = useState('')

  const refresh = async () => {
    const t = await getMyTeam()
    setTeam(t)
  }

  React.useEffect(() => { refresh() }, [])

  const handleAdd = async () => {
    if (!memberName) return
    await addMember({ name: memberName })
    setMemberName('')
    await refresh()
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    await uploadPPT(f)
    await refresh()
  }

  return (
    <div>
      <h2>Team Dashboard</h2>
      {!team ? <p>Loading…</p> : (
        <div>
          <h3>{team.name}</h3>
          <img src={team.image || ''} alt="team" style={{width:120,height:80,objectFit:'cover'}} />
          <h4>Members</h4>
          <ul>
            {team.members?.map((m:any)=> <li key={m.id}>{m.name}</li>)}
          </ul>
          <div>
            <input value={memberName} onChange={(e)=>setMemberName(e.target.value)} placeholder="Member name" />
            <button onClick={handleAdd}>Add member</button>
          </div>
          <div>
            <label>Upload PPT</label>
            <input type="file" accept=".ppt,.pptx" onChange={handleFile} />
          </div>
        </div>
      )}
    </div>
  )
}
