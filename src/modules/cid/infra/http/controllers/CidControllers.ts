import { Request, Response } from 'express';
import axios from 'axios';
import CreateCIDService from '../../../services/CreateCIDService';
import EditCIDService from '../../../services/EditCIDService';
import DeleteCIDService from '../../../services/DeleteCIDService';
import FindAllCIDService from '../../../services/FindAllCIDService';

export default module.exports = {
  async create(req: Request, res: Response) {
    const { code, description, subcategories } = req.body;

    const cid = await CreateCIDService.CreateCID({
      code,
      description,
      subcategories,
    });

    return res.json(cid);
  },
  async update(req: Request, res: Response) {
    const { code, description } = req.body;

    const cid = await EditCIDService.editCID({
      code,
      description,
    });

    return res.json(cid);
  },
  async delete(req: Request, res: Response) {
    const { code } = req.body;

    await DeleteCIDService.deleteCID({
      code,
    });

    return res.sendStatus(200);
  },
  async index(req: Request, res: Response) {
    const cid = await FindAllCIDService.getAllCID();

    return res.json(cid);
  },
};
