<template>
      <Page class="page">
         <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Image Finder, lets see the camera."></Label>
        </ActionBar>

        <GridLayout  columns="*" rows="115, auto, *">
            <button row="0" col="0"   @tap="onScreenshot" text="Take screenshot"   class="btn btn-primary btn-ruby btn-active "/>
            <Image row="2" col="0"  :src="campic"   ></Image>
        </GridLayout>
      </Page>
</template>
<script>

import * as camera from "nativescript-camera";
var imageModule = require("tns-core-modules/ui/image");
var firebase = require("nativescript-plugin-firebase");


export default {
    data() {
    return {
      campic: undefined
    }
  },

  mounted() {
    // firebase.init();
    console.log('firebase');
    // MLKitImageLabelingOnDeviceResult.init();
  },
  methods: {
      onScreenshot() {
              let v = this;
              camera.requestPermissions().then(
                 function success() {
                  camera.takePicture()   
                  .then(function (imageAsset) {
                      var image = new imageModule.Image();
                      image.src = imageAsset;
                      v.campic = imageAsset;

                      firebase.mlkit.imagelabeling.labelImageOnDevice({
                         image: image,
                         confidenceThreshold: 0.6 // this will only return labels with at least 0.6 (60%) confidence. Default 0.5.
                       }).then((result) => console.log(JSON.stringify(result.labels)))
                       .catch(errorMessage => console.log("ML2 Kit error: " + errorMessage));
                   }).catch(function (err) {
                      console.log("Error -> " + err.message);
                  });
              // permission request accepted or already granted 
              // ... call camera.takePicture here ...

              }, 
              function failure() {
              // permission request rejected
              // ... tell the user ...
              }
              );                     
      
      }
  }
}
</script>
