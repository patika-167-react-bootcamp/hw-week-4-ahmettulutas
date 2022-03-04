import React, {useState, useEffect} from 'react';
import { Modal, Box, Button } from '@mui/material';
import { FormGroup,  TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../auth/AuthSlice';
import UpdateStatusModal from '../UpdateStatusModal';
import {getStatus, selectStatus} from '../status/StatusSlice';
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
  
export default function EditCategoryModal ({categoryId}:any) {
  const status = useSelector(selectStatus);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setOpen(open => !open);
  };

  return (
    <div>
      <EditIcon onClick={handleOpen}>Edit Status</EditIcon>
      <Modal
        /* hideBackdrop */
        open={open}
        onClose={handleOpen}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: "60%", height:"auto"}}>
          <h2 id="child-modal-title">Edit Status</h2>
          <FormGroup style={{margin:"0.5rem auto", width:"100%"}}>
          <TextField sx={{m:1}} id="parent-modal-title" label="name" variant="filled" />
          <Button type="submit" sx={{m:1, p:2}} variant="contained" color="success">Add</Button> 
          </FormGroup>
          <List>
            {status && status.map((status:any) => (
                <ListItem>
                <ListItemText>{status.title}</ListItemText>
                <UpdateStatusModal statusId={status.id}/>
                </ListItem>
            ))}
          </List>
          <Button variant="contained" color="error" onClick={handleOpen}>Close</Button>
        </Box>
      </Modal>  
    </div>
        );
}
