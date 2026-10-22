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
        text: 'Một ai đó thể hiện cảm xúc phù hợp khi nghe bạn chia sẻ.',
        type: LoveLanguageType.D,
      },
      {
        text: 'Một ai đó chào đón hoặc tạm biệt bạn bằng một cái bắt tay, cái ôm hoặc cử chỉ gần gũi phù hợp.',
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
          'Nam: Một ai đó tự nguyện đi sửa xe hay giặt đồ cho bạn và bảo bạn hãy nghỉ ngơi.',
        textFemale:
          'Nữ: Một ai đó xung phong rửa chén giùm bạn và bảo bạn hãy nghỉ ngơi.',
        type: LoveLanguageType.B,
      },
      {
        textMale: 'Nam: Một ai đó mua món ăn đặc biệt về cho bạn.',
        textFemale: 'Nữ: Một ai đó tặng quà để thể hiện sự quan tâm đến bạn.',
        type: LoveLanguageType.C,
      },
      {
        text: 'Một ai đó bảo bạn ngồi kể cho họ nghe về công việc trong ngày của bạn.',
        type: LoveLanguageType.D,
      },
      {
        text: 'Một ai đó vỗ vai hoặc ôm để khích lệ bạn.',
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
        text: 'Một ai đó luôn ngưng dùng điện thoại và các hoạt động khác để lắng nghe bạn khi bạn cần họ.',
        type: LoveLanguageType.D,
      },
      {
        text: 'Một ai đó quàng vai, khoác tay bạn khi đi trong siêu thị hay ở nơi công cộng.',
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
        text: 'Một ai đó ngồi gần trò chuyện, thể hiện sự gần gũi khiến bạn cảm thấy được quan tâm.',
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
        text: 'Một ai đó dành thời gian để giúp bạn hoàn tất một công việc rất phức tạp mà bạn đang cố gắng hoàn tất trong đêm.',
        type: LoveLanguageType.B,
      },
      {
        text: 'Một ai đó gửi cho bạn một món quà đặc biệt, chuyển đến tận nhà.',
        type: LoveLanguageType.C,
      },
      {
        text: 'Một ai đó bất ngờ mời bạn đi ăn và chọn nơi bạn yêu thích.',
        type: LoveLanguageType.D,
      },
      { text: 'Một ai đó mát-xa cho bạn.', type: LoveLanguageType.E },
    ],
  },
]

import { giftQuestionsRaw } from '@/data/gift-questions'

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
}

export const NextGenGiftTitle = {
  [NextGenGiftType.A]: 'Quản trị',
  [NextGenGiftType.B]: 'Sứ đồ',
  [NextGenGiftType.C]: 'Thủ công/Chế tác',
  [NextGenGiftType.D]: 'Sáng tạo nghệ thuật',
  [NextGenGiftType.E]: 'Phân định thuộc linh',
  [NextGenGiftType.F]: 'Dâng hiến',
  [NextGenGiftType.G]: 'Khích lệ',
  [NextGenGiftType.H]: 'Chia sẻ Phúc Âm',
  [NextGenGiftType.I]: 'Đức tin',
  [NextGenGiftType.J]: 'Hỗ trợ tương trợ',
  [NextGenGiftType.K]: 'Tiếp khách',
  [NextGenGiftType.L]: 'Cầu thay',
  [NextGenGiftType.M]: 'Hiểu biết',
  [NextGenGiftType.N]: 'Lãnh đạo',
  [NextGenGiftType.O]: 'Thương xót',
  [NextGenGiftType.P]: 'Nói tiên tri',
  [NextGenGiftType.Q]: 'Chăn bầy',
  [NextGenGiftType.R]: 'Giảng dạy',
  [NextGenGiftType.S]: 'Khôn ngoan',
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
    text: 'Em thích dùng nhiều hình thức nghệ thuật để giúp người khác suy nghĩ sâu hơn về Đức Chúa Trời.',
    type: NextGenGiftType.D,
  },
  {
    id: 5,
    text: 'Em hầu như cảm nhận được khi một ai đó không thành thật.',
    type: NextGenGiftType.E,
  },
  {
    id: 6,
    text: 'Em có thể chia sẻ những gì mình có vì em biết Đức Chúa Trời sẽ đáp ứng mọi nhu cầu của em.',
    type: NextGenGiftType.F,
  },
  {
    id: 7,
    text: 'Việc khích lệ người khác là một ưu tiên quan trọng trong cuộc sống của em.',
    type: NextGenGiftType.G,
  },
  {
    id: 8,
    text: 'Em đã từng chia sẻ và hướng dẫn người khác đi đến quyết định tin nhận Chúa.',
    type: NextGenGiftType.H,
  },
  {
    id: 9,
    text: 'Việc tin cậy Đức Chúa Trời đáp lời cầu nguyện là phản ứng tự nhiên của em trước sự việc gì đó.',
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
    text: 'Em cam kết dành thời gian đều đặn để đọc và nghiên cứu Kinh Thánh nhằm hiểu lẽ thật cách đầy đủ và chính xác.',
    type: NextGenGiftType.M,
  },
  {
    id: 14,
    text: 'Em thích khích lệ người khác tham gia vào các hoạt động phục vụ.',
    type: NextGenGiftType.N,
  },
  {
    id: 15,
    text: 'Em cảm thấy rất buồn khi thấy người khác bị tổn thương.',
    type: NextGenGiftType.O,
  },
  {
    id: 16,
    text: 'Đôi khi trong một hoàn cảnh nào đó mà em nghe, em có thể cảm nhận được Lời Chúa phù hợp với người đó.',
    type: NextGenGiftType.P,
  },
  {
    id: 17,
    text: 'Em cảm thấy có trách nhiệm giúp đỡ những Cơ Đốc nhân yếu đuối tránh khỏi những điều nguy hiểm.',
    type: NextGenGiftType.Q,
  },
  {
    id: 18,
    text: 'Em sẵn sàng dành thời gian học hỏi và nghiên cứu vì biết rằng việc trình bày lẽ thật sẽ đem lại sự thay đổi trong đời sống con người.',
    type: NextGenGiftType.R,
  },
  {
    id: 19,
    text: 'Khi ai đó gặp vấn đề, em có thể hướng dẫn họ theo những giải pháp trong Kinh Thánh.',
    type: NextGenGiftType.S,
  },
  {
    id: 20,
    text: 'Em có thể phục vụ người khác bằng cách tổ chức và sắp xếp khả năng mỗi người vào phần việc thích hợp.',
    type: NextGenGiftType.A,
  },
  {
    id: 21,
    text: 'Em thích xung phong, đi đầu trong các dự án mục vụ mới.',
    type: NextGenGiftType.B,
  },
  {
    id: 22,
    text: 'Em thích dùng tay mình làm ra những sản phẩm để phục vụ Chúa hoặc gửi tặng người khác.',
    type: NextGenGiftType.C,
  },
  {
    id: 23,
    text: 'Em thích phát triển và sử dụng khả năng nghệ thuật của mình (mỹ thuật, kịch, âm nhạc, nhiếp ảnh...).',
    type: NextGenGiftType.D,
  },
  {
    id: 24,
    text: 'Em có thể cảm nhận rõ ràng khi ai đó được Đức Thánh Linh cảm động hay bị tác động bởi một suy nghĩ xác thịt.',
    type: NextGenGiftType.E,
  },
  {
    id: 25,
    text: 'Em tìm nhiều cách để dâng hiến và lạc hiến vượt quá khả năng của mình.',
    type: NextGenGiftType.F,
  },
  {
    id: 26,
    text: 'Em rất thích khích lệ người khác yêu mến Chúa hơn.',
    type: NextGenGiftType.G,
  },
  {
    id: 27,
    text: 'Em rất cưu mang chia sẻ cho những người chưa tin Chúa để họ được cứu rỗi.',
    type: NextGenGiftType.H,
  },
  {
    id: 28,
    text: 'Em tin rằng Đức Chúa Trời sẽ giúp em hoàn thành những công việc lớn lao.',
    type: NextGenGiftType.I,
  },
  {
    id: 29,
    text: 'Khi phục vụ Chúa, em không muốn nhiều người biết hay ghi nhận.',
    type: NextGenGiftType.J,
  },
  {
    id: 30,
    text: 'Tạo nên một không gian ấm áp để chào đón những người đến nhà là điều quan trọng với em.',
    type: NextGenGiftType.K,
  },
  {
    id: 31,
    text: 'Khi nghe nhu cầu của ai đó, em có thể cầu nguyện cho điều đó suốt mấy ngày.',
    type: NextGenGiftType.L,
  },
  {
    id: 32,
    text: 'Nhiều khi bỗng nhiên em nhận được một sự dạy dỗ nào đó rất đặc biệt, đến với lòng mình.',
    type: NextGenGiftType.M,
  },
  {
    id: 33,
    text: 'Em sẵn sàng dẫn dắt và lãnh đạo một đội nhóm khi cần thiết.',
    type: NextGenGiftType.N,
  },
  {
    id: 34,
    text: 'Em cảm thấy thương cảm và muốn thăm viếng ở các trại mồ côi, bệnh viện,...',
    type: NextGenGiftType.O,
  },
  {
    id: 35,
    text: 'Người khác nói rằng em thường có những lời nói đúng lúc cho họ, khích lệ họ rất nhiều trong Lời Chúa.',
    type: NextGenGiftType.P,
  },
  {
    id: 36,
    text: 'Em thích dành thời gian chăm sóc và nuôi dưỡng đời sống tinh thần, thuộc linh của người khác.',
    type: NextGenGiftType.Q,
  },
  {
    id: 37,
    text: 'Em có thể dành nhiều thời gian học hỏi những lẽ thật sâu sắc từ Kinh Thánh để chia sẻ lại cho người khác.',
    type: NextGenGiftType.R,
  },
  {
    id: 38,
    text: 'Khi đọc Kinh Thánh, Đức Chúa Trời ban cho em những nhận biết sâu sắc và đặc biệt.',
    type: NextGenGiftType.S,
  },
  {
    id: 39,
    text: 'Em dễ dàng lập kế hoạch chi tiết và phân công các nhiệm vụ phù hợp cho nhóm làm việc.',
    type: NextGenGiftType.A,
  },
  {
    id: 40,
    text: 'Em không e dè hay sợ hãi khi dẫn dắt người khác bắt đầu một phần việc mới hoặc dự án mục vụ mới.',
    type: NextGenGiftType.B,
  },
  {
    id: 41,
    text: 'Em có kỹ năng sử dụng nhiều loại công cụ, dụng cụ khác nhau.',
    type: NextGenGiftType.C,
  },
  {
    id: 42,
    text: 'Em thích tìm ra những cách thức mới mẻ và sáng tạo để truyền đạt lẽ thật của Đức Chúa Trời.',
    type: NextGenGiftType.D,
  },
  {
    id: 43,
    text: 'Em có thể nhanh chóng nhận ra khi điều một người dạy mà điều đó không đúng với Lời Chúa.',
    type: NextGenGiftType.E,
  },
  {
    id: 44,
    text: 'Em nỗ lực tìm cách chia sẻ vật chất với người khác mà không chú tâm nhiều đến nhu cầu của mình.',
    type: NextGenGiftType.F,
  },
  {
    id: 45,
    text: 'Em tự tin và mạnh mẽ trong việc khích lệ người đang bị buồn bã, nản lòng, hoang mang.',
    type: NextGenGiftType.G,
  },
  {
    id: 46,
    text: 'Em rất hào hứng khi chia sẻ Phúc Âm với người hoàn toàn xa lạ.',
    type: NextGenGiftType.H,
  },
  {
    id: 47,
    text: 'Em có thể cảm nhận Đức Chúa Trời hiện diện và hành động mỗi ngày trong đời sống em.',
    type: NextGenGiftType.I,
  },
  {
    id: 48,
    text: 'Đôi khi Chúa nhắc em làm một việc nhỏ thôi nhưng cũng khiến người nhận được điều đó rất cảm động.',
    type: NextGenGiftType.J,
  },
  {
    id: 49,
    text: 'Em có khả năng làm cho những người mới gặp cảm thấy tự nhiên và dễ chịu, như ở nhà.',
    type: NextGenGiftType.K,
  },
  {
    id: 50,
    text: 'Có người nói rằng Chúa nhậm lời em cầu nguyện cho họ cách kỳ diệu.',
    type: NextGenGiftType.L,
  },
  {
    id: 51,
    text: 'Em được người khác nhìn nhận là người có cái nhìn sâu sắc.',
    type: NextGenGiftType.M,
  },
  {
    id: 52,
    text: 'Em có thể phân công các nhiệm vụ để nhóm có thể hoàn thành công việc một cách hiệu quả.',
    type: NextGenGiftType.N,
  },
  {
    id: 53,
    text: 'Em yêu thích đồng hành với người khác trong giai đoạn khó khăn.',
    type: NextGenGiftType.O,
  },
  {
    id: 54,
    text: 'Khi nhận thấy tội lỗi, em cảm thấy thôi thúc phải nói ra và kêu gọi người phạm tội ăn năn.',
    type: NextGenGiftType.P,
  },
  {
    id: 55,
    text: 'Em có thể trung tín nâng đỡ và quan tâm đến người khác cách lâu dài.',
    type: NextGenGiftType.Q,
  },
  {
    id: 56,
    text: 'Em có thể trình bày kiến thức hoặc kỹ năng cách dễ hiểu, giúp người khác áp dụng vào đời sống.',
    type: NextGenGiftType.R,
  },
  {
    id: 57,
    text: 'Em thường có cảm nhận rõ nên chọn phương án nào trong một số hoàn cảnh tưởng chừng như rất khó khăn.',
    type: NextGenGiftType.S,
  },
]
