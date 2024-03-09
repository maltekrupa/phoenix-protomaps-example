# MapSelect

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Follow the steps in `Download map data` to service your maps and fonts locally
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

# Download map data

## pmtiles

Install pmtiles

```shell
brew install pmtiles
```

Draw an area on [http://bboxfinder.com/](bboxfinder.com) and copy the
coordinates from the bottom of the page in the `Box` field.

Download data via pmtiles by supplying the previously copied coordinates:

```shell
pmtiles extract https://build.protomaps.com/20240309.pmtiles map.pmtiles --bbox=<coordinates>
```

Check [https://maps.protomaps.com/builds/](protomaps build page) for the latest pmtiles source file.

This gives you a file called `map.pmtiles` containing everything you need.

Move the `map.pmtiles` to `priv/static/map`

## Fonts

To also serve the fonts locally, we need to download them.

```shell
curl -OL https://github.com/protomaps/basemaps-assets/archive/refs/heads/main.zip
unzip main.zip
rm main.zip
mv basemaps-assets-main/fonts priv/static/glyphs
```
