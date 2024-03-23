import OpenAI from 'openai';
import { API_KEY } from '$lib/api_key';
import { setDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '$lib/firebase';

export async function sendToChatGPT(data: string) {
	try {
		const inputString =
			'I have these lecture notes: ' +
			data +
			". Ignore any nonsensical text or unclear text. Please give me a json of 10 questions regarding the material and subject matter that would help students learn. Order the questions in order of difficulty with the first being extremely easy and the last being challenging. There should also be corresponding lists of 4 answers of which only one is correct for each question. The correct answer should the first answer in each answers list. The format of the json is: {question1:'this is question 1?', answer1: ['this is answer choice 1 for question 1 (correct)', 'this is answer choice 2 for question 1', 'this is answer choice 3 for question 1', 'this is answer choice 4 for question 1'], question2:'this is question2', answer2 : ['this is answer choice 1 for question 2 (correct)', 'this is answer choice 2 for question 2', 'this is answer choice 3 for question 2', 'this is answer choice 4 for question 2']...}. Only return the json and nothing else";
		const openai = new OpenAI({
			apiKey: API_KEY,
			dangerouslyAllowBrowser: true
		});

		const completion = await openai.chat.completions.create({
			messages: [{ role: 'system', content: inputString }],
			model: 'gpt-4-1106-preview'
		});
		var ret_str = '';
		if (completion.choices[0].message.content != null) {
			ret_str = completion.choices[0].message.content;
		}
		const jsonString = JSON.stringify({ answer: `${JSON.stringify(ret_str, null, 2)}` }, null, 2);
		console.log('Sending to Firebase :).' + ret_str);
		sendToFirebase(ret_str);
	} catch (error: any) {
		console.error('Error:', error.message);
	}
}
async function sendToFirebase(str: String) {
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	const formattedStr = (str as string).substring(8, (str as string).length - 3);
	// console.log(formattedStr)
	const tenQuestions = JSON.parse(formattedStr);
	for (var i = 1; i <= 10; i++) {
		const difficulty = 0.1 * i;
		const question = tenQuestions['question' + i];
		const answer = tenQuestions['answer' + i];
		const docRef = await setDoc(doc(db, 'questions', i.toString()), {
			question: question,
			answer1: answer[0],
			answer2: answer[1],
			answer3: answer[2],
			answer4: answer[3],
			correct: 1,
			difficulty: difficulty
		});
	}
}
