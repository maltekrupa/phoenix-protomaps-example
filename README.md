# MapSelect

To start your Phoenix server:

  * Run `npm install` in `assets/vendor`
  * Run `mix setup` to install and setup dependencies
  * Follow the steps in `Download map data` to serve maps and fonts locally
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Short video: [![Screenshot of application running in firefox](https://img.youtube.com/vi/AnjkZntIxW0/0.jpg)](https://youtu.be/AnjkZntIxW0)

# Download map data

This example uses Frankfurt/Germany to not confuse you with generic names.

## pmtiles

Install pmtiles

```shell
brew install pmtiles
```

Draw an area on [bboxfinder.com](http://bboxfinder.com) and copy the
coordinates from the bottom of the page in the `Box` field.

Download data via `pmtiles` by supplying the previously copied coordinates:

```shell
pmtiles extract https://build.protomaps.com/20240309.pmtiles frankfurt.pmtiles --bbox=8.618774,50.076973,8.755074,50.148636

```

Check [protomaps build page](https://maps.protomaps.com/builds/) for the latest pmtiles source file.

This creates a file called `frankfurt.pmtiles` containing everything you need.

Move the `map.pmtiles` to `priv/static/map`

## Fonts

To also serve the fonts locally, we need to download them.

```shell
curl -OL https://github.com/protomaps/basemaps-assets/archive/refs/heads/main.zip
unzip main.zip
rm main.zip
mv basemaps-assets-main/fonts priv/static/glyphs
rm -rf basemaps-assets-main
```

## Add data from GeoJSON

To present something on the map, we issue a query on [overpass
turbo](https://overpass-turbo.eu/) and export the result as GeoJSON.

```
[out:json];
area[name = "Frankfurt am Main"];
(way(area)["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|living_street)$"];>;);
out;
```

To reduce the size of the GeoJSON pipe it through `jq`:

```shell
jq -c . < frankfurt.geojson > frankfurt.geojson.mini
```

Move this file to `priv/static/map` and you're done.

# What has been done

Not a lot as been done to make this work. Let's walk through it together:

A new project was created via

```
mix phx.new map_select --no-ecto --no-mailer
```

Then I added:

- a [new live route](https://github.com/maltekrupa/phoenix-protomaps-example/blob/main/lib/map_select_web/router.ex#L20)
- a [small module](https://github.com/maltekrupa/phoenix-protomaps-example/blob/main/lib/map_select_web/live/live_map.ex) to serve some basic HTML for the map
- a [JavaScript hook](https://github.com/maltekrupa/phoenix-protomaps-example/blob/main/assets/js/app.js#L25-L77) to load the map and add an additional layer with some GeoJSON

That's it.
