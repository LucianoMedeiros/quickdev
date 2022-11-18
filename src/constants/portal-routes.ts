export const RoutePath = {
  auth: {
    forgot: '/auth/forgot',
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
  },
  user: {
    profile: '/profile',
    posts: '/posts',
    post: '/posts/:id',
    newPost: '/posts/new',
    comments: '/posts/:id/comments',
  },
  app: {
    dashboard: '/dashboard',
    home: '/',
  },
  article: '/article/:id',
}
