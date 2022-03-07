const removeDuplicates = arr => arr.filter((v, i, a) => a.findIndex(t => t.ID === v.ID) === i);
export default removeDuplicates;
