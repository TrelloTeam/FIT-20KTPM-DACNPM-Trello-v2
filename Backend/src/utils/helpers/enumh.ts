function getKeyByValue<E>({ data, value }: { data: E; value: string | number }): string {
  return Object.entries(data)
    .filter((elm) => isNaN(Number(elm[0])))
    .find((elm) => elm[1]?.toString() === value?.toString())?.[0]
}
function convertToRegex<E>(data: E): string {
  return `${Object.values(data)
    .filter((elm) => isNaN(Number(elm)))
    .join('|')}`
}

function getFirstKey<E>(data: E): string | unknown {
  return Object.values(data)?.filter((elm) => isNaN(Number(elm)))?.[0]
}

function getValuesAndToString<E>(data: E): string[] {
  return Object.values(data)
    .filter((elm) => !isNaN(Number(elm)))
    .map((elm) => elm.toString())
}
export default {
  getFirstKey,
  getKeyByValue,
  convertToRegex,
  getValuesAndToString,
}
