# fixaudiobook

Fix audiobook naming left behind by iTunes rip

- Rip the CD audio book in iTunes, setting the author, title, track number, and disc number tags each time a disc is done
- Set the DIRECTORY environment variable to the location of the ripping
- Run index.js: `node index.js`
- All the files will be titled with the disk and track number up front so that they alphanumerically sort correctly
