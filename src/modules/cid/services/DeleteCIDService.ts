import AppError from '@shared/errors/AppError';
/* eslint-disable no-underscore-dangle */
import { CreateQuery } from 'mongoose';
import CID, { ICID } from '../infra/mongoose/entities/CID';

interface ICIDProps {
  code: string;
}
interface ISubCIDProps {
  code: string;
  subCode: string;
}

async function deleteCID({ code }: CreateQuery<ICIDProps>): Promise<void> {
  await CID.findOneAndDelete({ code });
}
async function deleteSubCID({
  code,
  subCode,
}: CreateQuery<ISubCIDProps>): Promise<ICID | null> {
  const cid = await CID.findOne({ code });

  if (!cid) {
    throw new AppError('Cid not found');
  }

  const subCid = cid?.subcategories?.filter(
    subCategory => subCategory.code !== subCode,
  );

  const updateCid = await CID.findOneAndUpdate(
    { code },
    { $set: { subcategories: subCid } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }
      console.log(doc);
    },
  );

  return updateCid;
}

export default {
  deleteCID,
  deleteSubCID,
};
