import {useState} from 'react';
import { useDrag } from 'react-dnd';
import { DragSource } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, TextField} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MyModal from '../components/MyModal';

const useStyles = makeStyles((theme) => ({
    isDragged: props => {
        return {
            cursor: 'pointer',
            fontWeight: 'bold',
            opacity: props.isDragging ? 0 : 1,
        }
    },
    button: {
        height: '100%'
    },
}));


export default function CardTest(props) {
    const [open, setOpen] = useState(false);

    const [description, setDescription] = useState(props.item.description)
    // { extraProps } from monitor
    const [{ isDragging }, drag] = useDrag({
        item:{
            type: ITEM_TYPES.CARD,
            item: {...props.item, description},
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
                <Grid container spacing={1} direction={"column"} justify={"center"} alignItems={"center"}>
                    <Grid item>
                        <h2>Title: {props.item.title}</h2>
                    </Grid>
                    <Grid item>
                        <TextField onChange={(e) => setDescription(e.target.value)} value={description}></TextField>
                    </Grid>
                    <Grid item>
                        <Button 
                            onClick={() => setOpen(false)} 
                            fullWidth 
                            color="primary" 
                            variant="contained">Save
                        </Button>
                    </Grid>
                </Grid>
            </MyModal>
        </Grid>
    )
}