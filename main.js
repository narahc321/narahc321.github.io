const startTime = new Date().getTime();
var loaderAnimation = true;

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(3) + 7;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  var balloonContainer = document.getElementById("balloon-container");
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

// window.onload = function () {};

$("#loading-text").click(function () {
  $("#loader").fadeOut("normal", function () {
    $(this).remove();
  });
  $("#loading-text").fadeOut("normal", function () {
    $(this).remove();
  });
  setTimeout(() => {
    $("#birthday-wishes-div").css("display", "block");
    document.getElementById("birthdayMusic").play();
    anim();
  }, 500);

  console.log("click");
  loaderAnimation = false;
});

Loadr = new (function Loadr(id) {
  // # Defines
  const max_size = 24;
  const max_particles = 1500;
  const min_vel = 50;
  const max_generation_per_frame = 50;

  // #Variables
  // sometimes i wrote code horrible enouhg to make eyes bleed
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");
  var height = canvas.height;
  var center_y = height / 2;
  var width = canvas.width;
  var center_x = width / 2;
  var animate = true;
  var particles = [];
  var last = Date.now(),
    now = 0;
  var died = 0,
    len = 0,
    dt;

  function isInsideHeart(x, y) {
    x = ((x - center_x) / center_x) * 3;
    y = ((y - center_y) / center_y) * -3;
    // Simplest Equation of lurve
    var x2 = x * x;
    var y2 = y * y;
    // Simplest Equation of lurve

    return Math.pow(x2 + y2 - 1, 3) - x2 * (y2 * y) < 0;
  }

  function random(size, freq) {
    var val = 0;
    var iter = freq;

    do {
      size /= iter;
      iter += freq;
      val += size * Math.random();
    } while (size >= 1);

    return val;
  }

  function Particle() {
    var x = center_x;
    var y = center_y;
    var size = ~~random(max_size, 2.4);
    var x_vel =
      (max_size + min_vel - size) / 2 -
      Math.random() * (max_size + min_vel - size);
    var y_vel =
      (max_size + min_vel - size) / 2 -
      Math.random() * (max_size + min_vel - size);
    var nx = x;
    var ny = y;
    var r,
      g,
      b,
      a = 0.05 * size;

    this.draw = function () {
      r = ~~(255 * (x / width));
      g = ~~(255 * (1 - y / height));
      b = ~~(255 - r);
      ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    };

    this.move = function (dt) {
      nx += x_vel * dt;
      ny += y_vel * dt;
      if (!isInsideHeart(nx, ny)) {
        if (!isInsideHeart(nx, y)) {
          x_vel *= -1;
          return;
        }

        if (!isInsideHeart(x, ny)) {
          y_vel *= -1;
          return;
        }
        // Lets do the crazy furbidden
        x_vel = -1 * y_vel;
        y_vel = -1 * x_vel;
        return;
      }

      x = nx;
      y = ny;
    };
  }

  function movementTick() {
    var len = particles.length;
    var dead = max_particles - len;
    for (var i = 0; i < dead && i < max_generation_per_frame; i++) {
      particles.push(new Particle());
    }

    // Update the date
    now = Date.now();
    dt = last - now;
    dt /= 1000;
    last = now;
    particles.forEach(function (p) {
      p.move(dt);
    });
  }

  function tick() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(function (p) {
      p.draw();
    });

    if (loaderAnimation) {
      requestAnimationFrame(tick);
    }
    if (Date.now() - startTime > 6000) {
      $("#loading-text").text("Click Here");
    }
  }

  this.start = function () {};

  this.done = function () {};

  setInterval(movementTick, 16);

  tick();
})("loader");

var w = (birthdaycanvas.width = window.innerWidth),
  h = (birthdaycanvas.height = window.innerHeight),
  ctx = birthdaycanvas.getContext("2d"),
  hw = w / 2, // half-width
  hh = h / 2,
  opts = {
    strings: ["HAPPY", "BIRTHDAY", "RENU!"],
    charSize: 60,
    charSpacing: 70,
    lineHeight: 80,

    cx: w / 2,
    cy: h / 2,

    fireworkPrevPoints: 10,
    fireworkBaseLineWidth: 5,
    fireworkAddedLineWidth: 8,
    fireworkSpawnTime: 200,
    fireworkBaseReachTime: 30,
    fireworkAddedReachTime: 30,
    fireworkCircleBaseSize: 20,
    fireworkCircleAddedSize: 10,
    fireworkCircleBaseTime: 30,
    fireworkCircleAddedTime: 30,
    fireworkCircleFadeBaseTime: 10,
    fireworkCircleFadeAddedTime: 5,
    fireworkBaseShards: 5,
    fireworkAddedShards: 5,
    fireworkShardPrevPoints: 3,
    fireworkShardBaseVel: 4,
    fireworkShardAddedVel: 2,
    fireworkShardBaseSize: 3,
    fireworkShardAddedSize: 3,
    gravity: 0.11,
    upFlow: -0.01,
    letterContemplatingWaitTime: 360,
    balloonSpawnTime: 20,
    balloonBaseInflateTime: 10,
    balloonAddedInflateTime: 10,
    balloonBaseSize: 40,
    balloonAddedSize: 60,
    balloonBaseVel: 0.2,
    balloonAddedVel: 0.2,
    balloonBaseRadian: -(Math.PI / 2 - 0.5),
    balloonAddedRadian: -1,
  },
  calc = {
    totalWidth:
      opts.charSpacing *
      Math.max(opts.strings[0].length, opts.strings[1].length),
  },
  Tau = Math.PI * 2,
  TauQuarter = Tau / 4,
  letters = [];

ctx.font = opts.charSize + "px Verdana";

function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;

  this.dx = -ctx.measureText(char).width / 2;
  this.dy = +opts.charSize / 2;

  this.fireworkDy = this.y - hh;

  var hue = (x / calc.totalWidth) * 360;

  this.color = "hsl(hue,80%,50%)".replace("hue", hue);
  this.lightAlphaColor = "hsla(hue,80%,light%,alp)".replace("hue", hue);
  this.lightColor = "hsl(hue,80%,light%)".replace("hue", hue);
  this.alphaColor = "hsla(hue,80%,50%,alp)".replace("hue", hue);

  this.reset();
}
Letter.prototype.reset = function () {
  this.phase = "firework";
  this.tick = 0;
  this.spawned = false;
  this.spawningTime = (opts.fireworkSpawnTime * Math.random()) | 0;
  this.reachTime =
    (opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random()) |
    0;
  this.lineWidth =
    opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
  this.prevPoints = [[0, hh, 0]];
};
Letter.prototype.step = function () {
  if (this.phase === "firework") {
    if (!this.spawned) {
      ++this.tick;
      if (this.tick >= this.spawningTime) {
        this.tick = 0;
        this.spawned = true;
      }
    } else {
      ++this.tick;

      var linearProportion = this.tick / this.reachTime,
        armonicProportion = Math.sin(linearProportion * TauQuarter),
        x = linearProportion * this.x,
        y = hh + armonicProportion * this.fireworkDy;

      if (this.prevPoints.length > opts.fireworkPrevPoints)
        this.prevPoints.shift();

      this.prevPoints.push([x, y, linearProportion * this.lineWidth]);

      var lineWidthProportion = 1 / (this.prevPoints.length - 1);

      for (var i = 1; i < this.prevPoints.length; ++i) {
        var point = this.prevPoints[i],
          point2 = this.prevPoints[i - 1];

        ctx.strokeStyle = this.alphaColor.replace(
          "alp",
          i / this.prevPoints.length
        );
        ctx.lineWidth = point[2] * lineWidthProportion * i;
        ctx.beginPath();
        ctx.moveTo(point[0], point[1]);
        ctx.lineTo(point2[0], point2[1]);
        ctx.stroke();
      }

      if (this.tick >= this.reachTime) {
        this.phase = "contemplate";

        this.circleFinalSize =
          opts.fireworkCircleBaseSize +
          opts.fireworkCircleAddedSize * Math.random();
        this.circleCompleteTime =
          (opts.fireworkCircleBaseTime +
            opts.fireworkCircleAddedTime * Math.random()) |
          0;
        this.circleCreating = true;
        this.circleFading = false;

        this.circleFadeTime =
          (opts.fireworkCircleFadeBaseTime +
            opts.fireworkCircleFadeAddedTime * Math.random()) |
          0;
        this.tick = 0;
        this.tick2 = 0;

        this.shards = [];

        var shardCount =
            (opts.fireworkBaseShards +
              opts.fireworkAddedShards * Math.random()) |
            0,
          angle = Tau / shardCount,
          cos = Math.cos(angle),
          sin = Math.sin(angle),
          x = 1,
          y = 0;

        for (var i = 0; i < shardCount; ++i) {
          var x1 = x;
          x = x * cos - y * sin;
          y = y * cos + x1 * sin;

          this.shards.push(new Shard(this.x, this.y, x, y, this.alphaColor));
        }
      }
    }
  } else if (this.phase === "contemplate") {
    ++this.tick;

    if (this.circleCreating) {
      ++this.tick2;
      var proportion = this.tick2 / this.circleCompleteTime,
        armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

      ctx.beginPath();
      ctx.fillStyle = this.lightAlphaColor
        .replace("light", 50 + 50 * proportion)
        .replace("alp", proportion);
      ctx.beginPath();
      ctx.arc(this.x, this.y, armonic * this.circleFinalSize, 0, Tau);
      ctx.fill();

      if (this.tick2 > this.circleCompleteTime) {
        this.tick2 = 0;
        this.circleCreating = false;
        this.circleFading = true;
      }
    } else if (this.circleFading) {
      ctx.fillStyle = this.lightColor.replace("light", 70);
      ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

      ++this.tick2;
      var proportion = this.tick2 / this.circleFadeTime,
        armonic = -Math.cos(proportion * Math.PI) / 2 + 0.5;

      ctx.beginPath();
      ctx.fillStyle = this.lightAlphaColor
        .replace("light", 100)
        .replace("alp", 1 - armonic);
      ctx.arc(this.x, this.y, this.circleFinalSize, 0, Tau);
      ctx.fill();

      if (this.tick2 >= this.circleFadeTime) this.circleFading = false;
    } else {
      ctx.fillStyle = this.lightColor.replace("light", 70);
      ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);
    }

    for (var i = 0; i < this.shards.length; ++i) {
      this.shards[i].step();

      if (!this.shards[i].alive) {
        this.shards.splice(i, 1);
        --i;
      }
    }

    if (this.tick > opts.letterContemplatingWaitTime) {
      this.phase = "balloon";

      this.tick = 0;
      this.spawning = true;
      this.spawnTime = (opts.balloonSpawnTime * Math.random()) | 0;
      this.inflating = false;
      this.inflateTime =
        (opts.balloonBaseInflateTime +
          opts.balloonAddedInflateTime * Math.random()) |
        0;
      this.size =
        (opts.balloonBaseSize + opts.balloonAddedSize * Math.random()) | 0;

      var rad =
          opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
        vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

      this.vx = Math.cos(rad) * vel;
      this.vy = Math.sin(rad) * vel;
    }
  } else if (this.phase === "balloon") {
    ctx.strokeStyle = this.lightColor.replace("light", 80);

    if (this.spawning) {
      ++this.tick;
      ctx.fillStyle = this.lightColor.replace("light", 70);
      ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

      if (this.tick >= this.spawnTime) {
        this.tick = 0;
        this.spawning = false;
        this.inflating = true;
      }
    } else if (this.inflating) {
      ++this.tick;

      var proportion = this.tick / this.inflateTime,
        x = (this.cx = this.x),
        y = (this.cy = this.y - this.size * proportion);

      ctx.fillStyle = this.alphaColor.replace("alp", proportion);
      ctx.beginPath();
      generateBalloonPath(x, y, this.size * proportion);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, this.y);
      ctx.stroke();

      ctx.fillStyle = this.lightColor.replace("light", 70);
      ctx.fillText(this.char, this.x + this.dx, this.y + this.dy);

      if (this.tick >= this.inflateTime) {
        this.tick = 0;
        this.inflating = false;
      }
    } else {
      this.cx += this.vx;
      this.cy += this.vy += opts.upFlow;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      generateBalloonPath(this.cx, this.cy, this.size);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(this.cx, this.cy);
      ctx.lineTo(this.cx, this.cy + this.size);
      ctx.stroke();

      ctx.fillStyle = this.lightColor.replace("light", 70);
      ctx.fillText(this.char, this.cx + this.dx, this.cy + this.dy + this.size);

      if (this.cy + this.size < -hh || this.cx < -hw || this.cy > hw)
        this.phase = "done";
    }
  }
};
function Shard(x, y, vx, vy, color) {
  var vel =
    opts.fireworkShardBaseVel + opts.fireworkShardAddedVel * Math.random();

  this.vx = vx * vel;
  this.vy = vy * vel;

  this.x = x;
  this.y = y;

  this.prevPoints = [[x, y]];
  this.color = color;

  this.alive = true;

  this.size =
    opts.fireworkShardBaseSize + opts.fireworkShardAddedSize * Math.random();
}
Shard.prototype.step = function () {
  this.x += this.vx;
  this.y += this.vy += opts.gravity;

  if (this.prevPoints.length > opts.fireworkShardPrevPoints)
    this.prevPoints.shift();

  this.prevPoints.push([this.x, this.y]);

  var lineWidthProportion = this.size / this.prevPoints.length;

  for (var k = 0; k < this.prevPoints.length - 1; ++k) {
    var point = this.prevPoints[k],
      point2 = this.prevPoints[k + 1];

    ctx.strokeStyle = this.color.replace("alp", k / this.prevPoints.length);
    ctx.lineWidth = k * lineWidthProportion;
    ctx.beginPath();
    ctx.moveTo(point[0], point[1]);
    ctx.lineTo(point2[0], point2[1]);
    ctx.stroke();
  }

  if (this.prevPoints[0][1] > hh) this.alive = false;
};
function generateBalloonPath(x, y, size) {
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(
    x - size / 2,
    y - size / 2,
    x - size / 4,
    y - size,
    x,
    y - size
  );
  ctx.bezierCurveTo(x + size / 4, y - size, x + size / 2, y - size / 2, x, y);
}

var didntWish = true;
function anim() {
  if (didntWish) window.requestAnimationFrame(anim);

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, w, h);

  ctx.translate(hw, hh);

  var done = true;
  for (var l = 0; l < letters.length; ++l) {
    letters[l].step();
    if (letters[l].phase !== "done") done = false;
  }

  ctx.translate(-hw, -hh);

  if (done) {
    for (var l = 0; l < letters.length; ++l) {
      letters[l].reset();
    }
    didntWish = false;
    $("#birthday-wishes-div").fadeOut("normal", function () {
      $(this).remove();
    });
    createBalloons(100);
    setTimeout(() => {
      document.getElementById("birthdayMusic").pause();
      setTimeout(() => {
        $("#my-video-player").css("display", "block");
        playAndPause();
      }, 1000);
    }, 1000);
  }
}

for (var i = 0; i < opts.strings.length; ++i) {
  for (var j = 0; j < opts.strings[i].length; ++j) {
    letters.push(
      new Letter(
        opts.strings[i][j],
        j * opts.charSpacing +
          opts.charSpacing / 2 -
          (opts.strings[i].length * opts.charSize) / 2,
        i * opts.lineHeight +
          opts.lineHeight / 2 -
          (opts.strings.length * opts.lineHeight) / 2
      )
    );
  }
}

window.addEventListener("resize", function () {
  w = birthdaycanvas.width = window.innerWidth;
  h = birthdaycanvas.height = window.innerHeight;

  hw = w / 2;
  hh = h / 2;

  ctx.font = opts.charSize + "px Verdana";
});

// anim();

const $VIDEO = document.querySelector(".video"),
  $VIDEO_CONTROLS = document.querySelector(".video-controls"),
  $BUTTON_PAUSE_AND_PLAY = document.querySelector(".play-and-pause-video"),
  $PROGRESS_VIDEO = document.querySelector(".progress-video"),
  $CHANGE_VOLUME = document.querySelector(".slide-volume-video"),
  $FULLSCREEN = document.querySelector(".fullscreen-video");

function durationVideo() {
  animationVolume($VIDEO.volume);
}

function progressVideo() {
  animationProgress();
}

function ChangeProgressVideo() {
  $changeProgress = document.querySelector(".progress-video");
  $VIDEO.currentTime = $changeProgress.value;
}

function animationProgress() {
  
}

function animationVolume(volume) {
  let animationVolume = volume;
  animationVolume = volume * 100;
  if (animationVolume === 100) {
    animationVolume = 100;
  }
  $CHANGE_VOLUME.style.backgroundSize = `${animationVolume}% 100%`;
}

function transformVideoDuration(timeVideo) {
  let hours, mins, secds, time;
  hours = Math.floor(timeVideo / 3600);
  mins = Math.floor(timeVideo / 60);
  secds = Math.floor(timeVideo - mins * 60);
  return (time = formartTimeVideo(hours, mins, secds));
}

function formartTimeVideo(hours, mins, secds) {
  let time;
  if (hours < 1) {
    hours = "";
  }
  if (hours < 10 && hours != "") {
    hours = "0" + hours + ":";
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secds < 10) {
    secds = "0" + secds;
  }
  return (time = `${hours}${mins}:${secds}`);
}

function playAndPause() {
  let $playButton = document.querySelector(".play-and-pause-video");
  if ($VIDEO.paused == true) {
    playVideo();
    
  } else {
    pauseVideo();
    
  }
}

function pauseVideo() {
  $VIDEO.pause();
}

function playVideo() {
  $VIDEO.play();
}

function volume() {
  let $changeVolume = document.querySelector(".slide-volume-video").value;
  $VIDEO.volume = $changeVolume;
  let $buttonVolume = document.querySelector(".volume-video");
  if ($VIDEO.volume === 0) {
    $buttonVolume.classList.remove("fa-volume-up");
    $buttonVolume.classList.add("fa-volume-off");
  } else {
    $buttonVolume.classList.remove("fa-volume-off");
    $buttonVolume.classList.add("fa-volume-up");
  }
  animationVolume($changeVolume);
}

function endVideo() {
  let $playButtonEnd = document.querySelector(".play-and-pause-video");
  $VIDEO_CONTROLS.classList.remove("video-controls-visibility--hidden");
  $playButtonEnd.classList.remove("fa-pause");
  $playButtonEnd.classList.add("fa-play");
}

function videoFullScreen() {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if ($VIDEO.requestFullscreen) {
      $VIDEO.requestFullscreen();
    } else if ($VIDEO.msRequestFullscreen) {
      $VIDEO.msRequestFullscreen();
    } else if ($VIDEO.mozRequestFullScreen) {
      $VIDEO.mozRequestFullScreen();
    } else if ($VIDEO.webkitRequestFullscreen) {
      $VIDEO.webkitRequestFullscreen();
    }
    $FULLSCREEN.classList.remove("fa-expand");
    $FULLSCREEN.classList.add("fa-compress");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    $FULLSCREEN.classList.remove("fa-compress");
    $FULLSCREEN.classList.add("fa-expand");
  }
}

function controlVisibility() {
  setTimeout(function () {
    $VIDEO_CONTROLS.classList.remove("video-controls-visibility--visible");
    $VIDEO_CONTROLS.classList.add("video-controls-visibility--hidden");
  }, 10000);
  console.log("play");
}

//               EVENTS PLAYER

// EVENTS VIDEO
$VIDEO.addEventListener("loadeddata", durationVideo);

$VIDEO.addEventListener("timeupdate", progressVideo);

$VIDEO.addEventListener("play", controlVisibility);

$VIDEO.addEventListener("click", playAndPause);

$VIDEO.addEventListener("ended", endVideo);

// EVENTS VIDEO CONTROLS

$PROGRESS_VIDEO.addEventListener("change", ChangeProgressVideo);

$BUTTON_PAUSE_AND_PLAY.addEventListener("click", playAndPause);

$CHANGE_VOLUME.addEventListener("change", volume);

$FULLSCREEN.addEventListener("click", videoFullScreen);
