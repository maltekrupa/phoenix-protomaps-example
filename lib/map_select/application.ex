defmodule MapSelect.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      MapSelectWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:map_select, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: MapSelect.PubSub},
      # Start a worker by calling: MapSelect.Worker.start_link(arg)
      # {MapSelect.Worker, arg},
      # Start to serve requests, typically the last entry
      MapSelectWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: MapSelect.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    MapSelectWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
