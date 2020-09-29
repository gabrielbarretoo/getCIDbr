import AppError from '@shared/errors/AppError';
import { CreateQuery } from 'mongoose';
import CID, { ICID } from '../infra/mongoose/entities/CID';

interface ICIDresponse {
  code: string;
  description: string;
}

async function getByCodeCID(code: string): Promise<ICIDresponse[] | null> {
  const CIDs: ICIDresponse[] = await CID.find({
    code: { $regex: `.*${code}.*` },
  });

  if (!CIDs) {
    throw new AppError('CID not found!');
  }

  return CIDs;
}
async function getByDescriptionCID(
  description: any[] | any,
): Promise<ICIDresponse[] | null> {
  const CIDs: ICIDresponse[] = await CID.find({
    description: { $regex: `.*${description}.*`, $options: 'i' },
  });

  if (!CIDs) {
    throw new AppError('CID not found!');
  }

  return CIDs;
}

export default {
  getByCodeCID,
  getByDescriptionCID,
};
