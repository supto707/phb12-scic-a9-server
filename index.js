const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
let items = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "Experience high-fidelity sound with active noise cancellation and 40-hour battery life.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        category: "Electronics"
    },
    {
        id: "2",
        name: "Minimalist Leather Watch",
        description: "A timeless design featuring genuine Italian leather and scratch-resistant sapphire glass.",
        price: 150.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
        category: "Accessories"
    },
    {
        id: "3",
        name: "Ergonomic Office Chair",
        description: "Total lumbar support and breathable mesh for maximum comfort during long work hours.",
        price: 450.00,
        image: "https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?q=80&w=1000&auto=format&fit=crop",
        category: "Furniture"
    },
    {
        id: "4",
        name: "Mechanical Gaming Keyboard",
        description: "Tactile brown switches with customizable RGB lighting and programmable macros.",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop",
        category: "Electronics"
    }
];

// Routes
app.get('/api/items', (req, res) => {
    res.json(items);
});

app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
});

app.post('/api/items', (req, res) => {
    const { name, description, price, image, category } = req.body;

    // Basic validation
    if (!name || !price) {
        return res.status(400).json({ message: "Name and Price are required" });
    }

    const newItem = {
        id: (items.length + 1).toString(),
        name,
        description,
        price: parseFloat(price),
        image: image || "https://via.placeholder.com/300",
        category: category || "Uncategorized"
    };

    items.push(newItem);
    res.status(201).json(newItem);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
