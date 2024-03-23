import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const key = NOTION_KEY
    print(key)

    res = {0}
	return new Response(res);
}