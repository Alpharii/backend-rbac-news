import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Endpoint registrasi
app.post('/register', async (req, res) => {
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

// Endpoint login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.encode({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your_secret_key');
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware untuk memeriksa peran pengguna
const requireRole = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET || 'your_secret_key');
      if (roles.includes(decoded.role)) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };
};

// Endpoint yang memerlukan peran ADMIN
app.get('/admin', requireRole(['ADMIN']), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
