
// =============== PIXI.JS + GSAP =============== >

// Hero Image Cycling using PIXI.JS section
   // Global var for our canvas element
   const canvas = document.getElementById('myCanvas');
   let img;
   let img2;
   let img3;

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
      // Painting 3
      img3.x = app.renderer.screen.width / 2;
      img3.y = app.renderer.screen.height / 2;
   }

   // Event listener which detect if the window has been resized.
   window.addEventListener('resize', resize);

   // Updates the width and height variable when the window has been resized by the user
   function resize() {
      let _w = window.innerWidth;
      let _h = window.innerHeight;
      // app.stop()
      resizeImg()
      app.renderer.resize(_w, _h);
      console.log("resized")
   }

   // This is where it retains all the texture loaded into memory
   console.log(PIXI.utils.TextureCache);

   // This is where we execute all the code once the loader has finished

   // This PIXI loader enables you to load and cache textures first before executing any code proceeding it.
   let loader = PIXI.Loader.shared;
   loader.add("painting1", "assets/painting01-Frith_A_Private_View.jpg")
      .add("painting2", "assets/painting03-painting.jpg")
      .add("painting3", "assets/painting04.jpg")
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
      let texture3 = loader.resources.painting3.texture;

      // Creates a new sprite with a texture
      img = new PIXI.Sprite(texture);
      img2 = new PIXI.Sprite(texture2);
      img3 = new PIXI.Sprite(texture3);

      // Sets transform origin of img
      img.anchor.x = .5;
      img.anchor.y = .5;
      img2.anchor.x = .5;
      img2.anchor.y = .5;
      img3.anchor.x = .5;
      img3.anchor.y = .5;

      // Adds the images to the stage (canvas element) using the addChild method
      app.stage.addChild(img);
      app.stage.addChild(img2);
      app.stage.addChild(img3);

      // Makes sure the texture is updated to the window size
      resizeImg()

      // Finally animate is called
      animate()
   }

   // When animate is called, the images are being animated via gsap and pixi.js gsap plugin
   function animate() {
      var tl = new TimelineMax({})
      tl
         .from(img, 7, { pixi: { scale: 1.5, alpha: 0 } })
         .to(img, 2, { pixi: { alpha: 0 } }, "-=2")
         .from(img2, 7, { pixi: { scale: 1.5, alpha: 0 }, x: 800, transformOrigin: "center center" }, "-=2")
         .to(img2, 7, { pixi: { scale: .8, alpha: 0 } }, "-=2")
         .from(img3, 7, { pixi: { scale: 1.3, alpha: 0 }, x: 600 }, "-=2")
   }


// =============== Vanilla JS + GSAP =============== >

   // Global Variables
   var searchBar = document.getElementById("searchBar");
   var searchLine = document.getElementById("searchLine");
   var nav = document.querySelector(".nav");
   var logo = document.querySelector(".svgContainer");

   function addListeners(){
      searchBar.addEventListener("mouseover", function(){
         gsap.to(searchLine, {duration: .35, width: "77%", transformOrigin: "-50px center"})
      })
      searchBar.addEventListener("mouseleave", function(){
         gsap.to(searchLine, {duration: .35, width: "0%"})
      })
   }

   function animateIntro(){
      var tl = new TimelineMax()
      tl
         .to(nav, {duration: .7, opacity: 1, xPercent: 0, ease: Power2.easeOut}, "sync")
         .staggerTo("#info-svg, #calendar-svg, #collection-svg", 1, {opacity: 1, y: 0, ease: Back.easeInOut.config(3)}, .1, "-=.8")
         .to(".linkContainer", {duration: .75, opacity: 1, x: 0, ease: Power2.easeOut}, "-=.9")
   }  

   function setIntroAnimation(){
      gsap.set(nav, {xPercent: -100, force3D: false, rotation: 0.01})
      gsap.set(".navIcons", { clip: "rect(0px, 0px, 0px 0px)" })
      gsap.set(".icon-con", { y: 60, opacity: 0})
      gsap.set(".linkContainer", { opacity: 0, x: -100 })   

      addListeners()
      TweenMax.delayedCall(.3, animateIntro)
   }

   function init(){
      gsap.set(searchLine, {force3D: false, rotation: 0.01})
      setIntroAnimation()
   }  

   init()


