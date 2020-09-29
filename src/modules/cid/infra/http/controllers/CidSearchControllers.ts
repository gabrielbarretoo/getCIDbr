import { Request, Response } from 'express';
import FindCIDService from '../../../services/FindCIDService';

export default module.exports = {
  async getByCode(req: Request, res: Response) {
    const { code } = req.params;

    const cid = await FindCIDService.getByCodeCID(code);

    return res.json(cid);
  },
  async getByDescription(req: Request, res: Response) {
    const { description } = req.query;

    const cid = await FindCIDService.getByDescriptionCID(description);
    return res.json(cid);
  },
};
