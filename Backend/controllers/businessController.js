import dbConnect from '../util/mongo.js';
import Business from '../models/Business.js';
import News from '../models/News.js';
import Product from '../models/Product.js';

// Obtener un negocio por su ID
export const getBusinessById = async (req, res) => {
  const { method, query: { id } } = req;
  console.log("Business ID:", id);
  console.log("Business ID from params:", req.params);

  await dbConnect();

  if (method === "GET") {
    try {
      const business = await Business.findById(id).populate('news products');
      if (!business) {
        return res.status(404).json({ error: "Business not found" });
      }

      console.log("Business found:", business);
      res.status(200).json(business);
    } catch (err) {
      res.status(500).json({ error: "Error fetching business" });
      console.error("Error fetching business:", err);
    }
  } else if (method === "PUT") {
    try {
      const updatedBusiness = await Business.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedBusiness);
    } catch (err) {
      res.status(500).json({ error: "Error updating business" });
    }
  } else if (method === "DELETE") {
    try {
      await Business.findByIdAndDelete(id);
      res.status(200).json("The business has been deleted!");
    } catch (err) {
      res.status(500).json({ error: "Error deleting business" });
    }
  }
};

// Obtener todos los negocios o crear uno nuevo
export const getAllBusinesses = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const businesses = await Business.find();
      res.status(200).json(businesses);
    } catch (err) {
      res.status(500).json({ error: "Error fetching businesses" });
    }
  } else if (method === "POST") {
    try {
      const business = await Business.create(req.body);

      // Asociar noticias al negocio
      const news1 = await News.create({ title: 'Noticia 1', imageUrl: 'url1', business: business._id });
      const news2 = await News.create({ title: 'Noticia 2', imageUrl: 'url2', business: business._id });

      business.news.push(news1._id, news2._id);
      await business.save();

      // Asociar productos al negocio
      const product1 = await Product.create({ title: 'Producto 1', desc: 'Descripción 1', img: 'url1', price: 10, prices: [10, 15, 20], extraOptions: [{ text: 'Extra 1', price: 5 }], business: business._id });
      const product2 = await Product.create({ title: 'Producto 2', desc: 'Descripción 2', img: 'url2', price: 20, prices: [20, 25, 30], extraOptions: [{ text: 'Extra 2', price: 10 }], business: business._id });

      business.products.push(product1._id, product2._id);
      await business.save();

      res.status(201).json(business);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating business' });
    }
  }
};

// Crear un nuevo negocio
export const createBusiness = async (req, res) => {
  const { title, desc, img, bannerImg, profileImg, price, prices, extraOptions } = req.body;

  await dbConnect();

  try {
    const business = await Business.create({
      title,
      desc,
      img,
      bannerImg,
      profileImg,
      price,
      prices,
      extraOptions,
    });

    // Asociar noticias al negocio
    const news1 = await News.create({ title: 'Noticia 1', imageUrl: 'url1', business: business._id });
    const news2 = await News.create({ title: 'Noticia 2', imageUrl: 'url2', business: business._id });

    business.news.push(news1._id, news2._id);
    await business.save();

    // Asociar productos al negocio
    const product1 = await Product.create({ title: 'Producto 1', desc: 'Descripción 1', img: 'url1', price: 10, prices: [10, 15, 20], extraOptions: [{ text: 'Extra 1', price: 5 }], business: business._id });
    const product2 = await Product.create({ title: 'Producto 2', desc: 'Descripción 2', img: 'url2', price: 20, prices: [20, 25, 30], extraOptions: [{ text: 'Extra 2', price: 10 }], business: business._id });

    business.products.push(product1._id, product2._id);
    await business.save();

    res.status(201).json(business);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating business' });
  }
};

// Actualizar un negocio por su ID
export const updateBusiness = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBusiness);
  } catch (err) {
    res.status(500).json({ error: 'Error updating business' });
  }
};

// Eliminar un negocio por su ID
export const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  try {
    await Business.findByIdAndDelete(id);
    res.status(200).json("The business has been deleted!");
  } catch (err) {
    res.status(500).json({ error: 'Error deleting business' });
  }
};
