export const ConnectToDB = (db) => {
  const connectDB = `http://api.touskaweb.com/api/${db}`;

  return connectDB;
};
