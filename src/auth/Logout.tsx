import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from './AuthSlice';
export default function Logout() {
    const dispatch = useDispatch();
    return (
    <button onClick={() => dispatch(logOut)}>LogOut</button>
  )
}
