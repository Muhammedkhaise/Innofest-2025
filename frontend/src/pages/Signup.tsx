import React, { useState } from 'react'
import { signup } from '../api/api'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(form)
      setMessage('Signup successful. Please check your email for confirmation.')
    } catch (err) {
      setMessage('Signup failed')
    }
  }

  return (
    <div>
      <h2>Team Leader Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  )
}
