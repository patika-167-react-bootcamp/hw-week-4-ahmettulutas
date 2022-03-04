import { List, ListItem, TextField, ListItemText } from '@mui/material';
import { Modal, Box, Button } from '@mui/material';
import { useState } from 'react';
import EditCategoryModal from './EditCategoryModal';
import { selectCategories } from './CategoriesSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addCategory } from './CategoriesSlice';
import { selectToken } from '../auth/AuthSlice';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function AddCategoryModal() {
  const [newCategory, setNewCategory] = useState({title:""})
  const categories = useSelector(selectCategories);
  const token = useSelector(selectToken);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch= useDispatch();
  const handleOpen = () => {
    setOpen(open => !open);
  };
  const handleChange = (e:any) => {
    setNewCategory(prev=>({title:e.target.value}));
    console.log(newCategory)
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(addCategory({newCategory,token}));
  }
  return (
    <div>
      <Button onClick={handleOpen}>Add Categories</Button>
      <Modal
          open={open}
          onClose={handleOpen}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style, width: "60%", height:"auto" }}>
          <h1>Add Categories</h1>
          <form onSubmit={handleSubmit}>
          <TextField onChange={handleChange} value={newCategory.title} id="parent-modal-title" sx={{m:1}} label="name" variant="filled" />
          <Button type="submit" sx={{m:1, p:2}} variant="contained" color="success">Add</Button> 
          </form>
          <List>
            {categories && categories.map((category:any) => (
              <ListItem key={category.id}>
                <ListItemText>{category.title}</ListItemText>
                <EditCategoryModal categoryId={category.id}/>
              </ListItem>
            ))}
          </List>
        </Box>  
      </Modal>
    </div>
  )
}
