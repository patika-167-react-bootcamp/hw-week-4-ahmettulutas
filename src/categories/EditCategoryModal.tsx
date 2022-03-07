import React, {useState, useEffect} from 'react';
import { Modal, Box, Button, MenuItem } from '@mui/material';
import { FormGroup,  TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { List, ListItem, ListItemText } from '@mui/material';
import { selectStatus, addStatus, getStatus, updateStatus, deleteStatus } from './CategoriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete";
import { selectToken } from '../auth/AuthSlice';
import SaveIcon from '@mui/icons-material/Save';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display:'flex',
    flexDirection:'column',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  
export default function EditCategoryModal ({item}:any) { 
  const statusList = useSelector(selectStatus);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const {id} = item;
  const [open, setOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState({title:"",categoryId:id, color:"red"});
  const [editedStatus, setEditedStatus] = useState({title:"",categoryId:id});
  
  const handleOpen = () => {
    setOpen(open => !open);
  };
  const handleAdd = (e:any) => {
    e.preventDefault();
    dispatch(addStatus(newStatus));
    setNewStatus({title:"",categoryId:id, color:"red"})
  }
  const handleUpdate = (id:any) => {
    dispatch(updateStatus({id, editedStatus}));
    setEditedStatus({title:"", categoryId:id});
  }
  const handleDelete = (id:any) => {
    dispatch(deleteStatus(id));
  }
  return (  
    <div>
      <EditIcon onClick={handleOpen}></EditIcon>
      <Modal
        /* hideBackdrop */
        open={open}
        onClose={handleOpen}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "60%", height:"auto"}}>
          <h2 id="child-modal-title">Add Status</h2>
          <form onSubmit={handleAdd}>
            <TextField onChange={(e:any) => {setNewStatus(prev => ({...prev,title:e.target.value}))}} value={newStatus.title} id="parent-modal-title" sx={{m:1}} label="name" variant="filled" />
            <Button type="submit" sx={{m:1, p:2}} variant="contained" color="success">Add</Button> 
          </form>
      <List sx={{overflow:"scroll", maxHeight:"250px"}}>
         {
        statusList[id] && statusList[id].map((status:any) => (
          <ListItem  key={status.id}>
          <TextField defaultValue={status.title}  onChange={(e:any) => {setEditedStatus(prev => ({...prev,title:e.target.value}))}}></TextField>
          <Button
          size="small"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={()=> handleDelete(status.id)}
          variant="outlined"
        ></Button>
        <Button
          size="small"
          startIcon={<SaveIcon />}
          color="error"
          onClick={()=> handleUpdate(status.id)}
          variant="outlined"
        ></Button>
        </ListItem>))
         }
      </List>
          <Button variant="contained" color="error" onClick={handleOpen}>Close</Button>
        </Box>
      </Modal>  
    </div>
        );
}
