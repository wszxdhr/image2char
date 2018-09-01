<template>
  <div id="app">
    <input type="file" id="uploader" @change="uploaded"/>
    <label class="uploader-label" for="uploader">
      <p>点击上传</p>
      <img :src="imgSrc" alt="" v-if="imgSrc"/>
    </label>
    <div class="display">
      {{result}}
    </div>
  </div>
</template>

<script>
import image2char from './image2char'
import demoPicture from './assets/demo.png'

export default {
  name: 'app',
  data: () => ({
    imgSrc: demoPicture,
    charGroupWidth: 50,
    result: ''
  }),
  mounted () {
    this.makeChar()
  },
  methods: {
    async uploaded (evt) {
      let file = evt.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        this.imgSrc = reader.result
        this.makeChar()
      }
    },
    async makeChar () {
      this.result = await image2char(this.imgSrc, {
        width: this.charGroupWidth,
        definition: 1
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  #uploader {
    display: none;
  }
  .uploader-label {
    flex: 1;
    border: 5px dashed #000000;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
    margin-right: 10px;
    min-height: 300px;
    position: relative;
    img {
      max-width: 100%;
    }
    p {
      position: absolute;
      z-index: -1;
      color: #d9d9d9;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
      padding: 0;
    }
  }
  .display {
    flex: 1;
    border: 5px dashed #000000;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
    position: relative;
    margin-left: 10px;
    min-height: 300px;
    &:after {
      content: '此处是结果';
      position: absolute;
      z-index: -1;
      color: #e7e7e7;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
