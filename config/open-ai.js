import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: "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",
});

export default openai;