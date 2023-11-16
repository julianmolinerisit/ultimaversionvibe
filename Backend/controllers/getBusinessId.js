import dbConnect from "../util/mongo.js";
import Business from "../models/Business.js";

const getBusinessById = async (req, res) => {
  const { id } = req.params;

  await dbConnect();

  try {
    const business = await Business.findById(id).populate('news products');

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(business);
  } catch (err) {
    res.status(500).json({ error: "Error fetching business" });
  }
};

export default getBusinessById;
