module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
// 1. `'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]`:
//    - Quy tắc này liên quan đến React Fast Refresh, một tính năng trong Next.js để làm mới giao diện người dùng mà không cần tải lại trang.
//    - Nó cấu hình cảnh báo (`warn`) cho trường hợp chỉ có thể xuất các thành phần (components) và cho phép xuất hằng số (`allowConstantExport: true`).

// 2. `'prettier/prettier': ['warn', {...}]`:
//    - Quy tắc này là quy tắc tích hợp của ESLint với Prettier để đảm bảo rằng các quy tắc định dạng mã nguồn được áp dụng đồng nhất.
//    - Nó cấu hình cảnh báo (`warn`) cho trường hợp Prettier phát hiện vi phạm.
//    - Các tùy chọn bên trong mảng là cấu hình cho Prettier:
//       - `arrowParens: 'always'`: Luôn đặt dấu ngoặc cho tham số của hàm mũi tên.
//       - `semi: false`: Không sử dụng dấu chấm phẩy cuối cùng của câu lệnh.
//       - `trailingComma: 'none'`: Không sử dụng dấu phẩy ở cuối danh sách.
//       - `tabWidth: 2`: Sử dụng 2 dấu cách cho mỗi tab.
//       - `endOfLine: 'auto'`: Sử dụng ký tự xuống dòng phù hợp với hệ điều hành.
//       - `useTabs: false`: Sử dụng dấu cách thay vì tab.
//       - `singleQuote: true`: Sử dụng dấu nháy đơn thay vì dấu nháy kép.
//       - `printWidth: 120`: Giới hạn độ dài cột cho mỗi dòng mã nguồn.
//       - `jsxSingleQuote: true`: Sử dụng dấu nháy đơn trong JSX.