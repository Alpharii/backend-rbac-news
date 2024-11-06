import asyncWrapper from "../middleware/asyncWrapper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategories = asyncWrapper(async (req, res) => {
    const news = await prisma.categories.findMany();
    res.status(200).json({ data: news, message: 'success' });
});

const postCategory = asyncWrapper(async (req, res) => {
    const { name } = req.body; // Destructure categoryId from request body
    const news = await prisma.categories.create({
        data: {
            name,
            }
    });
    res.status(200).json({ data: news, message: 'success' });
});

const editCategory = asyncWrapper(async (req, res) => {
    const { name, categoryId } = req.body; // Destructure categoryId from request body
    const news = await prisma.categories.update({
        where: {
            id: categoryId
        },
        data: {
            name
        }
    });
    res.status(200).json({ data: news, message: 'success' });
});


export { getAllCategories, postCategory, editCategory };