import axios from "axios";
import fs from 'fs';
import path from 'path';

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
  }
}
