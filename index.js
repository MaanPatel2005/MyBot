import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.green("Welcome to the Chatbot Program!"));
    console.log(colors.bold.green("You can start chatting with the bot."));

    const chatHistory = []; // Store the conversation history

    while (true) {
        const userInput = readlineSync.question(colors.yellow("You: "));

        try {
            // Constucting messages by iterating over the history of the conversation
            const messages = chatHistory.map(([role, content]) => ({ role, content }));

            // Adding in the latest user input
            messages.push({ role: 'user', content: userInput });

            // Call the API with user input
            const completion = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                store: true,
                messages: messages,
            });

            // Get completion text/content
            const completionText = completion.choices[0].message.content;

            if (userInput.toLowerCase() === "exit") {
                console.log(colors.green("Bot: ") + completionText);
                return;
            }

            console.log(colors.green("Bot: ") + completionText);

            // Update history with user input and chatbot response
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } catch (error) {
            console.error(colors.red(error));
        }
    }
}

main();