export enum QuestionBarType {
  LoveLanguage,
  Gift
}

export const enum LoveLanguageType {
  A,
  B,
  C,
  D,
  E
}

export const LoveLanguageTitle = {
  [LoveLanguageType.A]: 'Lời nói ghi nhận',
  [LoveLanguageType.B]: 'Hành động phục vụ',
  [LoveLanguageType.C]: 'Nhận quà',
  [LoveLanguageType.D]: 'Thời gian chất lượng',
  [LoveLanguageType.E]: 'Tiếp xúc đụng chạm'
};

export const LoveLanguageQuestions = [
  {
    id: 1,
    text: 'Nhóm 1',
    answers: [
      {
        text: 'Một ai đó khen khi bạn làm điều gì đó tốt.',
        type: LoveLanguageType.A
      },
      {
        text: 'Một ai đó bất ngờ dọn dẹp phòng của bạn khiến bạn rất cảm kích.',
        type: LoveLanguageType.B
      },
      {
        text: 'Một ai đó bất ngờ mua đồ ăn bên ngoài về cho bạn.',
        type: LoveLanguageType.C
      },
      {
        text: 'Một ai đó thể hiện cảm xúc phù hợp khi nghe những gì bạn chia sẻ.',
        type: LoveLanguageType.D
      },
      {
        text: 'Một ai đó tìm cách ôm bạn hay bắt tay bạn trước khi đi ra ngoài.',
        type: LoveLanguageType.E
      }
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
      {
        text: 'Một ai đó bảo bạn ngồi kể cho họ nghe về công việc trong ngày của bạn.',
        type: LoveLanguageType.D
      },
      {
        text: 'Một ai đó ôm bạn, đụng vào bạn hoặc quàng vai khi có dịp đi ngang qua bạn.',
        type: LoveLanguageType.E
      }
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
      {
        text: 'Một ai đó giúp bạn sửa chữa đồ đạc hư trong nhà giúp bạn.',
        type: LoveLanguageType.B
      },
      {
        text: 'Một ai đó tự tay chuẩn bị một món quà đặc biệt chỉ dành riêng cho bạn.',
        type: LoveLanguageType.C
      },
      {
        text: 'Một ai đó luôn ngưng Facebook, điện thoại… để lắng nghe bạn khi bạn cần họ.',
        type: LoveLanguageType.D
      },
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
      {
        text: 'Một ai đó khen bạn về một trong những phẩm chất đặc biệt của bạn.',
        type: LoveLanguageType.A
      },
      {
        text: 'Một ai đó nấu cháo hay mua thuốc cho bạn khi bạn bị đau.',
        type: LoveLanguageType.B
      },
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
      {
        text: 'Một ai đó nói cho bạn biết họ thích bạn nhiều như thế nào.',
        type: LoveLanguageType.A
      },
      {
        text: 'Một ai đó dành thời gian để giúp bạn hoàn tất một công việc rất phức tạp mà bạn mong gắng  làm xong trong đêm.',
        type: LoveLanguageType.B
      },
      {
        text: 'Một ai đó gởi cho bạn một món quà đặc biệt, chuyển đến tận nhà.',
        type: LoveLanguageType.C
      },
      {
        text: 'Một ai đó “bắt cóc” bạn đi ăn trưa và đưa bạn đến nhà hàng bạn yêu thích nhất.',
        type: LoveLanguageType.D
      },
      { text: 'Một ai đó mát-xa cho bạn.', type: LoveLanguageType.E }
    ]
  }
];

export const enum GiftType {
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
  W,
  X,
  Y,
  Z,
  AA,
  AB
}

export const GiftTitle = {
  [GiftType.A]: 'Quản trị /Điều phối',
  [GiftType.B]: 'Sứ đồ',
  [GiftType.C]: 'Độc thân',
  [GiftType.D]: 'Thủ công /Hội họa',
  [GiftType.E]: 'Phân biệt các linh',
  [GiftType.F]: 'Khích lệ',
  [GiftType.G]: 'Truyền giáo',
  [GiftType.H]: 'Vận động/Cổ vũ',
  [GiftType.I]: 'Đức tin',
  [GiftType.J]: 'Ban cho',
  [GiftType.K]: 'Chữa lành',
  [GiftType.L]: 'Giúp đỡ/Phục vụ',
  [GiftType.M]: 'Tiếp khách',
  [GiftType.N]: 'Cầu nguyện/Cầu thay',
  [GiftType.O]: 'Hiểu biết',
  [GiftType.P]: 'Lãnh đạo',
  [GiftType.Q]: 'Nhân đức/Thương xót',
  [GiftType.R]: 'Phép lạ',
  [GiftType.S]: 'Giáo sĩ',
  [GiftType.T]: 'Âm nhạc',
  [GiftType.U]: 'Chăn bầy',
  [GiftType.V]: 'Nghèo vì nước Đức Chúa Trời',
  [GiftType.W]: 'Tiên tri',
  [GiftType.X]: 'Dạy dỗ',
  [GiftType.Y]: 'Tiếng lạ (thông giải)',
  [GiftType.Z]: 'Tiếng lạ (nói/cầu nguyện)',
  [GiftType.AA]: 'Khôn ngoan',
  [GiftType.AB]: 'Viết lách'
};

export const giftQuestions = [
  {
    id: 1,
    text: 'Người ta thường đến với tôi khi họ cần giúp đỡ trong những hoàn cảnh khốn khó và tôi có thể giới thiệu họ đến với một mục vụ có thể giúp đỡ họ được.',
    type: GiftType.A
  },
  {
    id: 2,
    text: 'Tôi cảm thấy được thúc đẩy để đứng lên bảo vệ đức tin của mình trong sự bắt bớ, chống đối.',
    type: GiftType.B
  },
  {
    id: 3,
    text: 'Tôi đồng cảm với Phao-lô về vì tôi cũng khao khát nhiều người sẽ dành trọn thời gian cuộc đời mình để hầu việc Chúa, không lập gia đình.',
    type: GiftType.C
  },
  {
    id: 4,
    text: 'Tôi thích dùng khả năng nghệ thuật của mình để tạo ra những thứ đem vinh hiển đến cho Đức Chúa Trời.',
    type: GiftType.D
  },
  {
    id: 5,
    text: 'Tôi rất dễ nhận ra ai đó có thành thật hay không.',
    type: GiftType.E
  },
  {
    id: 6,
    text: 'Tôi đã từng nói lời hy vọng mà Đức Chúa Trời đã xác nhận cho người khác bởi Đức Thánh Linh.',
    type: GiftType.F
  },
  {
    id: 7,
    text: 'Tôi bị thu hút đến với những người chưa tin Chúa vì tôi khao khát chinh phục họ về cho Đấng Christ.',
    type: GiftType.G
  },
  {
    id: 8,
    text: 'Tôi đã khuyên bảo những người khác nên tìm kiếm những giải pháp trong Kinh Thánh cho sự hoạn nạn hay đau đớn của mình.',
    type: GiftType.H
  },
  {
    id: 9,
    text: 'Tôi nắm chặt niềm tin cá nhân của tôi vào chân lý mặc ai chê cười hay nhìn tôi như người thất bại.',
    type: GiftType.I
  },
  {
    id: 10,
    text: 'Tôi có thể ban cho cách rời rộng vì tôi biết Đức Chúa Trời sẽ đáp ứng mọi nhu cầu của tôi.',
    type: GiftType.J
  },
  {
    id: 11,
    text: 'Tôi cảm nhận mạnh mẽ rằng những lời cầu nguyện cho một người bệnh ảnh hưởng đến toàn diện trên người đó.',
    type: GiftType.K
  },
  {
    id: 12,
    text: 'Khi tôi phục vụ Chúa, tôi thực sự không muốn ai biết hay ghi nhận.',
    type: GiftType.L
  },
  {
    id: 13,
    text: 'Nhà của tôi luôn rộng mở cho bất kỳ ai Chúa đem đến cho chúng tôi.',
    type: GiftType.M
  },
  {
    id: 14,
    text: 'Tôi thấy mình vừa làm việc hay vừa đi vừa cầu nguyện với Chúa mà mình không hay.',
    type: GiftType.N
  },
  {
    id: 15,
    text: 'Tôi có những sự nhận biết lẽ thật thuộc linh mà người khác nói đã giúp họ gần với Chúa hơn.',
    type: GiftType.O
  },
  {
    id: 16,
    text: 'Những người khác sẵn sàng theo sự hướng dẫn của tôi để hoàn tất những công việc trong Hội thánh.',
    type: GiftType.P
  },
  {
    id: 17,
    text: 'Tôi thấy rất thương cảm khi ai đó có vấn đề.',
    type: GiftType.Q
  },
  {
    id: 18,
    text: 'Tôi tin rằng Đức Chúa Trời có thể thay đổi hoàn cảnh một cách kỳ diệu.',
    type: GiftType.R
  },
  {
    id: 19,
    text: 'Tôi có thể liên hệ tốt với những người đến từ bối cảnh văn hóa khác nhau.',
    type: GiftType.S
  },
  {
    id: 20,
    text: 'Nhạc thánh luôn nâng tâm linh tôi lên và khiến tôi muốn ngợi khen và thờ phượng Chúa.',
    type: GiftType.T
  },
  {
    id: 21,
    text: 'Tôi có một tấm lòng muốn giúp đỡ những Cơ Đốc nhân bị lạc lối.',
    type: GiftType.U
  },
  {
    id: 22,
    text: 'Tôi chọn cách sống đơn giản để tôi có nhiều thời gian và tiền bạc hơn để phục vụ Chúa.',
    type: GiftType.V
  },
  {
    id: 23,
    text: 'Đôi khi tôi cảm thấy tôi biết chính xác điều Chúa muốn tôi làm trong một mục vụ vào một thời điểm nào đó.',
    type: GiftType.W
  },
  {
    id: 24,
    text: 'Học Kinh Thánh và chia sẻ những điều mình học được với người khác làm tôi thấy rất thỏa mãn.',
    type: GiftType.X
  },
  {
    id: 25,
    text: 'Tôi đã thông giải tiếng lạ để giúp đỡ người khác thờ phượng Chúa cách thông suốt.',
    type: GiftType.Y
  },
  {
    id: 26,
    text: 'Đôi khi tôi cầu nguyện, dường như Đức Thánh Linh đến và cầu nguyện qua tôi bằng những từ mà tôi không hiểu.',
    type: GiftType.Z
  },
  {
    id: 27,
    text: 'Tôi cảm nhận sự hiện diện lạ thường của Đức Chúa Trời và sự tin quyết trong những lúc có những quyết định quan trọng.',
    type: GiftType.AA
  },
  {
    id: 28,
    text: 'Đôi khi tôi thể hiện tình yêu của mình đối với Đức Chúa Trời bằng cách làm thơ, sáng tác nhạc, viết lời cầu nguyện hay ghi lại những bài học suy gẫm về Chúa.',
    type: GiftType.AB
  },
  {
    id: 29,
    text: 'Tôi là người chịu trách nhiệm hướng dẫn công việc trong Hội thánh để đem lại kết quả cho công việc.',
    type: GiftType.A
  },
  {
    id: 30,
    text: 'Tôi cảm nhận Đức Chúa Trời đã kêu gọi tôi đi ra lập Hội thánh mới nơi người ta chưa nghe về Phúc âm.',
    type: GiftType.B
  },
  { id: 31, text: 'Tôi độc thân và tôi rất thích điều này.', type: GiftType.C },
  {
    id: 32,
    text: 'Tôi thích làm cho người khác những món quà mà có thể nhắc họ về Chúa.',
    type: GiftType.D
  },
  {
    id: 33,
    text: 'Tôi có thể cảm nhận được một ai đó được Đức Thánh Linh cảm động hay một linh nào đó tác động hay do xác thịt mình dẫn dắt.',
    type: GiftType.E
  },
  {
    id: 34,
    text: 'Khích lệ cho những người đang nản lòng làm cho tôi vui lắm.',
    type: GiftType.F
  },
  {
    id: 35,
    text: 'Tôi đã từng hướng dẫn người khác đến quyết định tin nhận Chúa để có sự cứu rỗi.',
    type: GiftType.G
  },
  {
    id: 36,
    text: 'Tôi có thể thách thức những người khác mà không sợ người ta lên án hay bực bội.',
    type: GiftType.H
  },
  {
    id: 37,
    text: 'Tôi hoàn toàn được thuyết phục rằng Đức Chúa Trời sẽ hoàn thành lời Ngài phán với chúng ta dù hiện tại Ngài chưa làm điều đó.',
    type: GiftType.I
  },
  {
    id: 38,
    text: 'Đức Chúa Trời đã dùng tôi để đáp ứng nhu cầu vật chất hay tài chính cho người khác.',
    type: GiftType.J
  },
  {
    id: 39,
    text: 'Khi tôi cầu nguyện cho người bệnh, hoặc người đó hay là tôi cảm nhận sự nóng cháy và rạo rực trong lòng.',
    type: GiftType.K
  },
  {
    id: 40,
    text: 'Đôi khi Chúa Thánh Linh mách bảo tôi làm một việc rất nhỏ thôi nhưng cũng khiến cho người đón nhận được cảm động sâu sắc.',
    type: GiftType.L
  },
  {
    id: 41,
    text: 'Tôi rất thích chào đón và thăm hỏi những người đến trong Hội thánh hay gia đình của tôi.',
    type: GiftType.M
  },
  {
    id: 42,
    text: 'Tôi dường như có thể nhận ra sự cầu nguyện quan trọng hơn những điều khác.',
    type: GiftType.N
  },
  {
    id: 43,
    text: 'Tôi có thể hiểu những phần Lời Chúa khó hiểu trong Kinh Thánh.',
    type: GiftType.O
  },
  {
    id: 44,
    text: 'Tôi có thể phân công công việc cho những người khác để hoàn tất công việc Chúa.',
    type: GiftType.P
  },
  {
    id: 45,
    text: 'Tôi có một khao khát làm việc với những người có vấn đề sức khỏe và trí óc để xoa dịu nỗi đau của họ.',
    type: GiftType.Q
  },
  {
    id: 46,
    text: 'Người khác có thể kinh nghiệm lời cầu nguyện của tôi đã dẫn đến những kết quả trong những điều không thể.',
    type: GiftType.R
  },
  {
    id: 47,
    text: 'Tôi sẽ sẵn sàng từ bỏ những gì an toàn thoải mái của mình để có thể chia sẻ Phúc âm của Chúa cho nhiều người khác.',
    type: GiftType.S
  },
  {
    id: 48,
    text: 'Việc hát, nhảy hoặc chơi nhạc ngợi khen Chúa cho vui làm cho cá nhân tôi rất thỏa mãn.',
    type: GiftType.T
  },
  {
    id: 49,
    text: 'Đức Chúa Trời đã bày tỏ những bông trái trong cuộc đời tôi về lĩnh vực môn đồ hóa những tín hữu khác.',
    type: GiftType.U
  },
  {
    id: 50,
    text: 'Khao khát của tôi về sự giàu có tâm linh luôn cao hơn tham vọng về tiền bạc, của cải.',
    type: GiftType.V
  },
  {
    id: 51,
    text: 'Có khi tôi có một cảm nhận rất mạnh mẽ về điều Đức Chúa Trời muốn nói với người khác trong một hoàn cảnh nào đó.',
    type: GiftType.W
  },
  {
    id: 52,
    text: 'Người ta nói tôi có thể giúp họ nhận ra những lẽ thật Kinh Thánh.',
    type: GiftType.X
  },
  {
    id: 53,
    text: 'Đôi khi có người nói tiếng lạ, tôi hiểu được ý Chúa đang muốn nói trong tiếng lạ đó.',
    type: GiftType.Y
  },
  {
    id: 54,
    text: 'Tôi có thể nói chuyện với Chúa bằng một ngôn ngữ mà tôi chưa hề học bao giờ.',
    type: GiftType.Z
  },
  {
    id: 55,
    text: 'Đôi khi Chúa cho tôi một ý niệm về điều mà một ai đó nên làm.',
    type: GiftType.AA
  },
  {
    id: 56,
    text: 'Tôi có thể lấy những vấn đề thuộc linh phức tạp và viết chúng xuống cách dễ hiểu đối với tất cả mọi người.',
    type: GiftType.AB
  },
  {
    id: 57,
    text: 'Tôi có thể phục vụ người khác bằng cách tổ chức và sắp xếp ân tứ của họ đúng chỗ để giải quyết vấn đề.',
    type: GiftType.A
  },
  {
    id: 58,
    text: 'Tôi không e dè hay sợ hãi khi dẫn dắt người khác đi đến nơi mà Chúa muốn họ đi.',
    type: GiftType.B
  },
  {
    id: 59,
    text: 'Tôi rất vui vì có nhiều thời gian để hầu việc Chúa, độc thân mà.',
    type: GiftType.C
  },
  {
    id: 60,
    text: 'Tôi thích dùng tay mình làm ra những sản phẩm phục vụ Chúa.',
    type: GiftType.D
  },
  {
    id: 61,
    text: 'Tôi có thể nhận ra sự thật và dối trá rất dễ.',
    type: GiftType.E
  },
  {
    id: 62,
    text: 'Tôi có thể tích cực thúc đẩy người khác tham gia vào chức vụ.',
    type: GiftType.F
  },
  {
    id: 63,
    text: 'Tôi hình như có thể xác định được khi Đức Thánh Linh chuẩn bị lòng một ai đó để tiếp nhận Chúa Jêsus.',
    type: GiftType.G
  },
  {
    id: 64,
    text: 'Người ta có thể tin tưởng tôi được vì họ biết tôi luôn đứng về phía họ.',
    type: GiftType.H
  },
  {
    id: 65,
    text: 'Niềm hy vọng của tôi ở trong Đức Chúa Trời, mặc cho bao nhiêu sự trở ngại thì suy nghĩ về niềm hy vọng đó luôn làm tôi mạnh mẽ.',
    type: GiftType.I
  },
  {
    id: 66,
    text: 'Tôi sẵn sàng duy trì nếp sống dưới mức tiêu chuẩn để công việc Chúa được ích lợi.',
    type: GiftType.J
  },
  {
    id: 67,
    text: 'Tôi thích cầu nguyện cho người bệnh vì tôi biết nhiều người trong số họ sẽ được chữa lành.',
    type: GiftType.K
  },
  {
    id: 68,
    text: 'Tôi thích làm những công việc thường lệ để giúp ích cho chức vụ hiệu quả.',
    type: GiftType.L
  },
  {
    id: 69,
    text: 'Tôi muốn khiến mọi người cảm thấy được chào đón và thoải mái trong chương trình thông công của Hội thánh hay trong các hoạt động xã hội.',
    type: GiftType.M
  },
  {
    id: 70,
    text: 'Khi nghe một nhu cầu cầu nguyện của ai đó, tôi có thể cầu nguyện cho điều đó suốt mấy ngày kế tiếp.',
    type: GiftType.N
  },
  {
    id: 71,
    text: 'Qua học tập và kinh nghiệm, tôi có thể nhận ra những chiến lược chủ đạo mà dường như Đức Chúa Trời đang sử dụng để mở mang Vương quốc của Ngài.',
    type: GiftType.O
  },
  {
    id: 72,
    text: 'Đức Chúa Trời đã cho tôi một khả năng để huy động nhiều người giúp đỡ cho người nào đó.',
    type: GiftType.P
  },
  {
    id: 73,
    text: 'Tôi thích dành thời gian cho người đang đau khổ hoặc đang trong tù tội.',
    type: GiftType.Q
  },
  {
    id: 74,
    text: 'Đức Chúa Trời đã sử dụng tôi để bày tỏ những phép lạ siêu nhiên.',
    type: GiftType.R
  },
  {
    id: 75,
    text: 'Suy nghĩ về việc mở một Hội thánh mới trong một cộng đồng mới làm tôi hào hứng.',
    type: GiftType.S
  },
  {
    id: 76,
    text: 'Người ta nói họ thấy tình yêu Chúa Jêsus trên gương mặt tôi khi tôi hát, nhảy và chơi nhạc cụ.',
    type: GiftType.T
  },
  {
    id: 77,
    text: 'Tôi cảm thấy tôi có trách nhiệm giúp đỡ những Cơ Đốc nhân yếu đuối khỏi những tác động nguy hiểm.',
    type: GiftType.U
  },
  {
    id: 78,
    text: 'Nhà to, xe đẹp, hay tài khoản nhiều tiền không quan trọng đối với tôi.',
    type: GiftType.V
  },
  {
    id: 79,
    text: 'Đôi khi tôi có một khao khát cháy bỏng muốn nói Lời Chúa mặc dù tôi biết nhiều người không đón nhận.',
    type: GiftType.W
  },
  {
    id: 80,
    text: 'Dạy lớp Kinh Thánh là một trong những việc thích thúc nhất.',
    type: GiftType.X
  },
  {
    id: 81,
    text: 'Khi những người khác cầu nguyện tiếng lạ, tôi cảm thấy tôi hiểu ý nghĩa họ cầu nguyện.',
    type: GiftType.Y
  },
  {
    id: 82,
    text: 'Cầu nguyện tiếng lạ là một điều ý nghĩa đối với tôi trong đời sống cầu nguyện cá nhân của mình.',
    type: GiftType.Z
  },
  {
    id: 83,
    text: 'Khi một người có một vấn đề, tôi thường có thể dẫn dắt người đó đến với những giải pháp mà Kinh Thánh đề cập đến.',
    type: GiftType.AA
  },
  {
    id: 84,
    text: 'Tôi thích việc học Lời Chúa và viết xuống những gì tôi học được.',
    type: GiftType.AB
  },
  {
    id: 85,
    text: 'Tôi có thể nhận ra khả năng và ân tứ trong người khác và tìm cách sử dụng những ân tứ đó cho Chúa.',
    type: GiftType.A
  },
  {
    id: 86,
    text: 'Đức Chúa Trời có đặt để tôi trong vị trí lãnh đạo một nhóm nhỏ trong Hội thánh.',
    type: GiftType.B
  },
  {
    id: 87,
    text: 'Tôi độc thân và tôi không có nhu cầu gì về vấn đề tình dục cả.',
    type: GiftType.C
  },
  {
    id: 88,
    text: 'Tôi có thể bày tỏ vinh quang sáng tạo của Đức Chúa Trời qua nghệ thuật.',
    type: GiftType.D
  },
  {
    id: 89,
    text: 'Tôi có thể nhận ra rõ ràng lẽ thật hay sự lừa dối sau một câu phát biểu thần học nào đó.',
    type: GiftType.E
  },
  {
    id: 90,
    text: 'Tôi tự tin, mạnh mẽ khích lệ người đang dao động, buồn khổ hay nản lòng.',
    type: GiftType.F
  },
  {
    id: 91,
    text: 'Tôi có thể nâng đỡ những người chưa tin Chúa tốt hơn là những người đã tin Chúa rồi.',
    type: GiftType.G
  },
  {
    id: 92,
    text: 'Việc khích lệ một ai đó để người ta có cam kết thuộc linh cao hơn khiến tôi rất thích.',
    type: GiftType.H
  },
  {
    id: 93,
    text: 'Tôi sẵn sàng thử những điều không thể vì tôi có một lòng tin rất lớn nơi Chúa.',
    type: GiftType.I
  },
  {
    id: 94,
    text: 'Tôi có thể cảm nhận mạnh mẽ Đức Thánh Linh đang dẫn dắt tôi để tôi giúp đỡ tài chính cho một người nào đó hay một dự án nào đó.',
    type: GiftType.J
  },
  {
    id: 95,
    text: 'Đôi khi tôi có một cảm nhận mạnh mẽ rằng Đức Chúa Trời muốn chữa lành cho ai đó qua những lời cầu nguyện hay lời nói của tôi.',
    type: GiftType.K
  },
  {
    id: 96,
    text: 'Tôi thích làm những công việc âm thầm hơn là những việc mà ai cũng biết đến.',
    type: GiftType.L
  },
  {
    id: 97,
    text: 'Tôi không thấy khó chịu khi ai đó tiện đường ghé thăm mà không nói trước gì cả',
    type: GiftType.M
  },
  {
    id: 98,
    text: 'Cầu nguyện cho người khác là một trong những cách yêu thích của tôi trong việc sử dụng thời gian của mình',
    type: GiftType.N
  },
  {
    id: 99,
    text: 'Đôi khi tôi cảm thấy tôi biết những điều mà tôi chưa học đến bao giờ. Những người lớn cũng thấy điều này từ tôi',
    type: GiftType.O
  },
  {
    id: 100,
    text: 'Động viên người khác làm việc lớn hơn cho Chúa thật khiến tôi rất phấn khích và đầy hứng thú',
    type: GiftType.P
  },
  {
    id: 101,
    text: 'Tôi thích đi thăm viếng ở bệnh viện hay trại mồ côi và cảm thấy mình làm tốt mục vụ này',
    type: GiftType.Q
  },
  {
    id: 102,
    text: 'Đức Thánh Linh hướng dẫn tôi cầu nguyện cho những điều không thể trở thành sự thật',
    type: GiftType.R
  },
  {
    id: 103,
    text: 'Ao ước lớn nhất của tôi đó là được nhìn thấy nhiều dân tộc ở các quốc gia khác được chinh phục cho Chúa',
    type: GiftType.S
  },
  {
    id: 104,
    text: 'Nhiều người nói với tôi rằng họ được cảm động khi tôi hát, múa hay chơi nhạc',
    type: GiftType.T
  },
  {
    id: 105,
    text: 'Tôi cảm nhận Chúa kêu gọi tôi làm người lãnh đạo thuộc linh của một nhóm nhỏ',
    type: GiftType.U
  },
  {
    id: 106,
    text: 'Tôi không ghen tị với ai có nhiều của cải vật chất hơn tôi',
    type: GiftType.V
  },
  {
    id: 107,
    text: 'Người khác nói tôi thường có những lời nói rất đúng lúc cho họ, những điều đó chắc chắn phải từ Chúa cho',
    type: GiftType.W
  },
  {
    id: 108,
    text: 'Tôi dành nhiều thời gian để học những lẽ thật Kinh Thánh để chia sẻ lại cho người khác',
    type: GiftType.X
  },
  {
    id: 109,
    text: 'Khi tôi nghe người khác nói tiếng lạ, tôi thấy mình có trách nhiệm phải giải thích ý nghĩa thông điệp đó',
    type: GiftType.Y
  },
  {
    id: 110,
    text: 'Khi tôi nói một thông điệp tiếng lạ, tôi mong là có ai đó sẽ thông giải thông điệp ấy',
    type: GiftType.Z
  },
  {
    id: 111,
    text: 'Tôi cảm thấy tôi có một cảm nhận đặc biệt trong việc lựa chọn phương pháp tốt nhất cho những hoàn cảnh khó khăn',
    type: GiftType.AA
  },
  {
    id: 112,
    text: 'Người khác nói họ được cảm động về những gì tôi viết',
    type: GiftType.AB
  },
  {
    id: 113,
    text: 'Đôi khi người khác đến với tôi để xin được hướng dẫn tổ chức, điều phối chương trình',
    type: GiftType.A
  },
  {
    id: 114,
    text: 'Đức Chúa Trời đã sử dụng tôi để đem Phúc âm đến với những người chưa từng nghe về Chúa',
    type: GiftType.B
  },
  {
    id: 115,
    text: 'Tôi độc thân và thấy không hứng thú về việc kết hôn',
    type: GiftType.C
  },
  {
    id: 116,
    text: 'Tôi cảm thấy có trách nhiệm dùng tay mình để tạo ra những vật bày tỏ vẽ đẹp tạo dựng của Chúa',
    type: GiftType.D
  },
  {
    id: 117,
    text: 'Tôi có thể nhanh chóng nhận ra điều một người dạy có đúng với Lời Chúa không',
    type: GiftType.E
  },
  {
    id: 118,
    text: 'Những người cảm thấy mệt mỏi đôi lúc đến với tôi để được an ủi',
    type: GiftType.F
  },
  {
    id: 119,
    text: 'Tôi thấy bực bội với những sự dạy dỗ không nhấn mạnh sự cứu rỗi',
    type: GiftType.G
  },
  {
    id: 120,
    text: 'Tôi có thể đồng cảm với sự yếu đuối và cám dỗ để khích lệ người khác ăn năn và tin Chúa',
    type: GiftType.H
  },
  {
    id: 121,
    text: 'Tôi đã tin cậy Đức Chúa Trời cho những điều không thể và thấy điều đó xảy ra một cách ngoạn mục',
    type: GiftType.I
  },
  {
    id: 122,
    text: 'Tôi nỗ lực tìm cách ban cho người khác mà không chú tâm nhiều đến nhu cầu của chính mình',
    type: GiftType.J
  },
  {
    id: 123,
    text: 'Tôi đã cầu nguyện cho người bệnh và sự chữa lành thực sự đã xảy ra',
    type: GiftType.K
  },
  {
    id: 124,
    text: 'Nếu ai đó đối diện với khủng hoảng nghiêm trọng, tôi thích được giúp đỡ họ',
    type: GiftType.L
  },
  {
    id: 125,
    text: 'Khi ai đó đến nhà tôi, họ thường thấy thoải mái như ở nhà',
    type: GiftType.M
  },
  {
    id: 126,
    text: 'Đã có người nói với tôi rằng lời cầu nguyện của tôi dành cho họ đã được Chúa nhậm lời cách kỳ diệu',
    type: GiftType.N
  },
  {
    id: 127,
    text: 'Chúa cho tôi những lời để nói trong những lúc đi làm chứng về Chúa mà chính tôi cũng ngạc nhiên',
    type: GiftType.O
  },
  {
    id: 128,
    text: 'Tôi có thể thúc đẩy người khác vâng phục Chúa qua đời sống tin kính của chính mình',
    type: GiftType.P
  },
  {
    id: 129,
    text: 'Đôi khi tôi rất cảm động và xúc cảm cho hoàn cảnh người mà tôi đang cầu nguyện',
    type: GiftType.Q
  },
  {
    id: 130,
    text: 'Người ta nói với tôi rằng tôi là một công cụ của Đức Chúa Trời để đem sự thay đổi siêu nhiên trong những cuộc đời hay hoàn cảnh sống',
    type: GiftType.R
  },
  {
    id: 131,
    text: 'Tôi rất bị thu hút bởi những người đến từ đất nước, sắc tộc khác, và tôi liên hệ với họ rất tốt',
    type: GiftType.S
  },
  {
    id: 132,
    text: 'Tôi thích sử dụng ân tứ âm nhạc để hát, nhảy, hoặc đàn nhạc thánh, không thích dùng những điều đó cho nhạc đời',
    type: GiftType.T
  },
  {
    id: 133,
    text: 'Chúa đã cho tôi khả năng dạy và giảng lẽ thật thuộc linh',
    type: GiftType.U
  },
  {
    id: 134,
    text: 'Tôi cảm thấy tôi có thể hoàn thành sự kêu gọi của Chúa tốt nhất trên cuộc đời mình qua cách sống thật giản dị',
    type: GiftType.V
  },
  {
    id: 135,
    text: 'Đức Chúa Trời đã bày tỏ cho tôi những điều sẽ xảy ra trong tương lai',
    type: GiftType.W
  },
  {
    id: 136,
    text: 'Tôi cảm thấy tôi có thể truyền đạt những lẽ thật Kinh Thánh cho người khác và thấy sự thay đổi trong sự hiểu biết về Chúa, giá trị sống hoặc thái độ sống của người nghe',
    type: GiftType.X
  },
  {
    id: 137,
    text: 'Sự thông giải tiếng lạ của tôi đã được những người tín hữu trưởng thành xác nhận',
    type: GiftType.Y
  },
  {
    id: 138,
    text: 'Khi tôi cầu nguyện tiếng lạ, tôi tin rằng điều đó sẽ gây dựng nhóm của tôi',
    type: GiftType.Z
  },
  {
    id: 139,
    text: 'Những người có vấn đề thuộc linh thường đến với tôi để xin được khuyên bảo hoặc tư vấn',
    type: GiftType.AA
  },
  {
    id: 140,
    text: 'Đôi khi tôi thích viết xuống những cảm nghĩ của tôi về Chúa hơn là chia sẻ điều đó cho người khác.',
    type: GiftType.AB
  }
];
