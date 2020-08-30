import { useDrop } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import useAddRemoveItem from '../hooks/useAddRemoveItem';
import CardTest from '../components/CardTest';
import { TextField, Button } from '@material-ui/core';
import {useState, useEffect} from 'react';

const useStyles = makeStyles((theme) => ({
    isDropped: props => {
        return {
            backgroundColor: props.isOver ? 'green' : 'white',
            height: '100%',
        }
    },
    column: {
        height: '100%',
    }
}));
export default function ColumnTest(props) {
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [itemList, handleAddItem, handleRemoveItem] = useAddRemoveItem();


    const [{isOver, dropResult}, drop] = useDrop({
        accept: ITEM_TYPES.CARD,
        drop: (item, monitor) => {
            // const didDrop = monitor.didDrop();
            // if(didDrop) {
                console.log(item)
                handleAddItem(item)
            // }
            // console.log(`I'm dropped in the drop zone${item.id}`)
        },
        collect: monitor => ({
            // data that you want to pass as props to react from monitor collection functions
            isOver: !!monitor.isOver(),
            dropResult: monitor.getDropResult(),
        })
    },[itemList])
    const handleClick = () => {
        handleAddItem({id,title,description})
    }
    // const handleDelete = () => {
    //     handleRemoveItem(item.List)
    // }
    const classes = useStyles({isOver, dropResult})

    return (
        <Grid item container column spacing={2} xs={4} ref={drop} className={classes.isDropped}>
            {itemList && itemList.map(item => <CardTest key={item.id} item={item} handleRemove={handleRemoveItem}></CardTest>)}
            <Grid item>
                <form>
                    <TextField id="standard-basic" label="ID" onChange={(e) => setId(e.target.value)} value={id}></TextField>
                    <TextField id="standard-basic" label="Title"  onChange={(e) => setTitle(e.target.value)} value={title}></TextField>
                    <TextField id="standard-basic" label="Description"  onChange={(e) => setDescription(e.target.value)} value={description}></TextField>
                </form>
            </Grid>
            <Grid item>
                <Button onClick={handleClick}>
                    Add
                </Button>
                {/* <Button onClick={handleDelete}></Button> */}
            </Grid>
        </Grid>
    )
}