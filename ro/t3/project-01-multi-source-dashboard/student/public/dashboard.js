export async function loadDashboard({ fetchImpl = fetch, render }) {
  const loading = { state: "loading" };
  render(loading);

  const paths = ["/data/profile.json", "/data/tasks.json", "/data/noticesnpm.json"];

  try {
    const [profile, tasks, notices] = await Promise.all(
      paths.map(async (path) => {
        const response = await fetchImpl(path);
        if (!response.ok) {
          throw new Error(`request failed: ${path} (${response.status})`);
        }
        return response.json();
      })
    );

    const model = {
      state: "success",
      profile,
      openTaskCount: tasks.filter((task) => task.status === "open").length,
      totalTaskCount: tasks.length,
      notices,
    };
    render(model);
    return model;
  } catch (error) {
    const model = { state: "error", message: error.message };
    render(model);
    return model;
  }
}