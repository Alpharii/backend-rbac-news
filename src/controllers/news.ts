import asyncWrapper from "../middleware/asyncWrapper";
import { prisma } from "../config/prisma";

const getAllNews = asyncWrapper(async (req, res) => {
    const news = await prisma.news.findMany({
        select: {
            id: true,
            name: true,
            categoryId: true
        }
    });
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

const editNews = asyncWrapper(async (req, res) => {
    const { name, description, categoryId } = req.body;
    const news = await prisma.news.update({
        where: {
            id: parseInt(req.params.id, 10) // Konversi id ke number
        },
        data: {
            name,
            description,
            category: {
                connect: {
                    id: categoryId
                }
            }
        }
    });
    res.status(200).json({ data: news, message: 'success' });
});

const searchNews = asyncWrapper(async (req, res) => {
    const query = req.query.query as string;

    // Cek jika query kosong atau tidak
    if (!query) {
        res.status(400).json({ error: 'Query parameter is required' });
    }

    const news = await prisma.news.findMany({
        where: { 
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } }
            ]
        }
    });

    res.status(200).json({ data: news, message: 'success' });
});

const getNewsDetail = asyncWrapper(async (req, res) => {
    const news = await prisma.news.findUnique({
        where: { id: parseInt(req.params.id, 10) }
    });
    if (!news) res.status(404).json({ error: 'News not found' });
    res.status(200).json({ data: news, message: 'success' });
});

export { getAllNews, postNews, editNews, getNewsDetail, searchNews };
