import { useDrop } from 'react-dnd';
import ITEM_TYPES from '../data/types';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import useAddRemoveItem from '../hooks/useAddRemoveItem';
import CardTest from '../components/CardTest';
import { TextField, Button } from '@material-ui/core';
import {useState, useEffect} from 'react';
import AddIcon from '@material-ui/icons/Add';
import MyModal from '../components/MyModal';

const useStyles = makeStyles((theme) => ({
    isDropped: props => {
        return {
            backgroundColor: props.isOver ? 'green' : 'white',
            height: '100%',
        }
    },
    containerStyle: {
        border: '2p'

    },
    column: {
        height: '100%',
    }
}));
export default function ColumnTest(props) {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [itemList, handleAddItem, handleRemoveItem] = useAddRemoveItem();
    const [open, setOpen] = useState(false);


    const [{isOver, dropResult}, drop] = useDrop({
        accept: ITEM_TYPES.CARD,
        drop: (item, monitor) => {
            // const didDrop = monitor.didDrop();
            // if(didDrop) {
                handleAddItem(item.item)

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
        const id = Math.random().toString(16).substr(2,16);
        handleAddItem({id,title,description})
    }
    // const handleDelete = () => {
    //     handleRemoveItem(item.List)
    // }
    const classes = useStyles({isOver, dropResult})

    return (
        <Grid item container direction={"column"} spacing={2} xs={4} ref={drop} className={classes.isDropped}>
            <Grid item container direction={"row"} spacing={1}>
                {itemList && itemList.map(item => <CardTest key={item.id} description={description} setDescription={setDescription} item={item} handleRemove={handleRemoveItem}></CardTest>)}
            </Grid>
            <Grid item>
                    <Button
                        fullWidth
                        onClick={() => setOpen(true)}
                        startIcon={<AddIcon></AddIcon>}
                        >
                    </Button>
            </Grid>
            <MyModal open={open} setOpen={setOpen}>
                <>
                    <TextField id="standard-basic" label="Title"  onChange={(e) => setTitle(e.target.value)} value={title}></TextField>
                    <TextField id="standard-basic" label="Description"  onChange={(e) => setDescription(e.target.value)} value={description}></TextField>
                    <Button
                        fullWidth
                        onClick={() => {
                            handleClick();
                            setTitle();
                            setDescription();
                            setOpen(false);
                        }}
                        startIcon={<AddIcon></AddIcon>}
                        >
                        Add
                    </Button>
                </>
            </MyModal>
        </Grid>
    )
}