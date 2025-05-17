import { configDotenv } from 'dotenv';
configDotenv();

import app from './app';

app.listen(process.env.API_PORT || 3000, () =>
  console.log(`Listening on port ${process.env.API_PORT}`)
);

export default app;
