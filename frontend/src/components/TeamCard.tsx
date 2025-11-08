import React from 'react'

export default function TeamCard({team}:{team:any}){
  return (
    <div className="card">
      <img src={team.image||''} alt={team.name} style={{width:'100%',height:140,objectFit:'cover',borderRadius:6}} />
      <h4>{team.name}</h4>
      <p>Leader: {team.leader?.name}</p>
    </div>
  )
}
