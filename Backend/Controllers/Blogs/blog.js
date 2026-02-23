
const blogs = require('../../Model/blogs.js')

const allblogs = async (req,res) =>{

    try {
        const Bloges = await blogs.find().limit(10);
        return res.status(200).json({message:"Sucess",bloges:Bloges})
    }
    catch (error){
        console.log("Eroor in database usage ",error);
        return res.status(500).json({message : "Error in DB Usage"});
    }
}

const createblog = async (req,res) => {
    try {
        const blogData = req.body;
        const blog = await blogs.create(blogData);
        return res.status(201).json({
            message: "Blog created successfully",
            blog: blog
        });
    }
    catch(error){
        return res.status(500).json({message : "Unable to add the Blog"})
    }
}
const editblog = async (req,res) => {
    try {
        const {blogID,content} =  req.body;
        if(!blogID || !content){
            return res.status(400).json({message : "Not Enofe Information"})
        }

        const updatedBlog = await blogs.findByIdAndUpdate(
            blogID,
            {content},
            {new: true}
        );

        if (!updatedBlog) {
            return res.status(404).json({message: "Blog not found"});
        }

        return res.status(200).json({
        message: "Blog updated successfully",
        blog: updatedBlog
        });


    }
    catch(error){
        return res.status(500).json({message: "Unable to update blog"});
    }

} 

const deleteblog = async (req,res) => {
    try {
        const { blogID } = req.body;
        if (!blogID) {
        return res.status(400).json({
            message: "blogID is required"
        });
        }

        const deletedBlog = await blogs.findByIdAndDelete(blogID);

        if (!deletedBlog) {
        return res.status(404).json({
            message: "Blog not found"
        });
        }

        return res.status(200).json({
        message: "Blog deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
        message: "Unable to delete blog"
        });
  }
}

module.exports = {allblogs,createblog,editblog,deleteblog};