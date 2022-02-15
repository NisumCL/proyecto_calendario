function dataToObject(data) {
  const dataFormated = data
    .split('\n')
    .splice(1)
    .map(row => {
      if (row === '') {
        throw new Error('Existe una fila sin información. Favor eliminarla del archivo.');
      }
      const workerData = row.split(',');
      const worker = {
        name: workerData[1].replace('"', '').trim(),
        lastname: workerData[0].replace('"', ''),
        email: workerData[2],
        birthday: workerData[3],
        company: workerData[4],
      };
      return worker;
    });
  return dataFormated;
}

function show(data) {
  data.forEach(person => {
    // eslint-disable-next-line no-console
    console.log(`${person.birthday} => ${person.name} ${person.lastname}`);
  });
}

module.exports = { dataToObject, show };
