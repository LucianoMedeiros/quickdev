const serverURL = 'http://localhost:3000'
export const APIRoutePath = {
  post: {
    get: `${serverURL}/api/post/:id`,
    update: `${serverURL}/api/post/:id`,
    create: `${serverURL}/api/post`,
    getAll: `${serverURL}/api/post`,
  },
}
