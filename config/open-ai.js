import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: "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",
});

export default openai;