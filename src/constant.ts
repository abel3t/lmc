export enum LoveLanguageType {
  A,
  B,
  C,
  D,
  E,
}

export const LoveLanguageTitle = {
  [LoveLanguageType.A]: 'Lời nói ghi nhận',
  [LoveLanguageType.B]: 'Hành động phục vụ',
  [LoveLanguageType.C]: 'Nhận quà',
  [LoveLanguageType.D]: 'Thời gian chất lượng',
  [LoveLanguageType.E]: 'Tiếp xúc đụng chạm',
}

export const LoveLanguageQuestions = [
  {
    id: 1,
    text: 'Nhóm 1',
    answers: [
      {
        text: 'Một ai đó khen khi bạn làm điều gì đó tốt.',
        type: LoveLanguageType.A,
      },
      {
        text: 'Một ai đó bất ngờ dọn dẹp phòng của bạn khiến bạn rất cảm kích.',
        type: LoveLanguageType.B,
      },
      {
        text: 'Một ai đó bất ngờ mua đồ ăn bên ngoài về cho bạn.',
        type: LoveLanguageType.C,
      },
      {
        text: 'Một ai đó thể hiện cảm xúc phù hợp khi nghe những gì bạn chia sẻ.',
        type: LoveLanguageType.D,
      },
      {
        text: 'Một ai đó tìm cách ôm bạn hay bắt tay bạn trước khi đi ra ngoài.',
        type: LoveLanguageType.E,
      },
    ],
  },
  {
    id: 2,
    text: 'Nhóm 2',
    answers: [
      {
        text: 'Một ai đó nói họ thật cảm kích và biết ơn bạn vì một điều ý nghĩa bạn đã làm.',
        type: LoveLanguageType.A,
      },
      {
        textMale:
          'Nam:  Một ai đó tự nguyện đi sửa xe hay giặt đồ cho bạn và bảo bạn hãy nghỉ ngơi.',
        textFemale:
          'Nữ:  Một ai đó xung phong rửa chén giùm bạn và bảo bạn hãy nghỉ ngơi.',
        type: LoveLanguageType.B,
      },
      {
        textMale: 'Nam:  Một ai đó mua món ăn đặc biệt về cho bạn.',
        textFemale: 'Nữ:  Một ai đó tặng quà để thể hiện sự quan tâm đến bạn.',
        type: LoveLanguageType.C,
      },
      {
        text: 'Một ai đó bảo bạn ngồi kể cho họ nghe về công việc trong ngày của bạn.',
        type: LoveLanguageType.D,
      },
      {
        text: 'Một ai đó ôm bạn, đụng vào bạn hoặc quàng vai khi có dịp đi ngang qua bạn.',
        type: LoveLanguageType.E,
      },
    ],
  },
  {
    id: 3,
    text: 'Nhóm 3',
    answers: [
      {
        text: 'Một ai đó kể về thành tựu gần đây của bạn trong một buổi tiệc có nhiều người.',
        type: LoveLanguageType.A,
      },
      {
        text: 'Một ai đó giúp bạn sửa chữa đồ đạc hư trong nhà giúp bạn.',
        type: LoveLanguageType.B,
      },
      {
        text: 'Một ai đó tự tay chuẩn bị một món quà đặc biệt chỉ dành riêng cho bạn.',
        type: LoveLanguageType.C,
      },
      {
        text: 'Một ai đó luôn ngưng Facebook, điện thoại… để lắng nghe bạn khi bạn cần họ.',
        type: LoveLanguageType.D,
      },
      {
        text: 'Một ai đó quàng vai bạn, dựa vào, cầm tay khi đi trong siêu thị hay ở nơi công cộng.',
        type: LoveLanguageType.E,
      },
    ],
  },
  {
    id: 4,
    text: 'Nhóm 4',
    answers: [
      {
        text: 'Một ai đó khen bạn về một trong những phẩm chất đặc biệt của bạn.',
        type: LoveLanguageType.A,
      },
      {
        text: 'Một ai đó nấu cháo hay mua thuốc cho bạn khi bạn bị đau.',
        type: LoveLanguageType.B,
      },
      {
        text: 'Một ai đó bất ngờ tặng bạn một món đồ bạn đã thích từ rất lâu mà chưa mua được.',
        type: LoveLanguageType.C,
      },
      {
        text: 'Một ai đó hẹn riêng với bạn để cùng ra ngoài chơi, dạo, uống nước, nói chuyện.',
        type: LoveLanguageType.D,
      },
      {
        text: 'Một ai đó thân mật nói chuyện với bạn – “tay bắt mặt mừng” thay vì đứng xa xa trò chuyện.',
        type: LoveLanguageType.E,
      },
    ],
  },
  {
    id: 5,
    text: 'Nhóm 5',
    answers: [
      {
        text: 'Một ai đó nói cho bạn biết họ thích bạn nhiều như thế nào.',
        type: LoveLanguageType.A,
      },
      {
        text: 'Một ai đó dành thời gian để giúp bạn hoàn tất một công việc rất phức tạp mà bạn mong gắng  làm xong trong đêm.',
        type: LoveLanguageType.B,
      },
      {
        text: 'Một ai đó gởi cho bạn một món quà đặc biệt, chuyển đến tận nhà.',
        type: LoveLanguageType.C,
      },
      {
        text: 'Một ai đó “bắt cóc” bạn đi ăn trưa và đưa bạn đến nhà hàng bạn yêu thích nhất.',
        type: LoveLanguageType.D,
      },
      { text: 'Một ai đó mát-xa cho bạn.', type: LoveLanguageType.E },
    ],
  },
]

import { giftQuestionsRaw } from '@/data/gift-questions.raw'

export {
  DISC_SCALE_LABELS,
  DISC_STORAGE_KEYS,
  DiscType,
  discSections,
} from '@/constants/disc'
export {
  GIFT_REQUIRED_MESSAGE,
  GIFT_SCALE_LABELS,
  GIFT_STORAGE_KEYS,
  GiftTitle,
  GiftType,
  NEXT_GEN_GIFT_SCALE_LABELS,
} from '@/constants/gift'
export {
  LOVE_LANGUAGE_SCALE_LABELS,
  LOVE_LANGUAGE_STORAGE_KEYS,
} from '@/constants/love-language'
export { NEXT_GEN_GIFT_STORAGE_KEYS } from '@/constants/next-gen-gift'

import type { GiftType } from '@/constants/gift'

export const giftQuestions = giftQuestionsRaw.map((question) => ({
  id: question.id,
  text: question.text,
  type: question.giftIndex as GiftType,
}))

export enum NextGenGiftType {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
}

export const NextGenGiftTitle = {
  [NextGenGiftType.A]: 'Quản trị/Điều phối',
  [NextGenGiftType.B]: 'Sứ đồ',
  [NextGenGiftType.C]: 'Hội hoạ/Thủ Công',
  [NextGenGiftType.D]: 'Nhận biết',
  [NextGenGiftType.E]: 'Truyền giáo',
  [NextGenGiftType.F]: 'Khích lệ/Cổ vũ',
  [NextGenGiftType.G]: 'Âm nhạc',
  [NextGenGiftType.H]: 'Ban cho',
  [NextGenGiftType.I]: 'Chữa lành',
  [NextGenGiftType.J]: 'Phục vụ/Giúp đỡ',
  [NextGenGiftType.K]: 'Tiếp khách',
  [NextGenGiftType.L]: 'Cầu nguyện/Cầu thay',
  [NextGenGiftType.M]: 'Hiểu biết',
  [NextGenGiftType.N]: 'Lãnh đạo',
  [NextGenGiftType.O]: 'Nhân đức/Thương xót',
  [NextGenGiftType.P]: 'Phép lạ',
  [NextGenGiftType.Q]: 'Chăn bầy/Mục sư',
  [NextGenGiftType.R]: 'Tiên tri',
  [NextGenGiftType.S]: 'Viết lách',
  [NextGenGiftType.T]: 'Dạy dỗ',
  [NextGenGiftType.U]: 'Tiếng lạ',
  [NextGenGiftType.V]: 'Khôn ngoan',
}

export const nextGenGiftQuestions = [
  {
    id: 1,
    text: 'Em thích tham gia vào việc tổ chức các chương trình và sự kiện để phục vụ thân thể Chúa.',
    type: NextGenGiftType.A,
  },
  {
    id: 2,
    text: 'Em khá hào hứng khi nghe về việc bắt đầu những Hội Thánh mới.',
    type: NextGenGiftType.B,
  },
  {
    id: 3,
    text: 'Làm việc bằng đôi tay để tạo ra những vật dụng đem vinh hiển cho Chúa là niềm vui của em.',
    type: NextGenGiftType.C,
  },
  {
    id: 4,
    text: 'Em hầu như cảm nhận được khi một ai đó không thành thật.',
    type: NextGenGiftType.D,
  },
  {
    id: 5,
    text: 'Em đã từng chia sẻ và hướng dẫn người khác đi đến quyết định tin nhận Chúa.',
    type: NextGenGiftType.E,
  },
  {
    id: 6,
    text: 'Việc khích lệ người khác là một ưu tiên quan trọng trong cuộc sống của em.',
    type: NextGenGiftType.F,
  },
  {
    id: 7,
    text: 'Những bài nhạc thánh ca luôn nâng đỡ tâm linh em, khiến em muốn ngợi khen Chúa.',
    type: NextGenGiftType.G,
  },
  {
    id: 8,
    text: 'Em có thể chia sẻ những gì mình có vì em biết Đức Chúa Trời sẽ đáp ứng mọi nhu cầu của em.',
    type: NextGenGiftType.H,
  },
  {
    id: 9,
    text: 'Em rất sẵn lòng khi có cơ hội cầu nguyện cho những người đau ốm.',
    type: NextGenGiftType.I,
  },
  {
    id: 10,
    text: 'Em yêu thích phục vụ ở hậu trường.',
    type: NextGenGiftType.J,
  },
  {
    id: 11,
    text: 'Em vui và chào đón bất kỳ ai đến thăm gia đình em.',
    type: NextGenGiftType.K,
  },
  {
    id: 12,
    text: 'Em thích dành thời gian cầu nguyện cho người khác.',
    type: NextGenGiftType.L,
  },
  {
    id: 13,
    text: 'Em nói những lẽ thật thuộc linh mà người khác xác nhận rằng đã giúp họ đến gần với Chúa hơn.',
    type: NextGenGiftType.M,
  },
  {
    id: 14,
    text: 'Em thích kêu gọi người khác tham gia vào các hoạt động phục vụ.',
    type: NextGenGiftType.N,
  },
  {
    id: 15,
    text: 'Em cảm thấy rất buồn khi thấy người khác bị tổn thương.',
    type: NextGenGiftType.O,
  },
  {
    id: 16,
    text: 'Em tin rằng Đức Chúa Trời sẽ sử dụng em để cầu nguyện và kinh nghiệm được phép lạ của Ngài.',
    type: NextGenGiftType.P,
  },
  {
    id: 17,
    text: 'Em cảm thấy có trách nhiệm giúp đỡ những Cơ Đốc nhân yếu đuối tránh khỏi những điều nguy hiểm.',
    type: NextGenGiftType.Q,
  },
  {
    id: 18,
    text: 'Đôi khi trong một hoàn cảnh nào đó mà em nghe, em có thể cảm nhận được lời Chúa phù hợp với người đó.',
    type: NextGenGiftType.R,
  },
  {
    id: 19,
    text: 'Người khác nói rằng những gì em viết làm cho họ rất được khích lệ.',
    type: NextGenGiftType.S,
  },
  {
    id: 20,
    text: 'Em rất vui khi giải thích Lời Chúa cho người khác.',
    type: NextGenGiftType.T,
  },
  {
    id: 21,
    text: 'Em có thể nói chuyện với Chúa bằng một ngôn ngữ mà em chưa hề học.',
    type: NextGenGiftType.U,
  },
  {
    id: 22,
    text: 'Khi ai đó gặp vấn đề, em có thể hướng dẫn họ theo những giải pháp trong Kinh Thánh.',
    type: NextGenGiftType.V,
  },
  {
    id: 23,
    text: 'Em có thể phục vụ người khác bằng cách tổ chức và sắp xếp khả năng mỗi người vào phần việc thích hợp.',
    type: NextGenGiftType.A,
  },
  {
    id: 24,
    text: 'Em thích xung phong, đi đầu trong các dự án mục vụ mới.',
    type: NextGenGiftType.B,
  },
  {
    id: 25,
    text: 'Em thích dùng tay mình làm ra những sản phẩm để phục vụ Chúa hoặc gửi tặng người khác.',
    type: NextGenGiftType.C,
  },
  {
    id: 26,
    text: 'Em có thể cảm nhận rõ ràng khi ai đó được Đức Thánh Linh cảm động hay bị tác động bởi một suy nghĩ xác thịt.',
    type: NextGenGiftType.D,
  },
  {
    id: 27,
    text: 'Em rất cưu mang chia sẻ cho những người chưa tin Chúa để họ được cứu rỗi.',
    type: NextGenGiftType.E,
  },
  {
    id: 28,
    text: 'Em rất thích khích lệ người khác yêu mến Chúa hơn.',
    type: NextGenGiftType.F,
  },
  {
    id: 29,
    text: 'Em thấy rất tự do và thoả mãn mỗi lúc được hát, nhảy hoặc chơi nhạc để ngợi khen Chúa.',
    type: NextGenGiftType.G,
  },
  {
    id: 30,
    text: 'Em tìm nhiều cách để dâng hiến và lạc hiến vượt quá khả năng của mình.',
    type: NextGenGiftType.H,
  },
  {
    id: 31,
    text: 'Em tin rằng sự chữa lành kỳ diệu của Chúa vẫn diễn ra trong thời đại ngày nay.',
    type: NextGenGiftType.I,
  },
  {
    id: 32,
    text: 'Khi phục vụ Chúa, em không muốn nhiều người biết hay ghi nhận.',
    type: NextGenGiftType.J,
  },
  {
    id: 33,
    text: 'Tạo nên một không gian ấm áp để chào đón những người đến nhà là điều quan trọng với em.',
    type: NextGenGiftType.K,
  },
  {
    id: 34,
    text: 'Khi nghe nhu cầu của ai đó, em có thể cầu nguyện cho điều đó suốt mấy ngày.',
    type: NextGenGiftType.L,
  },
  {
    id: 35,
    text: 'Em có thể nắm bắt và hiểu nhanh những phần nội dung khó trong Kinh Thánh.',
    type: NextGenGiftType.M,
  },
  {
    id: 36,
    text: 'Em sẵn sàng dẫn dắt và lãnh đạo một đội nhóm khi cần thiết.',
    type: NextGenGiftType.N,
  },
  {
    id: 37,
    text: 'Em cảm thấy thương cảm và muốn thăm viếng ở các trại mồ côi, bệnh viện...',
    type: NextGenGiftType.O,
  },
  {
    id: 38,
    text: 'Đức Chúa Trời đã sử dụng em để cầu nguyện cho những điều phi thường.',
    type: NextGenGiftType.P,
  },
  {
    id: 39,
    text: 'Em cảm nhận rằng Chúa muốn em làm lãnh đạo thuộc linh của một nhóm nhỏ.',
    type: NextGenGiftType.Q,
  },
  {
    id: 40,
    text: 'Người khác nói rằng em thường có những lời nói đúng lúc cho họ, khích lệ họ rất nhiều trong Lời Chúa.',
    type: NextGenGiftType.R,
  },
  {
    id: 41,
    text: 'Em thích thể hiện tình yêu của mình với Chúa bằng cách làm thơ, sáng tác nhạc và viết suy ngẫm.',
    type: NextGenGiftType.S,
  },
  {
    id: 42,
    text: 'Em chia sẻ lẽ thật Kinh thánh với hy vọng người khác sẽ tăng trưởng cá nhân.',
    type: NextGenGiftType.T,
  },
  {
    id: 43,
    text: 'Đôi khi khi cầu nguyện, em cảm nhận Đức Thánh Linh đến và cầu nguyện qua em bằng những từ ngữ mà em không hiểu.',
    type: NextGenGiftType.U,
  },
  {
    id: 44,
    text: 'Khi đọc Kinh Thánh, Đức Chúa Trời ban cho em những nhận biết sâu sắc và đặc biệt.',
    type: NextGenGiftType.V,
  },
  {
    id: 45,
    text: 'Em dễ dàng lập kế hoạch chi tiết và phân công các nhiệm vụ phù hợp cho nhóm làm việc.',
    type: NextGenGiftType.A,
  },
  {
    id: 46,
    text: 'Em không e dè hay sợ hãi khi dẫn dắt người khác bắt đầu một phần việc mới hoặc dự án mục vụ mới.',
    type: NextGenGiftType.B,
  },
  {
    id: 47,
    text: 'Việc làm nên một sản phẩm mỹ thuật bằng đôi tay của mình là điều rất thích thú đối với em.',
    type: NextGenGiftType.C,
  },
  {
    id: 48,
    text: 'Em có thể nhanh chóng nhận ra khi điều một người dạy khi điều đó không đúng với Lời Chúa.',
    type: NextGenGiftType.D,
  },
  {
    id: 49,
    text: 'Em rất hào hứng khi chia sẻ Phúc âm với người hoàn toàn xa lạ.',
    type: NextGenGiftType.E,
  },
  {
    id: 50,
    text: 'Em tự tin và mạnh mẽ trong việc khích lệ người đang bị buồn bã, nản lòng, hoang mang.',
    type: NextGenGiftType.F,
  },
  {
    id: 51,
    text: 'Nhiều người nói rằng họ cảm động khi em hát, múa hay chơi nhạc.',
    type: NextGenGiftType.G,
  },
  {
    id: 52,
    text: 'Em nỗ lực tìm cách chia sẻ vật chất với người khác mà không chú tâm nhiều đến nhu cầu của mình.',
    type: NextGenGiftType.H,
  },
  {
    id: 53,
    text: 'Đức Chúa Trời đã sử dụng em để mang đến sự chữa lành cho những người đau ốm.',
    type: NextGenGiftType.I,
  },
  {
    id: 54,
    text: 'Đôi khi Chúa nhắc em làm một việc nhỏ thôi nhưng cũng khiến người nhận được điều đó rất cảm động.',
    type: NextGenGiftType.J,
  },
  {
    id: 55,
    text: 'Em có khả năng làm cho những người mới gặp cảm thấy tự nhiên và dễ chịu, như ở nhà.',
    type: NextGenGiftType.K,
  },
  {
    id: 56,
    text: 'Có người nói rằng Chúa nhậm lời em cầu nguyện cho họ cách kỳ diệu.',
    type: NextGenGiftType.L,
  },
  {
    id: 57,
    text: 'Em được người khác nhìn nhận là người có cái nhìn sâu sắc.',
    type: NextGenGiftType.M,
  },
  {
    id: 58,
    text: 'Em phân công các nhiệm vụ để nhóm có thể hoàn thành công việc một cách hiệu quả.',
    type: NextGenGiftType.N,
  },
  {
    id: 59,
    text: 'Em yêu thích đồng hành với người khác trong giai đoạn khó khăn.',
    type: NextGenGiftType.O,
  },
  {
    id: 60,
    text: 'Thánh Linh hướng dẫn em cầu nguyện cho những điều không thể thành hiện thực.',
    type: NextGenGiftType.P,
  },
  {
    id: 61,
    text: 'Chúa cho em khả năng nói và trình bày lẽ thật thuộc linh một cách rõ ràng và mạnh mẽ.',
    type: NextGenGiftType.Q,
  },
  {
    id: 62,
    text: 'Đôi khi em biết chính xác điều Chúa muốn em làm trong một công tác vào một thời điểm nào đó.',
    type: NextGenGiftType.R,
  },
  {
    id: 63,
    text: 'Đôi khi em thích viết những cảm nghĩ về Chúa hơn là nói.',
    type: NextGenGiftType.S,
  },
  {
    id: 64,
    text: 'Em khao khát biết chi tiết về Kinh Thánh và giúp người khác hiểu Kinh Thánh.',
    type: NextGenGiftType.T,
  },
  {
    id: 65,
    text: 'Cầu nguyện trong Thánh Linh là sự khích lệ lớn và rất quan trọng đối với em.',
    type: NextGenGiftType.U,
  },
  {
    id: 66,
    text: 'Em thường có cảm nhận rõ nên chọn phương án nào trong một số hoàn cảnh tưởng chừng như rất khó khăn.',
    type: NextGenGiftType.V,
  },
]
