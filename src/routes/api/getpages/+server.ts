import axios from 'axios';
import type { RequestHandler } from './$types';

const options = {
	method: 'POST',
	url: 'https://api.notion.com/v1/search',
	headers: {
		cookie:
			'__cf_bm=FYxsesQUGd_Wg_EUPHNyj0UPnqDcevDchqIN6zmMEcU-1711213017-1.0.1.1-6Ap1ohJMQsZc1_AvaZOzZIbMC9BJBxvGlxcwD4pIA2RU7mVPztRz20UTNR7sNArfzLZ9dh_Vc9YZSHQq6ium8w',
		'Content-Type': 'application/json',
		'Notion-Version': '2022-06-28',
		Authorization: 'Bearer secret_f3LCZHyG1SM8mzLbklM9BYfPzpxnVkaeQ9ha9NuHci8'
	}
};

export const GET: RequestHandler = async () => {
	const response = await axios.request(options);
	return new Response(JSON.stringify(response.data));
};
