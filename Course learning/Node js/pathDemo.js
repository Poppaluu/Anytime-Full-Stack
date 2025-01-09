import path from 'path';
import url from 'url';

const filePath = './dir1/dir2/test.txt';

//basename()
console.log(path.basename(filePath)); // test.txt

//dirname()
console.log(path.dirname(filePath)); // ./dir1/dir2

//extname()
console.log(path.extname(filePath)); // .txt

//parse()
console.log(path.parse(filePath)); // { root: '', dir: './dir1/dir2', base: 'test.txt', ext: '.txt', name: 'test' }

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join()
const filePath2 = path.join(__dirname, 'dir1', 'dir2', 'test.txt');
console.log(filePath2); // /Users/username/Documents/.../Node js/dir1/dir2/test.txt