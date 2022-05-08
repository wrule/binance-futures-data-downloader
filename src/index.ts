import axios from "axios";
import { JSDOM } from 'jsdom';

async function main() {
  const rsp = await axios.get('https://s3-ap-northeast-1.amazonaws.com/data.binance.vision', {
    params: {
      delimiter: '/',
      prefix: 'data/futures/um/daily/klines/BTCUSDT/1m/',
      // marker: 'data/futures/um/daily/klines/BTCUSDT/1m/BTCUSDT-1m-2021-05-18.zip.CHECKSUM'
    },
  });

  const document = new JSDOM(rsp.data).window.document;
  const keys = document.querySelectorAll('ListBucketResult > Contents > Key');
  const filePaths = Array.from(keys).map((key) => key.innerHTML);
  filePaths.forEach((filePath) => {
    console.log(filePath);
  });
}

main();
