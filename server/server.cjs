const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data File Path
const DATA_FILE = path.join(__dirname, 'data', 'db.json');

// Ensure data directory and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(DATA_FILE)) {
  const initialData = {
    products: [
      {
        id: 1,
        title: "Truffle Cake Half Kg",
        price: 549,
        originalPrice: 649,
        rating: 4.8,
        reviews: 120,
        image: "https://cdn.igp.com/f_auto,q_auto,t_pnopt/products/p-truffle-cake-half-kg-13460-m.jpg",
        weight: "0.5 kg",
        flavor: "Chocolate",
        type: "Cream",
        deliveryTime: "Today"
      },
      {
        id: 2,
        title: "Red Velvet Cake",
        price: 749,
        originalPrice: 899,
        rating: 4.7,
        reviews: 85,
        image: "https://www.fnp.com/images/pr/l/v20221205202157/red-velvet-fresh-cream-cake-half-kg_1.jpg",
        weight: "0.5 kg",
        flavor: "Red Velvet",
        type: "Cream",
        deliveryTime: "Today"
      },
      {
        id: 3,
        title: "Black Forest Delight",
        price: 599,
        originalPrice: 699,
        rating: 4.6,
        reviews: 210,
        image: "https://www.fnp.com/images/pr/l/v20221205202410/black-forest-cake-half-kg_1.jpg",
        weight: "0.5 kg",
        flavor: "Black Forest",
        type: "Cream",
        deliveryTime: "2 hours"
      },
      {
        id: 4,
        title: "Butterscotch Crunch",
        price: 649,
        originalPrice: 749,
        rating: 4.9,
        reviews: 50,
        image: "https://www.fnp.com/images/pr/l/v20221205202656/butterscotch-cake-half-kg_1.jpg",
        weight: "0.5 kg",
        flavor: "Butterscotch",
        type: "Cream",
        deliveryTime: "Tomorrow"
      },
      {
        id: 5,
        title: "Pineapple Bliss",
        price: 499,
        originalPrice: 599,
        rating: 4.5,
        reviews: 180,
        image: "https://www.fnp.com/images/pr/l/v20221205202839/pineapple-cake-half-kg_1.jpg",
        weight: "0.5 kg",
        flavor: "Pineapple",
        type: "Cream",
        deliveryTime: "Today"
      },
      {
        id: 6,
        title: "Chocolate Truffle Photo Cake",
        price: 999,
        originalPrice: 1199,
        rating: 4.8,
        reviews: 45,
        image: "https://www.fnp.com/images/pr/l/v20221205203302/chocolate-truffle-photo-cake-half-kg_1.jpg",
        weight: "1 kg",
        flavor: "Chocolate",
        type: "Photo",
        deliveryTime: "24 hours"
      },
      {
        id: 7,
        title: "Blueberry Glaze Cake",
        price: 849,
        originalPrice: 999,
        rating: 4.7,
        reviews: 30,
        image: "https://www.fnp.com/images/pr/l/v20221205203445/blueberry-glaze-cake-half-kg_1.jpg",
        weight: "0.5 kg",
        flavor: "Blueberry",
        type: "Gel",
        deliveryTime: "Today"
      },
      {
        id: 8,
        title: "Kitkat Cake",
        price: 1199,
        originalPrice: 1399,
        rating: 4.9,
        reviews: 200,
        image: "https://www.fnp.com/images/pr/l/v20221205203628/kitkat-cake-half-kg_1.jpg",
        weight: "1 kg",
        flavor: "Chocolate",
        type: "Fondant",
        deliveryTime: "Today"
      }
    ],
    sales: [
      { month: 'Jan', revenue: 4000 },
      { month: 'Feb', revenue: 3000 },
      { month: 'Mar', revenue: 5000 },
      { month: 'Apr', revenue: 4500 },
      { month: 'May', revenue: 6000 },
      { month: 'Jun', revenue: 7000 },
    ]
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// Multer Setup for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes

// 1. Get All Products
app.get('/api/products', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data.products);
});

// 2. Add New Product
app.post('/api/products', upload.array('images', 5), (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const { title, description, price, category, weight, flavor, type } = req.body;
  
  const newProduct = {
    id: Date.now(),
    title,
    description,
    price: parseFloat(price),
    category,
    weight,
    flavor,
    type,
    rating: 0,
    reviews: 0,
    images: req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`),
    image: req.files.length > 0 ? `http://localhost:${PORT}/uploads/${req.files[0].filename}` : '', // Main image for grid
    createdAt: new Date()
  };

  data.products.push(newProduct);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  
  res.status(201).json(newProduct);
});

// 3. Get Dashboard Stats
app.get('/api/stats', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  const totalProducts = data.products.length;
  // Mock calculations based on sales data
  const totalRevenue = data.sales.reduce((acc, curr) => acc + curr.revenue, 0);
  
  res.json({
    totalProducts,
    totalRevenue,
    salesData: data.sales
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
