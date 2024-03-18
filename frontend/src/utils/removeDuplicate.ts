


export function removeDuplicatesByProperty(arr: any) {
  const uniqueSet = new Set();
  const uniqueArray = arr?.filter((obj: any) => {
    const stringified = JSON.stringify(obj);
    if (!uniqueSet.has(stringified)) {
      uniqueSet.add(stringified);
      return true;
    }
    return false;
  });

  return uniqueArray;
}