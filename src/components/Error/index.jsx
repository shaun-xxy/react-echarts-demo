export const Error = ({ error }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Something went wrong</h4>
      <pre>{error.message}</pre>
    </div>
  );
};