const getFinalMessageForUser = arr => {
  return arr.reduce((acc, { name, timings }) => {
    return acc.concat(`\n${name}\n${timings}
    `);
  }, '');
};

export default getFinalMessageForUser;
