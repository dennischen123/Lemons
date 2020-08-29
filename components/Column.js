import { useDrop } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    isDropped: props => {
        return {
            backgroundColor: props.isOver ? 'green' : 'blue',
            height: '100%',
        }
    },
    column: {
        height: '100%',
    }
}));
export default function Column(props) {
    // { extraProps } from monitor
    const [{isOver, dropResult}, drop] = useDrop({
        accept: ITEM_TYPES.CARD,
        collect: monitor => ({
            // data that you want to pass as props to react from monitor collection functions
            isOver: !!monitor.isOver(),
            dropResult: monitor.getDropResult(),
        })
    })
    const classes = useStyles({isOver, dropResult});
    // console.log(dropResult);
    return (
        <div
            className={classes.isDropped}
            ref={drop}
        >
            {props.children}
        </div>
    )
}