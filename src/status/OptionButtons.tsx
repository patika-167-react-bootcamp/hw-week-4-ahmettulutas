import {FormControl, InputLabel, Select, MenuItem, Grid} from '@mui/material'
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from './auth/AuthSlice';
import { selectCategories} from './categories/CategoriesSlice';
import {getStatus, selectStatus} from './status/StatusSlice';

export default function OptionButtons({ categoryId, statusId, handleChange}:any) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectStatus);
  useEffect(() => {
    dispatch(getStatus({token, categoryId}))
  
  },[token, categoryId]);
  
  return (
   <Grid>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Categories</InputLabel>
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        name="categoryId"
        value={categoryId}  
        onChange={handleChange}
        defaultValue={categoryId}
        >
          {
            categories && categories.map((item:any) => (
              <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
        <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        name="statusId"
        value={statusId}
        onChange={handleChange}
        defaultValue={statusId}
        >
         {
        status && status.map((item:any) => (
         <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>))
         } 
        </Select>
      </FormControl>
  </Grid>
        
  )
}