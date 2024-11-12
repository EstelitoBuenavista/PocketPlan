const db = require("../models");
const User = db.user;

exports.getUser = async (req,res) => {
  const id = req.params.id

  try {
    const user = await User.findByPk(id, {
      include:{
        model: account,
      }
    })
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
}