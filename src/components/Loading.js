const Loading = () => {
  // Refactor bits of code into separate components when it makes sense
  // We need the loading component because it will be reused on other pages.
  return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
