import { useState } from 'react'
import { TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from './AuthSlice';
export default function LoginForm() {
  const [form, setForm] = useState<ILoginFormProps>({username: '', password: ''});
  const dispatch = useDispatch();
  const handleChange = (event:any) => {
    const {name, value} = event.target;
    setForm({...form, [name]: value});
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(login(form));
    setForm({username: '', password: ''});

  }
  return (
    <form onSubmit={handleSubmit} style={{display:"flex", margin:"1rem auto", width:"100%",flexDirection:"column", gap:"1rem"}}>
      <Typography style={{display:"flex", width:"200px"}}>Login</Typography>
      <TextField name="username" value={form.username} onChange={handleChange} id="filled-basic" label="name" variant="filled" />
      <TextField name="password" value={form.password} onChange={handleChange} type="password" id="filled-basic" label="password" variant="filled" />
      <Button type="submit" sx={{p:2}} variant="contained" color="success">Login</Button>
    </form>
  )
}


