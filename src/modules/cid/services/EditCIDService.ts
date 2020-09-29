import AppError from '@shared/errors/AppError';
import { CreateQuery } from 'mongoose';
import CID, { ICID } from '../infra/mongoose/entities/CID';

async function editCID({
  code,
  description,
}: CreateQuery<ICID>): Promise<ICID | null> {
  const cid = await CID.findOneAndUpdate(
    { code },
    { $set: { description } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }
      console.log(doc);
    },
  );

  if (!cid) {
    throw new AppError('Error to update a CID');
  }

  return cid;
}

export default {
  editCID,
};
