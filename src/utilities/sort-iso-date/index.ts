export const sortIsoDate = (a: any, b: any) =>
  new Date(a.updatedAt as string).getTime() -
  new Date(b.updatedAt as string).getTime();
