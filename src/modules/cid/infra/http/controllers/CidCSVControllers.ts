import { Request, Response } from 'express';
import ImportCIDService from '../../../services/ImportCIDService';

export default module.exports = {
  async create(req: Request, res: Response) {
    const allCID = await ImportCIDService.ImportCID(req.file.filename);

    return res.json(allCID);
  },
};
