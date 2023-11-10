export const formatMessageDate = (data: Date) => {
  return new Date(data).toLocaleString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};
