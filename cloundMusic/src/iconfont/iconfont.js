;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-erji" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.256 182.016c-184.128 0-333.376 149.248-333.376 333.376 0 0.512 0 1.024 0 1.472 16.32-5.312 33.664-8.32 51.776-8.32 1.536 0 3.008 0.128 4.544 0.256l0 333.184 56.32 0c10.048 0 18.176-8.256 18.176-18.24L309.696 518.272c0-10.048-8.128-18.176-18.176-18.176l-54.4 0c5.12-147.648 126.272-265.664 275.072-265.664s269.888 118.08 275.072 265.664l-50.368 0c-9.984 0-18.24 8.128-18.24 18.176l0 305.472c0 9.984 8.256 18.24 18.24 18.24l56.32 0 0-333.44c18.304 0 35.84 3.072 52.288 8.512 0-0.576 0-1.152 0-1.664C845.632 331.264 696.448 182.016 512.256 182.016zM64 675.328c0 73.92 48.256 136.576 114.88 158.4l0-316.8C112.256 538.688 64 601.344 64 675.328zM845.632 517.056l0 316.352C912.064 811.52 960 748.992 960 675.328 960 601.472 912.064 539.072 845.632 517.056z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-ren" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M513.022795 61.718667c-147.677411 0-267.395026 119.716592-267.395026 267.395026 0 147.678434 119.716592 267.395026 267.395026 267.395026S780.417821 476.792127 780.417821 329.11267C780.417821 181.435259 660.700205 61.718667 513.022795 61.718667zM513.021771 510.98795c-100.446713 0-181.874257-81.427544-181.874257-181.874257 0-100.447736 81.427544-181.874257 181.874257-181.874257 100.446713 0 181.875281 81.426521 181.875281 181.874257C694.897052 429.560406 613.468484 510.98795 513.021771 510.98795zM156.930657 959.469288c-0.032746-2.02103-0.056282-4.043083-0.056282-6.072299 0-197.981097 158.995177-358.477464 355.123067-358.477464 196.130959 0 355.126136 160.496367 355.126136 358.477464 0 2.028193-0.022513 4.051269-0.056282 6.072299l92.433202 0c0.026606-2.02103 0.042979-4.043083 0.042979-6.070252 0-244.530272-200.372563-442.760033-447.543989-442.760033-247.173472 0-447.546036 198.22976-447.546036 442.760033 0 2.026146 0.016373 4.049223 0.042979 6.070252L156.930657 959.469288z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)