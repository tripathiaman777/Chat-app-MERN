import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import {io, getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    console.log(message, receiverId, senderId);
    
    // Find a conversation with both participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    // console.log(conversation);
    

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    // console.log(newMessage);
    conversation.messages.push(newMessage._id);
    console.log(conversation);
    await conversation.save()
    await newMessage.save()
    // await Promise.all(conversation.save(), newMessage.save());
    
    // socket.io functionality will go here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages");
        if(!conversation) return res.status(200).json([]);
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log('Error while getting message ',error);
        res.status(500).json({error: 'Internal Server Error'});        
    }
};
