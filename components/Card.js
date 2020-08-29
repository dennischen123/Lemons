import { useDrag } from 'react-dnd';
import { DragSource } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    isDragged: props => {
        return {
            fontSize: 50,
            cursor: 'pointer',
            fontWeight: 'bold',
            opacity: props.isDragging ? 0 : 1,
        }
    }
}));


export default function Card(props) {
    // { extraProps } from monitor
    const [{ isDragging }, drag] = useDrag({
        item:{
            type: ITEM_TYPES.CARD
            //and any other data you want to pass ex:id of card
        },
        collect: monitor => ({
            // data that you want to pass as props to react from monitor collection functions
            isDragging: !!monitor.isDragging(),
        })
    })
    const classes = useStyles({isDragging});
    return (
        <div
            className={classes.isDragged}
            ref={drag}
        >
            ♘
        </div>
    )
}