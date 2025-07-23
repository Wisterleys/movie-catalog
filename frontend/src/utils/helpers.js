
export const formatDate = (dateString) => {
  if (!dateString) return 'Data desconhecida';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export const formatRuntime = (minutes) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getTrailerKey = (videos) => {
  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  console.log('Trailer found:', trailer,videos);
  return trailer?.key || videos[0]?.key;
};