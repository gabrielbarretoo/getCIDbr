import { Router } from 'express';
import multer from 'multer';
import CidControllers from '../controllers/CidControllers';
import CidCSVControllers from '../controllers/CidCSVControllers';
import CidSearchControllers from '../controllers/CidSearchControllers';
import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig);
const cidRouter = Router();

cidRouter.post('/', ensureAuthenticated, CidControllers.create);
cidRouter.put('/', ensureAuthenticated, CidControllers.update);
cidRouter.delete('/', ensureAuthenticated, CidControllers.delete);
cidRouter.get('/', CidControllers.index);

cidRouter.post(
  '/import',
  ensureAuthenticated,
  upload.single('file'),
  CidCSVControllers.create,
);

cidRouter.get('/search/:code', CidSearchControllers.getByCode);
cidRouter.get('/description/', CidSearchControllers.getByDescription);

export default cidRouter;
