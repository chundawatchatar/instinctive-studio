import { Router } from 'express';
import { get } from '../controllers/search.controller';

const router: Router = Router();

router.get('/', get);

export default router