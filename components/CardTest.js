import { useDrag } from 'react-dnd';
import { DragSource } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
    }
}));


export default function CardTest(props) {
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
            <Paper>
                <Grid container>
                    <Grid item xs={8}>
                        <p>{props.item.description}</p>
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
        </Grid>
    )
}