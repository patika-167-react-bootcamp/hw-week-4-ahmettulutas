import React, {useState} from 'react';
import { Modal, Box } from '@mui/material';
import { FormGroup, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display:'flex',
    flexDirection:'column',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3, 
  };
  
const  UpdateStatusModal = ({statusId}:any) => {
  const [open, setOpen] = React.useState(false);
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
        <Box sx={{ ...style, width:"60%",border:"2px solid blue"}}>
          <h2>Edit Category</h2>
          <FormGroup style={{ width:"100%"}}>
          <TextField sx={{m:0.2}} label="name" variant="outlined" />
          <Button type="submit" sx={{m:0.2, p:1}} variant="contained" color="success">Add</Button> 
          <Button sx={{m:0.2, p:1}} variant="contained" color="error" onClick={handleOpen}>Close</Button>
          </FormGroup>
        </Box>
      </Modal>  
    </div>
        );
}
export default UpdateStatusModal;