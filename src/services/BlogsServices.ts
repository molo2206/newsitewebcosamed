import requests from './Instance';

const BlogServices = {

  getBlog: async () => {
    const currentYear = new Date().getFullYear();
    return requests.get(`/public/blogs-year?year=${currentYear}`);
  },

  getBlogsByYear: async (params: { year?: number | string; category?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return requests.get(`/public/blogs-year?${query}`);
  },

  oneBlog: async (id: any) => {
    return requests.get(`/public/blogs/detail/${id}`);
  },

  getBlogHome: async () => {
    return requests.get('/public/bloghome');
  },

  oneBlogs: async (slug: any) => {
    return requests.get(`/public/blogs/details/${slug}`);
  },

  lastBlog: async () => {
    return requests.get(`/public/lastblog`);
  },
};

export default BlogServices;
