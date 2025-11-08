import React from 'react'

export default function PPTUpload({onUpload}:{onUpload:(f:File)=>Promise<void>}){
  const handle = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const f = e.target.files?.[0]
    if(!f) return
    await onUpload(f)
  }
  return (
    <div>
      <label>Upload PPT</label>
      <input type="file" accept=".ppt,.pptx" onChange={handle} />
    </div>
  )
}
