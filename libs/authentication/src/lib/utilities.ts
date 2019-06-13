export function generate_random_string(string_length: number): string {
  let random_string = '';
  let random_ascii;
  const ascii_low = 32;
  const ascii_high = 126;
  for (let i  = 0; i < string_length; i++) {
    random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
    random_string += String.fromCharCode(random_ascii);
  }

  return random_string;
}

export function generate_random_string_array(array_length: number, string_length: number): string[] {
  const  string_array: string[] = [];
  for (let i = 0; i < array_length; i ++ ) {
    string_array.push(generate_random_string(string_length));
  }

  return string_array;
}


