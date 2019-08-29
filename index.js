/*
  Rip the CD audio book in iTunes, setting the author, title, track number, and disc number tags each time a disc is done
  Set the DIRECTORY environment variable to the location of the ripping
  Run index.js
  All the files will be titled with the disk and track number up front so that they alphanumerically sort correctly
*/

const fs = require('fs');
const path = require('path');
const id3Tags = require('read-id3-tags').readID3Tags;

if(!process.env.DIRECTORY){
  console.log('Set the DIRECTORY environment variable to the path the book was ripped to');
  process.exit(2);
}

const directory = process.env.DIRECTORY;

fs.readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach(async (file) => {
    const fullPath = path.join(directory, file);
    let tags = await id3Tags(fullPath);
    console.log(file, tags.disk.no, tags.track.no);
    fs.renameSync(fullPath, path.join(directory, `${tags.disk.no}-${tags.track.no} ${tags.artist[0]} - ${tags.album}.mp3`));
  });
});