x = [];
y = [];
xChange = [];
yChange = [];
params = new URLSearchParams(document.location.search);

/*
this code stolen from chatGPT
*/

function toCodePointString(str) {
  return Array.from(
    str,
    (ch) =>
      "U+" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"),
  ).join(" ");
}

/**
 * Convert a code point string back to a Unicode string (emoji).
 * Accepts: "U+1F600", "1F600", space/-,/ separated sequences
 */

function fromCodePointString(input) {
  const parts = input.match(/(?:U\+)?[0-9A-Fa-f]{1,6}/g) || [];
  const cps = parts.map((h) => parseInt(h.replace(/^U\+/i, ""), 16));
  return String.fromCodePoint(...cps);
}

/*
rest of this shitty code is my own :>
*/

if (params.get("emoji") != null) {
  document.title = fromCodePointString(params.get("emoji"));
  for (let i = 0; i < document.getElementsByClassName("emoji").length; i++) {
    document.getElementsByClassName("emoji")[i].innerHTML = fromCodePointString(
      params.get("emoji"),
    );
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
  emoji = toCodePointString(prompt("what emoji you want")[0]);
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
