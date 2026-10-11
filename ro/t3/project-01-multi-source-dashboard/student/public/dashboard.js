export async function loadDashboard({ fetchImpl = fetch, render }) {
  // TODO: preluați toate sursele în paralel și randați stările de succes/eroare.
  // Păstrați randarea de loading prima, ca UI-ul să arate tranziția asincronă.
  void fetchImpl;
  const loading = { state: "loading" };
  render(loading);
  return loading;
}
