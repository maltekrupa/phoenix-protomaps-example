defmodule MapSelectWeb.LiveMap do
  use MapSelectWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def render(assigns) do
    ~H"""
    <div id="map" style="width: 100%; height: 100vh;" phx-hook="Map"></div>
    """
  end
end
