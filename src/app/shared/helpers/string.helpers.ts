export function format(fmt: string, ...params: any[]): string {
  // const args = arguments;
  const s = fmt.replace(/{(\d+)}/g, (match, ndx) => {
    return typeof params[ndx] !== 'undefined' ? params[ndx] : match;
  });
  return s;
}

export function sprintf(format: string, ...args: string[]) {
    let i: number = 0;
    return format.replace(/%s/g, () => args[i++]);
}

