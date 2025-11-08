import React, { useEffect, useState } from 'react'
import { getTeams } from '../api/api'
import TeamCard from '../components/TeamCard'

export default function Landing() {
  const [teams, setTeams] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getTeams()
      .then((data) => {
        if (mounted) setTeams(data)
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div>
      <h1>Registered Teams</h1>
      {loading ? (
        <p>Loading teams…</p>
      ) : (
        <div className="team-grid">
          {teams.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      )}
    </div>
  )
}
