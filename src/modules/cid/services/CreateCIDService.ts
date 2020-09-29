import AppError from '@shared/errors/AppError';
import { CreateQuery } from 'mongoose';
import CID, { ICID } from '../infra/mongoose/entities/CID';

async function CreateCID({
  code,
  description,
  subcategories,
}: CreateQuery<ICID>): Promise<ICID> {
  const cid = await CID.create({
    code,
    description,
    subcategories,
  });

  if (!cid) {
    throw new AppError('Error to create a new CID');
  }

  return cid;
}

export default {
  CreateCID,
};
