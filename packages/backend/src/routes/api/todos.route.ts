import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import { tryCatch } from '../../middleware/tryCatch.middleware';
import { isExist } from '@/middleware/isExist.middleware';
import { validate } from '@/middleware/validator.middleware';
import { todoSchema } from '@/validation/todo/todo.schema';
import { authenticateJwt } from '@/middleware/auth.middleware';

const todosRouter: Router = Router();

todosRouter.use(authenticateJwt);

todosRouter.get(
	'/all',
	tryCatch(todoController.getAllTodos.bind(todoController)),
);

todosRouter.get(
	'/:id',
	isExist('todo'),
	tryCatch(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/',
	validate(todoSchema, 'body'),
	tryCatch(todoController.createTodo.bind(todoController)),
);

todosRouter.put(
	'/:id',
	isExist('todo'),
	validate(todoSchema, 'body'),
	tryCatch(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	isExist('todo'),
	tryCatch(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
