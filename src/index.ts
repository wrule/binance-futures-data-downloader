import axios from "axios";
import { JSDOM } from 'jsdom';
import { Downloader } from './downloader';


async function main() {
  // const rsp = await axios.get('https://s3-ap-northeast-1.amazonaws.com/data.binance.vision', {
  //   params: {
  //     delimiter: '/',
  //     prefix: 'data/futures/um/daily/klines/BTCUSDT/1m/',
  //     // marker: 'data/futures/um/daily/klines/BTCUSDT/1m/BTCUSDT-1m-2021-05-18.zip.CHECKSUM'
  //   },
  // });

  // const document = new JSDOM(rsp.data).window.document;
  // const keys = document.querySelectorAll('ListBucketResult > Contents > Key');
  // const paths = Array.from(keys)
  //   .map((key) => key.innerHTML.trim())
  //   .filter((path) => path.endsWith('.zip'));
  // console.log(paths.length);
  // paths.forEach((filePath) => {
  //   console.log(filePath);
  // });

  const d = new Downloader('BTCUSDT');
  d.download('https://data.binance.vision/data/futures/um/daily/klines/BTCUSDT/1m/BTCUSDT-1m-2021-05-18.zip', false);
}

main();
