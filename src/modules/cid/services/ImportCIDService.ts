/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-await-in-loop */
/* eslint-disable vars-on-top */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../config/upload';
import { ICID } from '../infra/mongoose/entities/CID';
import CreateCIDService from './CreateCIDService';

interface SubCategory {
  code: string;
  description: string;
}

interface ICid {
  code: string;
  description: string;
  subcategories: Array<SubCategory>;
}

async function ImportCID(csvFilename: string): Promise<ICID[]> {
  async function loadCSV(filePath: string): Promise<any[]> {
    const readCSVStream = fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
      delimiter: ';',
    });

    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: any[] | PromiseLike<any[]> = [];

    parseCSV.on('data', line => {
      lines.push(line);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    return lines;
  }

  const csvFilePath = path.resolve(uploadConfig.tmpFolder, csvFilename);

  const data = await loadCSV(csvFilePath);

  const cidFromCsv = [];

  for (var i = 0; i < data.length; i++) {
    const line = data[i];

    cidFromCsv.push({
      code: line[0].toString(),
      description: line[1].toString(),
    });
  }

  const allCID = [];
  const categories = [] as ICid[];

  // Create Category

  for (var i = 0; i < cidFromCsv.length; i++) {
    const parseCode = cidFromCsv[i].code;

    if (parseCode.length === 3) {
      const category: ICid = {
        code: cidFromCsv[i].code,
        description: cidFromCsv[i].description,
        subcategories: [],
      };
      categories.push(category);
    }
  }

  // Create Subcategory

  for (var i = 0; i < cidFromCsv.length; i++) {
    const parseCode = cidFromCsv[i].code;

    if (parseCode.length > 3) {
      const categoryIndex = categories.findIndex(
        category => category.code === parseCode.slice(0, 3),
      );
      if (categoryIndex >= 0) {
        const subcategories: SubCategory = {
          code: cidFromCsv[i].code.slice(4, 5),
          description: cidFromCsv[i].description,
        };
        categories[categoryIndex].subcategories.push(subcategories);
      }
    }
  }

  console.log(categories);

  for (var i = 0; i < categories.length; i++) {
    const transaction = await CreateCIDService.CreateCID({
      code: categories[i].code,
      description: categories[i].description,
      subcategories: categories[i].subcategories,
    });

    console.log({ progress: Math.ceil((i / categories.length) * 100) });

    allCID.push(transaction);
  }

  return allCID;
}

export default {
  ImportCID,
};
