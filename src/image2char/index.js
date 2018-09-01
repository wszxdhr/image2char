let canvas = document.createElement('canvas')

document.body.appendChild(canvas)
canvas.style.width = '300px'

let ctx = canvas.getContext('2d')
let image = new Image()

const loadImage = async (img) => {
  return new Promise(resolve => {
    img.onload = function () {
      // console.log(this.width, this.height)
      resolve(this)
    }
  })
}

export default async function (sourceImage, { width = 50, definition = 1 }, callback) {
  // 图片的长宽比
  let imageRatio = 1
  // 如果是base64，加载图片并计算出长宽比
  if (typeof sourceImage === 'string') {
    image.src = sourceImage
    let { width, height } = await loadImage(image)
    imageRatio = width / height
  }
  let canvasWidth = width * definition
  let canvasHeight = canvasWidth / imageRatio
  // 设定精细度以及宽高
  if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
    canvas.width = canvasWidth
    canvas.height = canvasHeight
  }
  // canvas加载图片
  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight)
  // 加载像素信息s
  let pixelData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data
  console.log(pixelData)
  return new Promise((resolve, reject) => {
    let result = ''
    resolve(result)
  })
}
