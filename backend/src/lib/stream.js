import { StreamChat } from 'stream-chat';
import "dotenv/config";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

if(!API_KEY || !API_SECRET){
    console.log("Stream API or secret is missing");
}

const streamClient = StreamChat.getInstance(API_KEY, API_SECRET);

export const upsertStreamUser = async (userData) => {
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (err) {
        console.log('Error upserting stream user: ', err);
    }
}

export const generateStreamToken = (userId) => {
    try {
        const userId = userId.toString();
        return streamClient.createToken(userId);

    } catch (error) {
        console.log(`Error generating stream token: ${error.message}`);
    }
};