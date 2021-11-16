const fs2 = require('fs-extra');
const archiver = require('archiver');
import { PackDir } from '../init';

export default function packager(pack: PackDir) {
  const { source, destination } = pack;
  return new Promise((resolve, reject) => {
    const output = fs2.createWriteStream(destination);
    let archive = archiver('zip', {
      zlib: { level: 9 },
    });
    output.on('close', function () {
      resolve(true);
    });

    archive.on('warning', function (err: any) {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        reject(err);
      }
    });

    archive.on('error', function (err: any) {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(source, false);
    archive.finalize();
  });
}
