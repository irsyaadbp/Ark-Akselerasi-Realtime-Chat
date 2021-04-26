export default function Loading() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="spinner-border text-success me-2" role="status" />
      <span>Loading...</span>
    </div>
  );
}
