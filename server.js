import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import 'dotenv/config';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.get('/api/assistant', async (req, res) => {
    try {
        const assistant = await openai.beta.assistants.retrieve("asst_Xr7WSp8Vcpp3XPwNBg45WN57");
        res.json(assistant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/api/send-message', async (req, res) => {
    const { userMessage, threadId } = req.body;
    console.log("request message:")
    console.log(userMessage)
    try {
        console.log(threadId)
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: userMessage
        });

        console.log("message created")

        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: "asst_Xr7WSp8Vcpp3XPwNBg45WN57",
            instructions: "Please address the user as Chief. If you cannot find the information, simply say I do not have access to the information. Additionally, do not give the number of sources, just the sentences."
        });

        console.log("run created")

        while ((await openai.beta.threads.runs.retrieve(threadId, run.id)).status !== "completed") {
            console.log((await openai.beta.threads.runs.retrieve(threadId, run.id)).status)
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        const latestMessageResponse = await openai.beta.threads.messages.list(threadId);
        const latestMessageContent = latestMessageResponse.data[0].content[0].text.value;

        res.json({ message: latestMessageContent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/thread', async (req, res) => {
    try {
        const thread = await openai.beta.threads.create();
        res.json({ id: thread.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/get-thread-messages', async (req, res) => {
    try {
        const threadId = req.body.threadId;
        const messagesResponse = await openai.beta.threads.messages.list(threadId);
        const processedMessages = messagesResponse.data
            .reverse()
            .map(message => message);
        console.log("These are the mesages")
        console.log(processedMessages)
        res.json({ messages: processedMessages });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




app.listen(3001, () => {
    console.log('Server running on port 3001');
});