const DeleteDf = (name: any) => {
  const deleteDataset = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await console.log(name.name, "ssss");
    const p = name.name;
    try {
      const body = { p };
      await fetch("/api/auth/deletedataset", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then(function (response) {
        console.log(response.status, "holis"); // Will show you the status
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      });
    } catch (error) {
      console.error("cant delete");
    }
  };

  return (
    <button className="delete_df" onClick={deleteDataset}>
      Delete Dataset
    </button>
  );
};
export default DeleteDf;
