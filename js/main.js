// Hero Image Cycling using PIXI.JS section
   // Global var for our canvas element
   const canvas = document.getElementById('myCanvas');
   let img;
   let img2;

   // Variables for window width and height 
   let _w = window.innerWidth;
   let _h = window.innerHeight;

   // This centers the canvas component in the browser window
   gsap.set(canvas, { xPercent: -50, yPercent: -50 })

   // Pixi boiler plate application where we create an all in one object with renderer, ticker, and stage 
   const app = new PIXI.Application({
      view: canvas,
      width: _w,
      height: _h,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      resizeTo: window
   }, console.log("new pixi"))

   // This function updates the images position on the screen when the window either resizes or if assets are first fully loaded
   function resizeImg() {
      img.x = app.renderer.screen.width / 2;
      img.y = app.renderer.screen.height / 2;
      // Painting 2
      img2.x = app.renderer.screen.width / 2;
      img2.y = app.renderer.screen.height / 2;
      console.log()
   }

   // Event listener which detect if the window has been resized.
   // window.addEventListener('resize', resize);

   // Updates the width and height variable when the window has been resized by the user
   function resize() {
      let _w = window.innerWidth;
      let _h = window.innerHeight;
      app.stop()
      resizeImg()
      app.renderer.resize(_w, _h);
   }

   // This is where it retains all the texture loaded into memory
   console.log(PIXI.utils.TextureCache);

   // This is where we execute all the code once the loader has finished

   // This PIXI loader enables you to load and cache textures first before executing any code proceeding it.
   let loader = PIXI.Loader.shared;
   loader.add("painting1", "assets/painting01-Frith_A_Private_View.jpg")
      .add("painting2", "assets/painting03-painting.jpg")
      .on("progress", handleLoadProgress)
      .on("load", handleLoadAsset)
      .on("error", handleLoadError)
      .load(handleLoadComplete);

   // This checks to see the load progress
   function handleLoadProgress() {
      console.log(loader.progress + "% loaded");
   }
   // Executes after asset is loaded
   function handleLoadAsset() {
      console.log("asset loaded");
   }
   // Executes if there is a load error
   function handleLoadError() {
      console.log("load error")
   }
   // Code executes when the loader is complete
   function handleLoadComplete() {
      let texture = loader.resources.painting1.texture;
      let texture2 = loader.resources.painting2.texture;

      // Creates a new sprite with a texture
      img = new PIXI.Sprite(texture);
      img2 = new PIXI.Sprite(texture2);

      // Sets transform origin of img
      img.anchor.x = .5;
      img.anchor.y = .5;
      img2.anchor.x = .5;
      img2.anchor.y = .5;

      // Adds the images to the stage (canvas element) using the addChild method
      app.stage.addChild(img2);
      app.stage.addChild(img);

      // Makes sure the texture is updated to the window size
      resizeImg()

      // Finally animate is called
      // animate()
   }

   // When animate is called, the images are being animated via gsap and pixi.js gsap plugin
   function animate() {
      var tl = new TimelineMax({})
      tl
         .from(img, 5, { pixi: { scale: 1.5, alpha: 0 } })
         .to(img, 3, { pixi: { alpha: 0 } }, "-=2.5")
         .from(img2, 5, { pixi: { scale: 1.5, alpha: 0 }, transformOrigin: "center center" }, "-=2")
         .to(img2, 5, { pixi: { scale: .8, alpha: 0 } }, "-=2")
         .to(img, 5, { pixi: { scale: 1.5, alpha: 1 }}, "-=2")
   }

   // Global Variables
   var searchBar = document.getElementById("searchBar");
   var searchLine = document.getElementById("searchLine")

   function addListeners(){
      searchBar.addEventListener("mouseover", function(){
         gsap.to(searchLine, {duration: .35, width: "77%", transformOrigin: "-50px center"})
      })
      searchBar.addEventListener("mouseleave", function(){
         gsap.to(searchLine, {duration: .35, width: "0%"})
      })
   }

   function init(){
      gsap.set(searchLine, {force3D: false, rotation: 0.01})
      addListeners()
   }  

   init()


