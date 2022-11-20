const serverURL = 'http://localhost:3000'
export const APIRoutePath = {
  post: {
    get: `${serverURL}/api/post/:id`,
    version: {
      create: `${serverURL}/api/post/version/:post_id`,
      get: `${serverURL}/api/post/version/:post_id`,
    },
    comment: {
      create: `${serverURL}/api/post/comment`,
      getAll: `${serverURL}/api/post/comment/list/:post_id`,
    },
    update: `${serverURL}/api/post/:id`,
    create: `${serverURL}/api/post`,
    getAll: `${serverURL}/api/post/by-user/:user_id`,
  },
  article: {
    get: `${serverURL}/api/article/:id`,
    getAll: `${serverURL}/api/article`,
  },
  user: {
    reaction: {
      create: `${serverURL}/api/user/reaction`,
      getByPost: `${serverURL}/api/user/reaction/:post_id/:user_id`,
    },
  },
}
