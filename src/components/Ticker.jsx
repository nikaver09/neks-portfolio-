const items = ["REACT", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "PRODUCT DESIGN", "MOTION", "SYSTEMS THINKING"];

export default function Ticker() {
  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-label="Core skills">
      <div className="ticker__track">
        {loop.map((item, index) => <span key={`${item}-${index}`}>{item}<b>✳</b></span>)}
      </div>
    </div>
  );
}
