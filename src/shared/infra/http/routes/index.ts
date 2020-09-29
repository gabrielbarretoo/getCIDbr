import { Router } from 'express';

import cidRouter from '../../../../modules/cid/infra/http/routes/cid.routes';

const routes = Router();

routes.use('/cid', cidRouter);

export default routes;
