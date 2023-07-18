const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const getInitialData = async (file) => {
  const pathFile = path.join(__dirname, file);
  const data = new Array();
  const headers = [
    'matricula',
    'status',
    'nome',
    'email',
    'email_gestor',
    'data_de_admissao',
    'data_de_rescisao',
    'cargo',
  ];
  const parser = fs.createReadStream(pathFile).pipe(parse({ delimiter: ',', columns: headers, from_line: 2 }));

  for await (const record of parser) {
    data.push(record);
  }
  return data;
};

module.exports = getInitialData;