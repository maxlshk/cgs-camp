import { Router } from 'express';
import { TodoController } from '../../controllers/todo.controller';
import { validateBody } from '../../middleware/validator.middleware';
import { isExist } from '../../middleware/isExist.middleware';
import { tryCatch } from '../../middleware/tryCatch.middleware';
import { todoSchema } from '../../types/todos.type';
import {
	authenticateJwt,
	authorizeUser,
} from '../../middleware/auth.middleware';

const todosRouter = Router();
const todoController = new TodoController();

// Apply authentication middleware to all routes
todosRouter.use(authenticateJwt);

// Get all todos for the authenticated user
todosRouter.get('/my', tryCatch(todoController.getMyTodos));

// Get all public todos
todosRouter.get('/public', tryCatch(todoController.getPublicTodos));

// Get a specific todo (only if it's public or belongs to the authenticated user)
todosRouter.get('/:id', isExist('todo'), tryCatch(todoController.getTodoById));

// Create a new todo for the authenticated user
todosRouter.post(
	'/',
	validateBody(todoSchema),
	tryCatch(todoController.createTodo),
);

// Update a todo (only if it belongs to the authenticated user)
todosRouter.put(
	'/:id',
	isExist('todo'),
	authorizeUser,
	validateBody(todoSchema),
	tryCatch(todoController.updateTodo),
);

// Delete a todo (only if it belongs to the authenticated user)
todosRouter.delete(
	'/:id',
	isExist('todo'),
	authorizeUser,
	tryCatch(todoController.deleteTodo),
);

export default todosRouter;
