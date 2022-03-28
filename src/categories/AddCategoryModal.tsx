import { FormGroup, List, ListItem, ListItemText, TextField,} from '@mui/material';
import { Modal, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import EditCategoryModal from './EditCategoryModal';
import { selectCategories } from './CategoriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, updateCategory, deleteCategory } from './CategoriesSlice';
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';

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
  const categories = useSelector(selectCategories);
  const [newCategory, setNewCategory] = useState({title:""});
  const [editedCategory, setEditedCategory] = useState({title:""});
  const [open, setOpen] = useState<boolean>(false);
  const dispatch= useDispatch();
  const handleOpen = () => {
    setOpen(open => !open);
  };
  const handleAdd = (e:any) => {
    e.preventDefault();
    dispatch(addCategory(newCategory));
    setNewCategory({title:""});
  }
  const handleUpdate = (id:any) => {
    dispatch(updateCategory({id, editedCategory}));
    setEditedCategory({title:""});
  }
  const handleDelete = (id:any) => {
    dispatch(deleteCategory(id));
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
          <form onSubmit={handleAdd}>
            <TextField onChange={(e:any) => {setNewCategory({title:e.target.value})}} value={newCategory.title} id="parent-modal-title" sx={{m:1}} label="name" variant="filled" />
            <Button type="submit" sx={{m:1, p:2}} variant="contained" color="success">Add</Button> 
          </form>
          <List sx={{overflow:"scroll", maxHeight:"250px"}}>
            {categories && categories.map((category:any) => (
              <ListItem sx={{display:"flex", justifyContent:"space-between", alignItems:"stretch"}}  key={category.id}>
                <TextField defaultValue={category.title} onChange={(e:any) => {setEditedCategory({title:e.target.value})}}></TextField>
                <EditCategoryModal item={category}/> 
                <Button
                size="small"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={()=> handleDelete(category.id)}
                variant="outlined"
              ></Button>
              <Button
                size="small"
                startIcon={<SaveIcon />}
                color="error"
                onClick={()=> handleUpdate(category.id)}
                variant="outlined"
              ></Button>
              </ListItem>
            ))} 
          </List>
        </Box>  
      </Modal>
    </div>
  )
}
