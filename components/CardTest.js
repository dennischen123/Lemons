import { useDrag } from 'react-dnd';
import { DragSource } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    isDragged: props => {
        return {
            // fontSize: 50,
            cursor: 'pointer',
            fontWeight: 'bold',
            opacity: props.isDragging ? 0 : 1,
        }
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
        <Grid item xs={12} ref={drag} className={classes.isDragged}>
            <Paper>
                <p>title:{props.item.title}</p>
                <p>description:{props.item.description}</p>
            </Paper>
        </Grid>
    )
}