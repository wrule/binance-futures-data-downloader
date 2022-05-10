import axios from "axios";
import { JSDOM } from 'jsdom';
import { Downloader } from './downloader';
import xmlText from './eth';

async function main() {
  const document = new JSDOM(xmlText).window.document;
  const list = Array.from(document.querySelectorAll('body > a'))
    .map((item) => item.getAttribute('href'))
    .filter((item) => item?.endsWith('.zip')) as string[];

  const d = new Downloader('ETHUSDT');
  d.batchDownload(list, 10, true);
}

main();
