import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../pages/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [singleUser, setSingleUser] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [image, setImage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // get single user blog

  const singleUserBlog = async () => {
    const userId = localStorage.getItem("userId");
    const imageUrl = localStorage.getItem("imageUrl");
    setImage(imageUrl);

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
    try {
      const response = await axios.get(
        `https://final-hackthon-frontend.vercel.app/api/UserPost/singleBlog/${userId}`
      );
      setSingleUser(response.data.data);
      setLoadingBlogs(false);
    } catch (error) {
      console.log(error);
      setLoadingBlogs(false); // Stop loading if there's an error
    }
  };
  useEffect(() => {
    singleUserBlog();
  }, []);

  // user post blog
  const postBlog = async (data) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to post a blog.");
      return;
    }
    try {
      const response = await axios.post(
        "https://final-hackthon-frontend.vercel.app/api/blogs/createBlog",
        {
          title: data.title,
          description: data.description,
          userId: userId,
        }
      );

      console.log("Blog created successfully:", response.data);
      singleUserBlog();

      reset();
    } catch (error) {
      console.error(
        "Error creating blog:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  //user delete blog
  const deleteBlog = async (_id) => {
    console.log("blog ID", _id);

    const response = await axios.delete(
      `https://final-hackthon-frontend.vercel.app/api/blogs/deleteBlog/${_id}`
    );
    console.log(response);
    singleUserBlog();
  };

  //user update blog
  const editBlog = async (_id) => {
    console.log("blog ID", _id);
    const titleupdate = prompt("Update blog title");
    const descriptionupdate = prompt("Update blog description");

    if (
      titleupdate == null ||
      titleupdate.trim() === "" ||
      descriptionupdate == null ||
      descriptionupdate.trim() === ""
    ) {
      alert("Title and Description ar can't be empty");
      return;
    }

    const response = await axios.put(
      `https://final-hackthon-frontend.vercel.app/api/blogs/editBlog/${_id}`,
      {
        title: titleupdate,
        description: descriptionupdate,
      }
    );
    console.log(response);
    singleUserBlog();
  };

  return (
    <>
      {/* dashboard */}
      <h3 className="m-5 mx-10 text-4xl font-bold">DashBoard</h3>
      <div className="dashboard-main">
        <form onSubmit={handleSubmit(postBlog)} className="dashboard-form">
          <input
            {...register("title", {
              required: "This field is required",
            })}
            className="dashboard-input"
            type="text"
            placeholder="Enter Title.."
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}

          <br />
          <textarea
            {...register("description", {
              required: "This field is required",
            })}
            className="dashboard-textarea"
            placeholder="Enter Description.."
            rows="5"
            cols="180"
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description.message}</p>
          )}

          {loading ? (
            <button className="btn btn-info w-full text-lg text-white">
              <span className="loading loading-dots loading-lg text-center"></span>
            </button>
          ) : (
            <button className="btn btn-info w-full text-lg text-white">
              Publish
            </button>
          )}
        </form>
      </div>

      {/* my blogs section  */}
      <h3 className="m-5 mx-10 text-4xl font-bold">My Blogs</h3>
      <div className="my-blogs-render mb-4">
        {singleUser ? (
          singleUser.map((blog) => (
            <div key={blog._id} className="under-rendering ">
              <div className="flex justify-between flex-wrap h-auto">
                <div className="under-title flex">
                  {image && (
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      alt="User Avatar"
                      src={image}
                    />
                  )}
                  <h3 className="px-5">{blog.title}</h3>
                </div>
              </div>
              <div></div>
              <div className="under-p">
                <p className="under">{blog.description}</p>
              </div>
              <div className="flex gap-5 mt-5 flex-wrap">
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="btn hover:bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => editBlog(blog._id)}
                  className="btn hover:bg-emerald-500"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>No data found</h1>
        )}
      </div>
    </>
  );
};

export default Dashboard;
