import {useState, useEffect } from 'react';

export default function useAddRemoveItem(initialList = []) {
    const [itemList, setItemList] = useState(initialList);
    const handleAddItem = (item) => {
        setItemList([...itemList, item]);
    }

    const handleRemoveItem = (item) => {
        setItemList(itemList.filter(e => e.id !== item.id))
    }

    return [itemList, handleAddItem, handleRemoveItem];
}