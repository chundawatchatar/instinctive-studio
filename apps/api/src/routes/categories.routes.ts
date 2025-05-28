import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router: Router = Router();

router.get('/', CategoryController.getAll);

export default router