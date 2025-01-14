import { defineBackend } from '@aws-amplify/backend';
import { auth } from '@/modules/auth/resource';
import { todoData } from '@/modules/todos/resource';

export const backend = defineBackend({
	auth,
	todoData,
});
