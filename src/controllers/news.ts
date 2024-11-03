import asyncWrapper from "../middleware/asyncWrapper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllNews = asyncWrapper(async (req, res) => {
    const news = await prisma.news.findMany();
    res.status(200).json({ data: news, message: 'success' });
});

const postNews = asyncWrapper(async (req, res) => {
    const { name, description, categoryId } = req.body; // Destructure categoryId from request body
    const news = await prisma.news.create({
        data: {
            name,
            description,
            category: {
                connect: {
                    id: categoryId // Use categoryId from request
                }
            }
        }
    });
    res.status(200).json({ data: news, message: 'success' });
});


export { getAllNews, postNews };