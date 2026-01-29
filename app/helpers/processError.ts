export const processError = (message: string, status: number) => {
  return Response.json({ error: message }, { status });
};
