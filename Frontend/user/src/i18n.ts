// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'Boards': 'Boards',
      'Views': 'Views',
      'Members': 'Members',
      'Settings': 'Settings',
      'Most popular templates': 'Most popular templates',
      'Template': 'Template',
      'Starred boards': 'Starred boards',
      'Recently viewed': 'Recently viewed',
      'YOUR WORKSPACES': 'YOUR WORKSPACES',
      'Create new board': 'Create new board'
      // Add other translations as needed
    },
  },
  vn: {
    translation: {
      'Boards': 'Bảng',
      'Views': 'Dạng xem',
      'Members': 'Thành viên',
      'Settings': 'Cài đặt',
      'Most popular templates': 'Mẫu thông dụng nhất',
      'Template': 'Mẫu',
      'Starred boards': 'Bảng đánh dấu sao',
      'Recently viewed': 'Đã xem gần đây',
      'YOUR WORKSPACES': 'CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN',
      'Create new board': 'Tạo bảng mới'
      // Add other translations as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
