<template>
  <div class="wrapper-loader">
    <div class="loader">
      <img src="img/sync.svg" alt="" />
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loader',
    props: {
      msg: {
        type: String,
        required: false
      }
    },
  }
</script>

<style lang="scss" scoped>
  .wrapper-loader {
    height: 100vh;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: 999999;

    animation: bounceIn 1s linear forwards;

    .loader {
      background: rgba(#212121, .75);
      border-radius: 10px;
      height: 20vh;
      left: 50%;
      position: absolute;
      text-align: center;
      top: 50%;
      width: 75vw;

      transform: translate(-50%, -50%);

      img {
        height: 50%;
        margin-top: 6.25%;

        animation: spin 2.5s linear infinite;
        transform: translate(-50%, -50%);
      }

      p {
        color: #ffffff;
      }
    }
  }

  @keyframes bounceIn {
    from, 20%, 40%, 60%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
      transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
      transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
