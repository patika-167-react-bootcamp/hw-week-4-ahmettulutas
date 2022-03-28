import {FormControl, InputLabel, Select, MenuItem, Grid} from '@mui/material'
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories, selectStatus} from '../categories/CategoriesSlice';
import { getStatus } from '../categories/CategoriesSlice';

export default function OptionButtons({categoryId , statusId, handleChange}:any) {
  const categories = useSelector(selectCategories);
  const statusList = useSelector(selectStatus);
  const dispatch = useDispatch();  
  useEffect(() => {
    // this function gets all the status for each category.
      categories.forEach((item:any) => {
        dispatch(getStatus(item.id))  
          }) 
    },[]);

  return (
   <Grid>
      <FormControl variant="filled" sx={{ minWidth: 160 }}>
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
              <MenuItem defaultValue={item.id} key={item.id} value={item.id}>{item.title}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ marginLeft:1, minWidth: 160 }}>
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
        statusList[categoryId] && statusList[categoryId].map((item:any) => (
         <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>))
         } 
        </Select>
      </FormControl>
  </Grid>
        
  )
}