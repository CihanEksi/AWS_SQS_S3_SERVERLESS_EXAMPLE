const consoleError = (...message: any) => {
  console.log("------ERROR_START-------");
  console.error(...message);
  console.log("------ERROR_STOP------");
};


export { consoleError };