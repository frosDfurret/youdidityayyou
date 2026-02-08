x = [];
y = [];
xChange = [];
yChange = [];
params = new URLSearchParams(document.location.search);

if (params.get("emoji") != null) {
  document.title = atob(params.get("emoji"))[0];
  for (let i = 0; i < document.getElementsByClassName("emoji").length; i++) {
    document.getElementsByClassName("emoji")[i].innerHTML = atob(
      params.get("emoji"),
    )[0];
  }
}

if (params.get("text") != null) {
  document.title = document.title + " " + params.get("text");
  document.getElementById("star").innerHTML = params.get("text");
}

setTimeout(function () {
  for (let i = 0; i < document.getElementsByClassName("emoji").length; i++) {
    document.getElementsByClassName("emoji")[i].style.visibility = "visible";
    x.push(0);
    y.push(0);
    xChange.push((Math.random() + 1) * 2);
    yChange.push((Math.random() + 1) * 2);
    document.getElementsByClassName("emoji")[i].style.fontSize =
      ((Math.random() + 0.5) * 100).toString() + "pt";
    if (Math.random() > 0.5) {
      xChange[i] = -xChange[i];
    }
    if (Math.random() > 0.5) {
      yChange[i] = -yChange[i];
    }
    setInterval(function () {
      x[i] += xChange[i];
      y[i] += yChange[i];
      document.getElementsByClassName("emoji")[i].style.top =
        (
          document.documentElement.clientHeight / 2 -
          document.getElementsByClassName("emoji")[i].getBoundingClientRect()
            .height /
            2 +
          x[i]
        ).toString() + "px";
      document.getElementsByClassName("emoji")[i].style.left =
        (
          document.documentElement.clientWidth / 2 -
          document.getElementsByClassName("emoji")[i].getBoundingClientRect()
            .width /
            2 +
          y[i]
        ).toString() + "px";
      if (
        x[i] >
          document.documentElement.clientHeight / 2 +
            document.getElementsByClassName("emoji")[i].getBoundingClientRect()
              .height ||
        y[i] >
          document.documentElement.clientWidth / 2 +
            document.getElementsByClassName("emoji")[i].getBoundingClientRect()
              .width /
              2 ||
        x[i] <
          -(
            document.documentElement.clientHeight / 2 +
            document.getElementsByClassName("emoji")[i].getBoundingClientRect()
              .height
          ) ||
        y[i] <
          -(
            document.documentElement.clientWidth / 2 +
            document.getElementsByClassName("emoji")[i].getBoundingClientRect()
              .width /
              2
          )
      ) {
        x[i] = 0;
        y[i] = 0;
        xChange[i] = (Math.random() + 1) * 2;
        yChange[i] = (Math.random() + 1) * 2;
        document.getElementsByClassName("emoji")[i].style.fontSize =
          ((Math.random() + 0.5) * 100).toString() + "pt";
        if (Math.random() > 0.5) {
          xChange[i] = -xChange[i];
        }
        if (Math.random() > 0.5) {
          yChange[i] = -yChange[i];
        }
      }
    }, 1);
  }
}, 500);

function generate() {
  text = encodeURIComponent(prompt("what text you want"));
  emoji = btoa(prompt("what emoji you want"));
  document.location.href =
    location.protocol +
    "//" +
    location.host +
    location.pathname +
    "?text=" +
    text +
    "&emoji=" +
    emoji;
}
