import AppError from '@shared/errors/AppError';
import CID, { ICID } from '../infra/mongoose/entities/CID';

interface ICIDresponse {
  code: string;
  description: string;
}

async function getAllCID(): Promise<ICIDresponse[] | null> {
  const allCID = await CID.find();

  if (!allCID) {
    throw new AppError('CID not found!');
  }

  return allCID;
}

export default {
  getAllCID,
};
