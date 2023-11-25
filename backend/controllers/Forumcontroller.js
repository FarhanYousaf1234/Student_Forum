const Forums=require('../models/forums');
//get all forums
const getForums = async (req, res) => {
  try {
    const forums = await Forums.find({}).sort({ createdAt: -1 });
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching forums.' });
  }
}
//create a new forum
const createForums=async(req,res)=>{
    const {title, description, tags} = req.body
  // add to the database
  try {
    const Forum = await Forums.create({ title, description, tags })
    res.status(200).json(Forum)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
//add comments
const Comment=async(req,res)=>{
    const { forumId } = req.params
  const {  content } = req.body
  // add to the database
  try {
    const forum = await Forums.findById(forumId)
    forum.comments.push({  content })
    await forum.save()
    res.status(200).json(forum)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
module.exports={createForums,getForums,Comment};