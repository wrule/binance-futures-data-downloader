import axios from "axios";
import { JSDOM } from 'jsdom';
import { Downloader } from './downloader';
import xmlText from './eth';
import Papa from 'papaparse';
import fs from 'fs';
import moment, { Moment } from "moment";

interface IOHLCV {
  time: Moment;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  source?: number[];
}

function now() {
  return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
}

function log(name: string, text = '') {
  console.log(`[${now()} ${name}]${text ? `: ${text}` : '...'}`);
}


function loadOHLCVFile(filePath: string, interval = 60000): IOHLCV[] {
  log('读取csv文件');
  const csvText = fs.readFileSync(filePath, 'utf-8');
  log('解析csv文件');
  const csvData = Papa.parse(csvText, {
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data as number[][];
  log('排序数据');
  csvData.sort((a, b) => a[0] - b[0]);
  log('转换为OHLCV格式');
  const result: IOHLCV[] = [];
  csvData.forEach((item) => {
    result.push({
      time: moment(new Date(item[0])),
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      volume: item[5],
      source: item,
    });
    if (result.length > 1) {
      const curTime = result[result.length - 1].time;
      const prevTime = result[result.length - 2].time;
      const diff = curTime.diff(prevTime, 'milliseconds');
      if (diff !== interval) {
        log('间距不正确', `${
          prevTime.format('YYYY-MM-DD HH:mm:ss:SSS')
        } ~ ${
          curTime.format('YYYY-MM-DD HH:mm:ss:SSS')
        } diff: ${diff}`)
      }
    }
  });
  return result;
}

async function main() {
  const list = loadOHLCVFile('./ETHUSDT/result.csv');
  // console.log(list[0]);

  // const document = new JSDOM(xmlText).window.document;
  // const list = Array.from(document.querySelectorAll('body > a'))
  //   .map((item) => item.getAttribute('href'))
  //   .filter((item) => item?.endsWith('.zip')) as string[];

  // const d = new Downloader('ETHUSDT');
  // d.batchDownload(list, 10, true);
}

main();
