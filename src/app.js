import express from "express";
import { ProductManager } from "./ProductManager.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productService = new ProductManager("./src/products.json");

const initialProducts = [
    {
      id: 1,
      title: "Producto lacteo 1",
      description: "leche entera",
      price: 10.99,
      thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00528800/00528832.jpg?3.0.157a",
      code: "ABC123",
      stock: 5
    },
    {
      id: 2,
      title: "Producto lacteo 2",
      description: "leche descremada",
      price: 19.99,
      thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00484500/00484562.jpg?3.0.157a",
      code: "DEF456",
      stock: 10
    },
    {
        id: 3,
        title: "Producto lacteo 3",
        description: "leche larga vida entera",
        price: 19.99,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00528800/00528834.jpg?3.0.157a",
        code: "DEF453",
        stock: 10
      },
      {
        id: 4,
        title: "Producto lacteo 4",
        description: "leche larga vida descremada",
        price: 19.99,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00251800/00251876.jpg?3.0.157a",
        code: "DEF454",
        stock: 10
      },
      {
        id: 5,
        title: "Producto lacteo 5",
        description: "Queso PortSalud ",
        price: 899,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00012900/00012915.jpg?3.0.157a",
        code: "DEF455",
        stock: 10
      },
      {
        id: 6,
        title: "Productolacteo 6",
        description: "Queso cremoso",
        price: 799,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00013500/00013507.jpg?3.0.157a",
        code: "DEF451",
        stock: 10
      },
      {
        id: 7,
        title: "Producto lacteo 7",
        description: "Queso mozzarella",
        price: 19.99,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00227500/00227547.jpg?3.0.157a",
        code: "DEF457",
        stock: 10
      },
      {
        id: 8,
        title: "Producto lacteo 8",
        description: "Yogurt de frutilla",
        price: 545,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00532700/00532708.jpg?3.0.157a",
        code: "DEF458",
        stock: 10
      },
      {
        id: 9,
        title: "Producto lacteo 9",
        description: "Yogurt de Vainilla",
        price: 545,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00533300/00533326.jpg?3.0.157a",
        code: "DEF459",
        stock: 10
      },
      {
        id: 10,
        title: "Producto lacteo 10",
        description: "Yogurt de durazno",
        price: 545,
        thumbnail: "https://static.cotodigital3.com.ar/sitios/fotos/full/00532700/00532709.jpg?3.0.157a",
        code: "DEF450",
        stock: 10
      },
  ];

  // Agrego los productos iniciales a ProductManager
  initialProducts.forEach(product => {
    productService.addProduct(product);
  });

//levanto el servidor
app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));

// Esta prueba es para ver si funciona modificar producto
const productId = 1; 
const product = productService.getProductById(productId);

if (product) {
  product.price = 25; // modifico el precio del producto con id 1
  productService.updateProduct(productId, { price: product.price });
  console.log("Producto modificado con éxito. El producto actualizado es:", product);
} else {
  console.error("Error: producto no encontrado");
}

app.get("/products", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit); 
      const products = await productService.getProducts();  
      if (!isNaN(limit) && limit > 0) {
        const limitedProducts = products.slice(0, limit);
        res.send(limitedProducts);
      } else {
        res.send(products);
      }
    } catch (error) {
      res.send(error.message);
    }
  });

  app.get("/products/:pid", async (req, res) => {
    try {
      const productId = parseInt(req.params.pid); 
      const product = await productService.getProductById(productId);  
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ error: "Producto no encontrado" });
      }
    } catch (error) {
      res.send(error.message);
    }
  });

  app.post("/products", async (req, res) => {
    try {
      const newProduct = req.body;
      productService.addProduct(newProduct);
      res.send("Producto agregado con éxito.");
    } catch (error) {
      res.send(error.message);
    }
  });
  
  


