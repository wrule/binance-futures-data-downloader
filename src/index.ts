import axios from "axios";
import { JSDOM } from 'jsdom';
import { Downloader } from './downloader';
import xml1m from './1m';

async function main() {
  const document = new JSDOM(xml1m).window.document;
  const list = Array.from(document.querySelectorAll('body > a'))
    .map((item) => item.getAttribute('href'))
    .filter((item) => item?.endsWith('.zip')) as string[];

  const d = new Downloader('BTCUSDT');
  d.batchDownload(list, 5, true);
}

main();
