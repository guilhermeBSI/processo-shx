export function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

export function getDateString(date) {
  const hora = padTo2Digits(date.getHours());
  const minuto = padTo2Digits(date.getMinutes());
  const dia = padTo2Digits(date.getDate());
  const mes = padTo2Digits(date.getMonth() + 1);
  const ano = date.getFullYear();

  return `${hora}:${minuto}-${dia}/${mes}/${ano}`
}

export const getDataFromTimestamp = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;

  return new Date(milliseconds);
}
