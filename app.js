const fs = require("fs");
const path = require("path");
const axios = require("axios");
const decompress = require("decompress");

// file downloading function
async function download(url, location) {
  var filename = path.basename(url);
  const filePath = path.resolve(__dirname, location, filename);
  const writer = fs.createWriteStream(filePath);
  const response = await axios({
    url: url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

// file extracting function
async function extract(zipLocation, destLocation) {
  try {
    const files = await decompress(zipLocation, destLocation);
    console.log("done");
  } catch (error) {
    console.log(error);
  }
}

// file copying function
var execute = (file, dir2) => {
  //include the fs, path modules
  var fs = require("fs");
  var path = require("path");

  //gets file name and adds it to dir2
  var f = path.basename(file);
  var source = fs.createReadStream(file);
  var dest = fs.createWriteStream(path.resolve(dir2, f));

  source.pipe(dest);
  source.on("end", function () {
    console.log("Succesfully copied");
  });
  source.on("error", function (err) {
    console.log(err);
  });
};

const url =
  "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-zip-file.zip";
const destination = "";
download(url, destination);

const zipLocation = "";
const destination = "";
extract(zipLocation, destination);

const destination = "";
const source = "";
execute(source, destination);
