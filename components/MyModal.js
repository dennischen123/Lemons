import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Modal} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'fixed',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '30%',
        left: '40%'
      },
}));

export default function MyModal(props) {
    const classes = useStyles();
    return(
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            >
                <div className={classes.paper}>
                    {/* {props.render()} */}
                    {props.children}
                </div>
        </Modal>
    )
}
