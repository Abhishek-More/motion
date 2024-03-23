import { error } from '@sveltejs/kit';
import axios from 'axios';

/** @type {import('./$types').RequestHandler} */
const key = NOTION_KEY;
const id = NOTION_PAGE_ID;
const api_url = 'https://api.notion.com/v1'
const dbend = api_url + '/databases/' + id
const pageend = api_url + '/pages/' + id

const headers = {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
};

async function get_categories() {
    try {
        const response = await axios.get(pageend, { headers });
        const { properties } = response.data;
        return properties.categories.multi_select;
    }
    catch(error) {
        console.error('Error fetching page categories:', error);
        throw error;
    }
}

async function get_pages(categoryId) {
    try {
        res = []
        const response = await axios.post(`${dbend}/query`, null, { headers });
        const { results } = response.data;
        let res = results.filter(x => x.properties.category_id === categoryId);
        return res.filter(doc => ({
            title: doc.properties.title.title;
        }))
    }
    catch(error) {
        console.error('Error fetching documents in category:', error);
        throw error;
    }
}

export async function get() {
    try {
        const categories = await get_categories();
        let data = []
        for (let i = 0; i<categories.length;i++){
            let docs = await get_pages(categories[i]);
            data.push({category: category.name, docs})
        }
        return {
            status: 200,
            body: data
        };
    }
    catch(error) {
        console.error('Error fetching categories or fetching documents in categories', error);
        return {
            status: 500,
            body: { error: 'Internal Server Error' }
        };
    }
}