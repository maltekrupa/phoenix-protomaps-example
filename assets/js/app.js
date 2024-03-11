// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"

// Custom imports
import * as maplibregl from '../vendor/node_modules/maplibre-gl';
import {Protocol, PMTiles} from '../vendor/node_modules/pmtiles';
import layers from '../vendor/node_modules/protomaps-themes-base';

// Hooks
const Map = {
  mounted() {
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    const map = new maplibregl.Map({
      container: 'map',
      center: [8.682127, 50.110924],
      zoom: 13,
      style: {
        version: 8,
        glyphs: '/glyphs/{fontstack}/{range}.pbf',
        sources: {
          protomaps: {
            type: 'vector',
            url: 'pmtiles:///map/frankfurt.pmtiles',
            attribution:
              '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
          },
        },
        layers: layers('protomaps', 'dark'),
      },
    });
    map.once('load', () => {
      map.addSource('streets', {
        type: 'geojson',
        data: '/map/frankfurt.geojson.small',
      });
      map.addLayer({
        id: 'steet-lines',
        type: 'line',
        source: 'streets',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#888',
          'line-width': 1
        }
      });
    });
  },
};

const Hooks = {
  Map,
};

// End of custom
let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}, hooks: Hooks })

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
