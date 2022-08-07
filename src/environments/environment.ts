export const environment = {
  production: false
};
const baseUrl = "http://192.168.0.108:3001/api"
export const url = {
  user: {
    register: `${baseUrl}/register`,
    login: `${baseUrl}/login`,
    basic: `${baseUrl}/user/basic`,
    update: `${baseUrl}/user/profile/update`,
    profile: `${baseUrl}/user/profile`,
    followUnfollow: `${baseUrl}/user/followUnfollow`,
  },
  topic: {
    list: `${baseUrl}/topic/list`,
    avalable: `${baseUrl}/topic/avalable`,
  },
  blog: {
    add: `${baseUrl}/blog/add`,
    update: `${baseUrl}/blog/update`,
    list: `${baseUrl}/blog/list`,
    view: `${baseUrl}/blog/view`,
    history: `${baseUrl}/blog/readHistory`,
    bookmark: {
      add: `${baseUrl}/blog/addBookmark`,
      list: `${baseUrl}/blog/bookmarks`,
      remove: `${baseUrl}/blog/removeBookmark`,
    },
    myBlogs:`${baseUrl}/blog/myBlogs`,
    delete:`${baseUrl}/blog/delete`,
    my:`${baseUrl}/blog/my`,
  }
}
