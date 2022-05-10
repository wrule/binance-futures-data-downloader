import axios from "axios";
import fs from 'fs';
import path from 'path';
import moment from 'moment';

export
class Downloader {
  public constructor(
    pDirPath: string,
  ) {
    fs.mkdirSync(pDirPath, { recursive: true });
    this.dirPath = pDirPath;
  }

  private dirPath = '';

  public async download(fileUrl: string, check: boolean = true) {
    try {
      const reqList = [axios.get(fileUrl, { responseType: 'stream' })];
      const checkFileUrl = fileUrl + '.CHECKSUM';
      if (check) {
        reqList.push(axios.get(checkFileUrl, { responseType: 'stream' }));
      }
      const rspList = await Promise.all(reqList);
      const fileRsp = rspList[0];
      fileRsp.data.pipe(fs.createWriteStream(path.join(this.dirPath, path.basename(fileUrl))));
      if (check) {
        const checkFileRsp = rspList[1];
        checkFileRsp.data.pipe(fs.createWriteStream(path.join(this.dirPath, path.basename(checkFileUrl))));
      }
    } catch (e) {
      console.error(`[${moment().format('YYYY-MM-DD HH:mm:sss:SSS')} 文件下载失败，尝试重新下载]: ${fileUrl}`);
      await this.download(fileUrl, check);
    }
  }

  public async batchDownload(
    fileUrls: string[],
    batchSize: number = 5,
    check: boolean = true,
  ) {
    for (let i = 0; i < fileUrls.length; i += batchSize) {
      console.log(i);
      await Promise.all(
        fileUrls.slice(i, i + batchSize)
          .map((fileUrl) => this.download(fileUrl, check))
      );
    }
  }
}
