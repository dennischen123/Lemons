import {useState} from 'react';
import { useDrag } from 'react-dnd';
import { DragSource } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Modal} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MyModal from '../components/MyModal';

const useStyles = makeStyles((theme) => ({
    isDragged: props => {
        return {
            // fontSize: 50,
            cursor: 'pointer',
            fontWeight: 'bold',
            // height: '10vh',
            opacity: props.isDragging ? 0 : 1,
        }
    },
    button: {
        height: '100%'
    },
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


export default function CardTest(props) {
    const [open, setOpen] = useState(false)
    // { extraProps } from monitor
    const [{ isDragging }, drag] = useDrag({
        item:{
            type: ITEM_TYPES.CARD,
            item: props.item,
            id: props.item.id,
            //and any other data you want to pass ex:id of card
        },
        //ran when drag event is finished.
        //Need to implement logic for if item is dropped onto the same column
        // Instead of removing it from the list, Grab coordinate and figure out index item is being dropped into
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(item && dropResult) {
                props.handleRemove(item)
            }
        },
        collect: monitor => ({
            // data that you want to pass as props to react from monitor collection functions
            isDragging: !!monitor.isDragging(),
        })
    })
    const classes = useStyles({isDragging});
    return (
        <Grid item xs={11} ref={drag} className={classes.isDragged}>
            <Paper onClick={() => setOpen(true)}>
                <Grid container>
                    <Grid item xs={8}>
                        <p>{props.item.title}</p>
                        {/* <p>{props.item.description}</p> */}
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            className={classes.button}
                            color="secondary"
                            startIcon={<DeleteIcon/>}
                            onClick={() => props.handleRemove(props.item)}
                        ></Button>
                    </Grid>
                </Grid>
            </Paper>
            <MyModal open={open} setOpen={setOpen}>
                <>
                    <h2>Title: {props.item.title}</h2>
                    <p>
                    Description: {props.item.description}
                    </p>
                </>
            </MyModal>
        </Grid>
    )
}