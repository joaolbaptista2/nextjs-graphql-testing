import Router from "next/router";

export default (context: any, target: string) => {
  if (context.res) {
  } else {
    // In the browser, we just pretend like this never even happened ;)
  }
};