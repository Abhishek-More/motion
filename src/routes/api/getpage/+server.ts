import axios from 'axios';
import type { RequestHandler } from './$types';

// Define the function to fetch page content
async function getPageContent(pageId) {
	const url = `https://api.notion.com/v1/blocks/${pageId}/children`;

	const options = {
		method: 'GET',
		url: url,
		headers: {
			cookie:
				'__cf_bm=FYxsesQUGd_Wg_EUPHNyj0UPnqDcevDchqIN6zmMEcU-1711213017-1.0.1.1-6Ap1ohJMQsZc1_AvaZOzZIbMC9BJBxvGlxcwD4pIA2RU7mVPztRz20UTNR7sNArfzLZ9dh_Vc9YZSHQq6ium8w',
			'Content-Type': 'application/json',
			'Notion-Version': '2022-06-28',
			Authorization: 'Bearer secret_f3LCZHyG1SM8mzLbklM9BYfPzpxnVkaeQ9ha9NuHci8'
		}
	};

	try {
		const response = await axios.request(options);
		const blocks = response.data.results;
		let textContent = '';

		// Iterate through blocks to extract text content
		blocks.forEach((block) => {
			if (block.type === 'paragraph') {
				block.paragraph.rich_text.forEach((text) => {
					textContent += text.plain_text;
				});
				textContent += '\n';
			} else if (
				block.type === 'heading_1' ||
				block.type === 'heading_2' ||
				block.type === 'heading_3'
			) {
				textContent += block[block.type].text[0].plain_text + '\n';
			}
			// Add other block types as needed
		});

		return textContent;
	} catch (error) {
		console.error('Error fetching page content:', error);
		return null;
	}
}

export const GET: RequestHandler = async ({ url }) => {
	const id = Number(url.searchParams.get('id') ?? '0');
	const pageId = 'ebd4c32c-9f40-4a68-b846-95bf3d777cab';
	const res = await getPageContent(pageId);

	const returnObject = {
		body: res
	};
	return new Response(JSON.stringify(returnObject));
};
