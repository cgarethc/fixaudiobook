const fs = require('fs');
const path = require('path');
const id3Tags = require('read-id3-tags').readID3Tags;


const directory = process.env.DIRECTORY || '.';

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(async (file) => {
    const fullPath = path.join(directory, file);
    let tags = await id3Tags(fullPath);
    console.log(file, tags.disk.no, tags.track.no);
    fs.renameSync(fullPath, path.join(directory, `${tags.disk.no}-${tags.track.no} ${tags.artist[0]} - ${tags.album}`));
  });
});