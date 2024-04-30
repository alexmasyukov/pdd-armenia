/**
 * return plural nubmer of word by three forms
 * @param num
 * @param form1
 * @param form2
 * @param form3
 * @returns string
 * @example pluralize(21, 'мнение', 'мнения', 'мнений') ===> мнений
 */
export const pluralize = (num: number, form1: string, form2: string, form3: string) => {
  var titles = [form1, form2, form3],
    cases = [2, 0, 1, 1, 1, 2];
  return titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
};
