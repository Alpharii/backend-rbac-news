import asyncWrapper from "../middleware/asyncWrapper";
import { prisma } from "../config/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';

const register = asyncWrapper(async (req, res) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });
      res.status(201).json(user);
    } catch (error: any) {
      console.error('Error during registration:', error);
      res.status(400).json({ error: error.message || 'User already exists' });
    }
  });

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.encode({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your_secret_key');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const logout = asyncWrapper(async (req, res) => {
    res.status(200).json({ message: 'success' });
});

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json({ data: users, message: 'success' });
})

export { register, login , logout, getAllUsers };
