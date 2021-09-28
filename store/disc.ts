export const enum DiscType {
  D,
  I,
  S,
  C
}

export const DiscTitle = {
  [DiscType.D]: 'Dominance',
  [DiscType.I]: 'Influence',
  [DiscType.S]: 'Steadiness',
  [DiscType.C]: 'Compliance'
};

export const questions = [
  {
    id: 1,
    answers: [
      { text: 'Mạnh bạo', type: DiscType.D },
      { text: 'Biểu lộ cảm xúc', type: DiscType.I },
      { text: 'Dè dặt', type: DiscType.S },
      { text: 'Cẩn thận', type: DiscType.C } ]
  },
  {
    id: 2,
    answers: [
      { text: 'Tiên phong', type: DiscType.D },
      { text: 'Dễ cảm xúc', type: DiscType.I },
      { text: 'Thỏa mãn', type: DiscType.S },
      { text: 'Chính xác', type: DiscType.C } ]
  },
  {
    id: 3,
    answers: [
      { text: 'Dạn dĩ', type: DiscType.D },
      { text: 'Đầy sức sống', type: DiscType.I },
      { text: 'Sẵn lòng', type: DiscType.S },
      { text: 'Tỉ mỉ', type: DiscType.C } ]
  },
  {
    id: 4,
    answers: [
      { text: 'Cứng đầu', type: DiscType.D },
      { text: 'Khó đoán trước', type: DiscType.I },
      { text: 'Do dự', type: DiscType.S },
      { text: 'Rụt rè', type: DiscType.C } ]
  },
  {
    id: 5,
    answers: [
      { text: 'Quyết tâm', type: DiscType.D },
      { text: 'Thích giao du', type: DiscType.I },
      { text: 'Nhẫn nại', type: DiscType.S },
      { text: 'Cung kính, trang trọng', type: DiscType.C } ]
  },
  {
    id: 6,
    answers: [
      { text: 'Đáng tin cậy', type: DiscType.D },
      { text: 'Đầy thuyết phục', type: DiscType.I },
      { text: 'Hòa nhã', type: DiscType.S },
      { text: 'Hợp tác', type: DiscType.C } ]
  },
  {
    id: 7,
    answers: [
      { text: 'Kiên quyết', type: DiscType.D },
      { text: 'Thích tiệc tùng, hội họp', type: DiscType.I },
      { text: 'Điềm đạm', type: DiscType.S },
      { text: 'Thận trọng', type: DiscType.C } ]
  },
  {
    id: 8,
    answers: [
      { text: 'Quyết đoán', type: DiscType.D },
      { text: 'Được nhiều người  ưa thích', type: DiscType.I },
      { text: 'Rộng lượng', type: DiscType.S },
      { text: 'Người theo thuyết hoàn hảo', type: DiscType.C } ]
  },
  {
    id: 9,
    answers: [
      { text: 'Thích tranh luận', type: DiscType.D },
      { text: 'Khó đoán trước', type: DiscType.I },
      { text: 'Ít quả quyết', type: DiscType.S },
      { text: 'Mắc cỡ', type: DiscType.C } ]
  },
  {
    id: 10,
    answers: [
      { text: 'Kiên trì', type: DiscType.D },
      { text: 'Lạc quan', type: DiscType.I },
      { text: 'Có ích, sẵn sàng giúp đỡ', type: DiscType.S },
      { text: 'Dễ chịu', type: DiscType.C } ]
  },
  {
    id: 11,
    answers: [
      { text: 'Tích cực', type: DiscType.D },
      { text: 'Nói nhiều', type: DiscType.I },
      { text: 'Thân thiện', type: DiscType.S },
      { text: 'Khiêm nhường', type: DiscType.C } ]
  },
  {
    id: 12,
    answers: [
      { text: 'Cứng rắn, kiên quyết', type: DiscType.D },
      { text: 'Khôi hài, hài hước', type: DiscType.I },
      { text: 'Dễ gần gũi', type: DiscType.S },
      { text: 'Hay giúp người', type: DiscType.C } ]
  },
  {
    id: 13,
    answers: [
      { text: 'Thích mạo hiểm', type: DiscType.D },
      { text: 'Duyên', type: DiscType.I },
      { text: 'Kiên định, trước sau như một', type: DiscType.S },
      { text: 'Có kỷ luật', type: DiscType.C } ]
  },
  {
    id: 14,
    answers: [
      { text: 'Xông xáo', type: DiscType.D },
      { text: 'Thu hút', type: DiscType.I },
      { text: 'Ít hài hước', type: DiscType.S },
      { text: 'Dịu dàng', type: DiscType.C } ]
  },
  {
    id: 15,
    answers: [
      { text: 'Quyết tâm', type: DiscType.D },
      { text: 'Nhiệt tình', type: DiscType.I },
      { text: 'Cảm thông', type: DiscType.S },
      { text: 'Có hệ thống', type: DiscType.C } ]
  },
  {
    id: 16,
    answers: [
      { text: 'Độc đoán', type: DiscType.D },
      { text: 'Thiếu kiên định', type: DiscType.I },
      { text: 'Từ từ', type: DiscType.S },
      { text: 'Hay phê bình', type: DiscType.C } ]
  },
  {
    id: 17,
    answers: [
      { text: 'Cá tính mạnh', type: DiscType.D },
      { text: 'Khí thế', type: DiscType.I },
      { text: 'Thoải mái, không trang trọng', type: DiscType.S },
      { text: 'Nhạy bén', type: DiscType.C } ]
  },
  {
    id: 18,
    answers: [
      { text: 'Độc lập', type: DiscType.D },
      { text: 'Có sức  thuyết phục', type: DiscType.I },
      { text: 'Tử tế', type: DiscType.S },
      { text: 'Ngăn nắp, gọn gàng', type: DiscType.C } ]
  },
  {
    id: 19,
    answers: [
      { text: 'Trực tính', type: DiscType.D },
      { text: 'Nhiều người biết', type: DiscType.I },
      { text: 'Phấn khởi, hớn hở', type: DiscType.S },
      { text: 'Lý tưởng', type: DiscType.C } ]
  },
  {
    id: 20,
    answers: [
      { text: 'Thiếu kiên nhẫn', type: DiscType.D },
      { text: 'Phô trương', type: DiscType.I },
      { text: 'Thiếu mục đích', type: DiscType.S },
      { text: 'Thay đổi bất chợt', type: DiscType.C } ]
  },
  {
    id: 21,
    answers: [
      { text: 'Cạnh tranh', type: DiscType.D },
      { text: 'Tự nhiên, không gò bó', type: DiscType.I },
      { text: 'Trung thành', type: DiscType.S },
      { text: 'Chu đáo', type: DiscType.C } ]
  },
  {
    id: 22,
    answers: [
      { text: 'Can đảm', type: DiscType.D },
      { text: 'Rất thuyết phục', type: DiscType.I },
      { text: 'Ý tứ', type: DiscType.S },
      { text: 'Hy sinh quên mình', type: DiscType.C } ]
  },
  {
    id: 23,
    answers: [
      { text: 'Không khéo  cư xử', type: DiscType.D },
      { text: 'Dễ thay đổi', type: DiscType.I },
      { text: 'Lo lắng và sợ hãi', type: DiscType.S },
      { text: 'Bi quan', type: DiscType.C } ]
  },
  {
    id: 24,
    answers: [
      { text: 'Tháo vát', type: DiscType.D },
      { text: 'Khuấy động, hào hứng', type: DiscType.I },
      { text: 'Chịu đựng', type: DiscType.S },
      { text: 'Bảo thủ,  cổ điển', type: DiscType.C } ]
  }
];

