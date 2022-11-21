export const APIRoutePath = {
  post: {
    get: `/api/post/:id`,
    pageView: `/api/post/page-view`,
    version: {
      create: `/api/post/version/:post_id`,
      get: `/api/post/version/:post_id`,
    },
    comment: {
      create: `/api/post/comment`,
      getAll: `/api/post/comment/list/:post_id`,
      deactivate: `/api/post/comment/deactivate/:id`,
    },
    dashboard: `/api/dashboard/:user_id`,
    update: `/api/post/:id`,
    create: `/api/post`,
    getAll: `/api/post/by-user/:user_id`,
  },
  article: {
    get: `/api/article/:id`,
    getAll: `/api/article`,
  },
  user: {
    reaction: {
      create: `/api/user/reaction`,
      getByPost: `/api/user/reaction/:post_id/:user_id`,
    },
  },
}
