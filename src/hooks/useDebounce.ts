const useDebounce = () => {
  const debaunce = (callBackFunc: (arg0: any) => void, delay = 1000) => {
    let timeout: any;
    return (args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        callBackFunc(args);
      }, delay);
    };
  };
  return {debaunce};
};
export default useDebounce;

// export default function useDebounce(
//   callBackFunc: (arg0: any) => void,
//   delay = 1000
// ) {
//   let timeout:any
//   return (args:any) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(async () => {
//       callBackFunc(args);
//     }, delay);
//   };
// }
