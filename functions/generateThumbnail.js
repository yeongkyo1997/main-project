const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.generateThumbnail = async (file) => {
  const storage = new Storage(); // 구글 스토리지 불러오기
  const scrBucket = storage.bucket(file.bucket); // 스토리지 버킷

  const sizes = [320, 640, 1280]; // 사이즈 배열

  const imageUpload = sizes.map((size) => {
    let thumbName = ""; // 썸네일 이름

    // 사이즈로 분류
    switch (size) {
      case 320:
        thumbName = `thumb/s/resize_${file.name}`;
        break;

      case 640:
        thumbName = `thumb/m/resize_${file.name}`;
        break;

      case 1280:
        thumbName = `thumb/l/resize_${file.name}`;
    }

    if (file.name.search(`resize_`) === -1) {
      const filenameObj = scrBucket.file(file.name);
      const createObj = scrBucket.file(thumbName);

      const readStream = filenameObj.createReadStream(); // 읽기스트림

      const writeStream = createObj.createWriteStream(); // 썸네일 스트림

      const resizeObj = sharp().resize(size).jpeg(); // 썸네일 사이즈 설정

      readStream.pipe(resizeObj).pipe(writeStream);

      // 최종적으로 결과물을 프로미스에 담아 저장한다.
      return new Promise(() => {
        writeStream
          .on("error", (err) => {
            console.log(
              "🚀 ~ file: generateThumbnail.js ~ line 54 ~ .on ~ err",
              err
            );
          })
          .on("finish", () => {
            console.log(
              "🚀 ~ file: generateThumbnail.js ~ line 26 ~ writeStream.on ~ finish"
            );
          });
      });
    }
  });

  return await Promise.all(imageUpload);
};
