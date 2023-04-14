import axios from 'axios';
import { load } from 'cheerio';

const url = 'http://pt.wikipedia.org/wiki/Oscar_de_melhor_filme';

async function getWinners() {
  const { data } = await axios.get(url);
  const $ = load(data);
  const arr = [];
  $('.wikitable tbody tr').each((_i, element) => {
    const movieName = $(element)
      .find('td[style*="background:#FAEB86"]')
      .last()
      .text()
      .replace('\n', '');
    if (movieName !== '') {
      const movieYear = $(element)
        .find('td[style*="background:#FAEB86"]')
        .first()
        .prev()
        .text()
        .replace('\n', '')
        .slice(-4);
      const winner = { movieName, movieYear };
      arr.push(winner);
    }
  });
  console.log(arr);
}

getWinners();
