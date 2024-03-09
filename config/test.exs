import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :map_select, MapSelectWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "JQC7/JFG5D+H873eVLfMT2aReMZUSEfq65mAb5RBHxUmtNRmzImkOrfLQo0+MmmL",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
