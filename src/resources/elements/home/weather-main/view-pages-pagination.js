export class PagesValueConverter {
  toView(value, currentPage, maxViewPages) {
    if ((value.length - 1) >= +maxViewPages) {
      const start = ((currentPage * maxViewPages) - maxViewPages);
      const end = start + maxViewPages;
      return value.slice(start, end);
    }
    if (value.length) return value;
  }
}
