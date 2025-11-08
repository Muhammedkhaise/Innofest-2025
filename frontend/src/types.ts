export type Team = {
  id: number
  name: string
  image?: string
  leader?: { id:number; name:string; email?:string }
  members?: Array<{id:number;name:string}>
  room?: string | null
}
