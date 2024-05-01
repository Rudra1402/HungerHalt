const mongoose = require('mongoose');
const Post = require('../models/post');
const Partner = require('../models/partner');
const Notification = require('../models/notification');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate({
                path: 'partnerId',
                model: 'Partner',
                select: '_id userId',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: 'name'
                }
            })
            .sort({ createdAt: -1 });
        return res.status(200).json({ message: 'Posts data', posts });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.getPostsByPartner = async (req, res) => {
    const { partnerId } = req.params;
    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ error: "Partner not found!" })
        }

        const posts = await Post.find({ partnerId: partnerId })
            .populate({
                path: 'partnerId',
                model: 'Partner',
                select: '_id userId',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: 'name'
                }
            })
            .sort({ createdAt: -1 });
        return res.status(200).json({ message: 'Posts data by partner', posts });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.createPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const { partnerId } = req.params;
    try {
        const partner = await Partner.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ error: "Partner not found!" })
        }

        const newPost = new Post({
            partnerId,
            title,
            description,
            image: imageUrl
        })

        const newNotification = new Notification({
            userId: partner?.userId,
            description: "added a new post!"
        })

        await newPost.save();
        await newNotification.save();
        return res.status(200).json({ message: "Post created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.updatePost = async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found!" })
        }

        const updatedPost = {
            title,
            description,
            image: imageUrl
        }
        await Post.updateOne(
            { _id: postId },
            { $set: updatedPost },
            { new: true }
        )
        return res.status(200).json({ message: "Post updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}

exports.deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found!" })
        }

        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
}