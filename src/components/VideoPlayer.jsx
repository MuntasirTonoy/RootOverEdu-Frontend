export default function VideoPlayer({ url, title }) {
  return (
    <div className="w-full">
      <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
        <iframe
          src={url}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-white mb-2">{title}</h2>
    </div>
  );
}
