const cv = require("./opencv.js");
const Jimp = require("jimp");

class Ai {
  constructor() {}

  load_image = async (name, folder) => {
    let path = `assets/${folder}/${name}.png`;
    let image = await Jimp.read(path);
    return image;
  };

  find_position = async (template, canvas, threshold) => {
    template = await this.load_image(template, "templates");
    canvas = await this.load_image(canvas, "screenshots");
    const coordinates = await this.find_coordinates(
      canvas,
      template,
      threshold
    );
    return coordinates;
  };

  find_coordinates = async (imageSource, imageTemplate, threshold) => {
    try {
      let src = cv.matFromImageData(imageSource.bitmap);
      let templ = cv.matFromImageData(imageTemplate.bitmap);
      let processedImage = new cv.Mat();
      let mask = new cv.Mat();

      cv.matchTemplate(src, templ, processedImage, cv.TM_CCOEFF_NORMED, mask);
      cv.threshold(
        processedImage,
        processedImage,
        threshold,
        1,
        cv.THRESH_BINARY
      );
      processedImage.convertTo(processedImage, cv.CV_8UC1);

      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();

      cv.findContours(
        processedImage,
        contours,
        hierarchy,
        cv.RETR_EXTERNAL,
        cv.CHAIN_APPROX_SIMPLE
      );
      let cordinates = [];
      for (let i = 0; i < contours.size(); ++i) {
        let countour = contours.get(i).data32S; // Contains the points
        let x = countour[0];
        let y = countour[1];
        let color = new cv.Scalar(0, 255, 0, 255);
        let pointA = new cv.Point(x, y);
        let pointB = new cv.Point(x + templ.cols, y + templ.rows);
        let center = {
          x: (pointB.x - pointA.x) / 2 + pointA.x,
          y: (pointB.y - pointA.y) / 2 + pointA.y,
        };
        cordinates.push({ x, y, pointA, pointB, center });
        // cv.rectangle(src, pointA, pointB, color, 2, cv.LINE_8, 0);
      }
      src.delete();
      templ.delete();
      processedImage.delete();
      mask.delete();
      contours.delete();
      hierarchy.delete();
      console.log(cordinates);
      return cordinates;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = Ai;
