export const enum LoveLanguageType {
  A = 'Words_of_Affirmation',
  B = 'Acts_of_Service',
  C = 'Receiving_Gifts',
  D = 'Quality_Time',
  E = 'Physical_Touch'
}

export const LoveLanguageTitle = {
  [LoveLanguageType.A]: 'Lời nói ghi nhận',
  [LoveLanguageType.B]: 'Hành động phục vụ',
  [LoveLanguageType.C]: 'Nhận quà',
  [LoveLanguageType.D]: 'Thời gian chất lượng',
  [LoveLanguageType.E]: 'Tiếp xúc đụng chạm'
}

export const questions = [
  {
    id: 1,
    text: 'Nhóm 1',
    answers: [
      { text: 'Một ai đó khen khi bạn làm điều gì đó tốt.', type: LoveLanguageType.A },
      { text: 'Một ai đó bất ngờ dọn dẹp phòng của bạn khiến bạn rất cảm kích.', type: LoveLanguageType.B },
      { text: 'Một ai đó bất ngờ mua đồ ăn bên ngoài về cho bạn.', type: LoveLanguageType.C },
      { text: 'Một ai đó thể hiện cảm xúc phù hợp khi nghe những gì bạn chia sẻ.', type: LoveLanguageType.D },
      { text: 'Một ai đó tìm cách ôm bạn hay bắt tay bạn trước khi đi ra ngoài.', type: LoveLanguageType.E }
    ]
  },
  {
    id: 2,
    text: 'Nhóm 2',
    answers: [
      {
        text: 'Một ai đó nói họ thật cảm kích và biết ơn bạn vì một điều ý nghĩa bạn đã làm.',
        type: LoveLanguageType.A
      },
      {
        textMale: 'Nam:  Một ai đó tự nguyện đi sửa xe hay giặt đồ cho bạn và bảo bạn hãy nghỉ ngơi.',
        textFemale: 'Nữ:  Một ai đó xung phong rửa chén giùm bạn và bảo bạn hãy nghỉ ngơi.',
        type: LoveLanguageType.B
      },
      {
        textMale: 'Nam:  Một ai đó mua món ăn đặc biệt về cho bạn.',
        textFemale: 'Nữ:  Một ai đó tặng quà để thể hiện sự quan tâm đến bạn.',
        type: LoveLanguageType.C
      },
      { text: 'Một ai đó bảo bạn ngồi kể cho họ nghe về công việc trong ngày của bạn.', type: LoveLanguageType.D },
      { text: 'Một ai đó ôm bạn, đụng vào bạn hoặc quàng vai khi có dịp đi ngang qua bạn.', type: LoveLanguageType.E }
    ]
  },
  {
    id: 3,
    text: 'Nhóm 3',
    answers: [
      {
        text: 'Một ai đó kể về thành tựu gần đây của bạn trong một buổi tiệc có nhiều người.',
        type: LoveLanguageType.A
      },
      { text: 'Một ai đó giúp bạn sửa chữa đồ đạc hư trong nhà giúp bạn.', type: LoveLanguageType.B },
      { text: 'Một ai đó tự tay chuẩn bị một món quà đặc biệt chỉ dành riêng cho bạn.', type: LoveLanguageType.C },
      { text: 'Một ai đó luôn ngưng Facebook, điện thoại… để lắng nghe bạn khi bạn cần họ.', type: LoveLanguageType.D },
      {
        text: 'Một ai đó quàng vai bạn, dựa vào, cầm tay khi đi trong siêu thị hay ở nơi công cộng.',
        type: LoveLanguageType.E
      }
    ]
  },
  {
    id: 4,
    text: 'Nhóm 4',
    answers: [
      { text: 'Một ai đó khen bạn về một trong những phẩm chất đặc biệt của bạn.', type: LoveLanguageType.A },
      { text: 'Một ai đó nấu cháo hay mua thuốc cho bạn khi bạn bị đau.', type: LoveLanguageType.B },
      {
        text: 'Một ai đó bất ngờ tặng bạn một món đồ bạn đã thích từ rất lâu mà chưa mua được.',
        type: LoveLanguageType.C
      },
      {
        text: 'Một ai đó hẹn riêng với bạn để cùng ra ngoài chơi, dạo, uống nước, nói chuyện.',
        type: LoveLanguageType.D
      },
      {
        text: 'Một ai đó thân mật nói chuyện với bạn – “tay bắt mặt mừng” thay vì đứng xa xa trò chuyện.',
        type: LoveLanguageType.E
      }
    ]
  },
  {
    id: 5,
    text: 'Nhóm 5',
    answers: [
      { text: 'Một ai đó nói cho bạn biết họ thích bạn nhiều như thế nào.', type: LoveLanguageType.A },
      {
        text: 'Một ai đó dành thời gian để giúp bạn hoàn tất một công việc rất phức tạp mà bạn mong gắng  làm xong trong đêm.',
        type: LoveLanguageType.B
      },
      { text: 'Một ai đó gởi cho bạn một món quà đặc biệt, chuyển đến tận nhà.', type: LoveLanguageType.C },
      {
        text: 'Một ai đó “bắt cóc” bạn đi ăn trưa và đưa bạn đến nhà hàng bạn yêu thích nhất.',
        type: LoveLanguageType.D
      },
      { text: 'Một ai đó mát-xa cho bạn.', type: LoveLanguageType.E }
    ]
  }
];
