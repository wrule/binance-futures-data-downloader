import axios from "axios";
import { JSDOM } from 'jsdom';
import { Downloader } from './downloader';
import xmlText from './eth';
import moment, { Moment } from "moment";
import { load_csv } from '@wrule/ohlcv-utils';


async function main() {
  const list = load_csv('./BTCUSDT/result.csv');
  console.log(list[0]);

  // const document = new JSDOM(xmlText).window.document;
  // const list = Array.from(document.querySelectorAll('body > a'))
  //   .map((item) => item.getAttribute('href'))
  //   .filter((item) => item?.endsWith('.zip')) as string[];

  // const d = new Downloader('ETHUSDT');
  // d.batchDownload(list, 10, true);
}

main();
