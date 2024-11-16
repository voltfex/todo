export default function getFormattedDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0'); // Добавляет 0 перед числом, если оно меньше 10
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц начинается с 0, поэтому добавляем 1
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
