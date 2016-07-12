import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.static('./kipp/public'));

const server = app.listen(process.env.PORT || 3003, () => {
  console.log('info', 'Kipp listening on port ', server.address().port);
});
