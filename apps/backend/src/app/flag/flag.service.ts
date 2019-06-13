import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FlagService {

  getFlag() {
    const flag =  fs.readFileSync(`${process.cwd()}/flag.txt`, {encoding: 'utf8'});
    return {flag: flag};
  }
}
