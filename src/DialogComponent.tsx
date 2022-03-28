import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogComponent({handleUpdate, name, title, handleChange, open, handleOpen}:any) {
  
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Edit Text
      </Button>
      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            name={name}
            value={title}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleUpdate}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
