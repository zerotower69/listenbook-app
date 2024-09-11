const fs = require('fs');
const path = require('path');

const images = fs.readdirSync(path.resolve(__dirname, 'image'))
console.log(images)

for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const [imageName,ext] = image.split('.')
    const imagePath = path.resolve(__dirname, `image/${image}`);
    const inputStream = fs.createReadStream(imagePath);
    const outputStream = fs.createWriteStream(path.resolve(__dirname, `image/${i + 1}.png`))
    
    inputStream.pipe(outputStream)

    inputStream.on('end', () => {
        fs.unlinkSync(imagePath)
    })
}