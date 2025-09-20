import React from "react";

function HomeScreen() {
  return (
    <>
      <div>HomeScreen</div>
      <br />
      <input type="text" style={{ border: "1px solid red" }} />
      <div className="flex gap-10 w-2/3 justify-center">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
      <h1>home</h1>
    </>
  );
}

export default HomeScreen;
