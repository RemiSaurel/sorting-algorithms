export default function ElementGrid({nbItems}: {nbItems: number}) {
  return (
    <div className="flex gap-2">
        {Array.from(Array(nbItems).keys()).map((item) => (
            <div className="element border-2 border-cyan-700 text-2xl w-12 h-12 text-center flex items-center justify-center" key={item}>
              <span>
                {item}
              </span>
            </div>
        ))}
    </div>
  );
}