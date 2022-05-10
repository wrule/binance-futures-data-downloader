import axios from "axios";
import { JSDOM } from 'jsdom';
import { Downloader } from './downloader';
import xml1m from './1m';

// console.log(xml1m);

async function main() {
  // const rsp = await axios.get('https://s3-ap-northeast-1.amazonaws.com/data.binance.vision', {
  //   params: {
  //     delimiter: '/',
  //     prefix: 'data/futures/um/daily/klines/BTCUSDT/1m/',
  //     // marker: 'data/futures/um/daily/klines/BTCUSDT/1m/BTCUSDT-1m-2021-05-18.zip.CHECKSUM'
  //   },
  // });

  const document = new JSDOM(xml1m).window.document;
  const list = Array.from(document.querySelectorAll('body > a'))
    .map((item) => item.getAttribute('href'))
    .filter((item) => item?.endsWith('.zip')) as string[];

  const d = new Downloader('BTCUSDT');
  // d.download('https://data.binance.vision/data/futures/um/daily/klines/BTCUSDT/1m/BTCUSDT-1m-2021-05-18.zip', false);
  d.batchDownload(list, 5, true);
}

main();
