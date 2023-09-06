<template>
    <div>
      <canvas ref="qrcodeCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode';
  
  export default {
    props: {
      value: String,
    },
    mounted() {
      this.generateQRCode();
    },
    watch: {
      value: 'generateQRCode',
    },
    methods: {
      generateQRCode() {
        if (this.value) {
          QRCode.toCanvas(this.$refs.qrcodeCanvas, this.value, (error) => {
            if (error) {
              console.error(error);
            }
          });
        }
      },
    },
  };
  </script>