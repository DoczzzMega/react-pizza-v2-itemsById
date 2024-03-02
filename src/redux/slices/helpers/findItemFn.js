function findItemFn(payload, itemsById) {
    const id = payload.id;
    const findItem = itemsById[id].find((obj) => {
        return obj.id === payload.id && obj.type === payload.type && obj.size === payload.size;
    });
    return findItem;
}

export default findItemFn;