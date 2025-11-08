import { useEffect, useState } from 'react'
import { getTeams, allocateRoom, generateNomination } from '../api/api'

export default function AdminDashboard(){
  const [teams, setTeams] = useState<any[]>([])
  useEffect(()=>{ getTeams().then(setTeams) },[])

  const handleAllocate = async (teamId:number) =>{
    const room = prompt('Enter room number for team')
    if(!room) return
    await allocateRoom(teamId, { room })
    setTeams(await getTeams())
  }

  const handleNomination = async (teamId:number) =>{
    const blob = await generateNomination(teamId)
    // download PDF
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nomination-${teamId}.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="team-grid">
        {teams.map(t=> (
          <div className="card" key={t.id}>
            <h3>{t.name}</h3>
            <p>Leader: {t.leader?.name}</p>
            <p>Room: {t.room || 'not allocated'}</p>
            <button onClick={()=>handleAllocate(t.id)}>Allocate Room</button>
            <button onClick={()=>handleNomination(t.id)}>Generate Nomination Letter</button>
          </div>
        ))}
      </div>
    </div>
  )
}
