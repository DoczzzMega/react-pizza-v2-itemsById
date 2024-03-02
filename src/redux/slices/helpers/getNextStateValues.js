function getNextStateValues(itemsById) {
    let totalPrice = 0;
    let totalCount = 0;
    let arrInArr = Object.values(itemsById);
    arrInArr.forEach(item => item.forEach(innerItem => {
        totalPrice += innerItem.price * innerItem.count;
        totalCount += innerItem.count;
    }));
    return [totalPrice, totalCount];
}

export default getNextStateValues;