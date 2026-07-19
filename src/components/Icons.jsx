import churrascoImg from "../assets/churrasco.jpg";
const iconProps = {
  width: 48,
  height: 48,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Icons = {
  tabua: () => (
    <svg {...iconProps}>
      <rect x="8" y="12" width="32" height="24" rx="2" />
      <circle cx="24" cy="8" r="2.4" />
      <path d="M24 10.4V12" />
      <path d="M16 22h16M16 27h10" strokeDasharray="1.5 3" />
    </svg>
  ),
  copo: () => (
    <svg {...iconProps}>
      <path d="M14 10h20l-2 26a3 3 0 0 1-3 2.8H19a3 3 0 0 1-3-2.8L14 10Z" />
      <path d="M14 10 13 6h22l-1 4" />
      <path d="M18 20h12" strokeDasharray="1.5 3" />
    </svg>
  ),
  chaveiro: () => (
    <svg {...iconProps}>
      <circle cx="16" cy="14" r="5.5" />
      <path d="M20 18l16 16" />
      <path d="M31 29l4 4M35.5 24.5l4 4" />
      <path d="M14.5 12.5l3 3" strokeDasharray="1.2 2.4" />
    </svg>
  ),
  faca: () => (
    <svg {...iconProps}>
      <path d="M10 34 32 12a4 4 0 0 1 5.6 5.6L15.6 39.6a3 3 0 0 1-4.2 0l-1-1a3 3 0 0 1 0-4.2Z" />
      <path d="M8 38l4-4" />
      <path d="M20 24l4 4" strokeDasharray="1.5 3" />
    </svg>
  ),
  medicina: () => (
    <svg {...iconProps}>
      <path d="M14 8v14a8 8 0 0 0 16 0V8" />
      <circle cx="36" cy="30" r="4.5" />
      <path d="M30 22c0 4-4 4-4 8" />
      <path d="M18 8h-4M34 8h-4" strokeDasharray="1.5 3" />
    </svg>
  ),
  odonto: () => (
    <svg {...iconProps}>
      <path d="M24 10c-5 0-8 3-8 8 0 6 2 9 2.5 14 .3 2.6 4 2.8 4.3 0 .3-3 1-4.6 1.2-4.6.2 0 .9 1.6 1.2 4.6.3 2.8 4 2.6 4.3 0C29.5 27 32 24 32 18c0-5-3-8-8-8Z" />
      <path d="M20 15c1.3-1 2.7-1 4-1" strokeDasharray="1.2 2.4" />
    </svg>
  ),
  churrasco: () => (
  <img
    src={churrascoImg}
    alt="Kit Churrasco"
    className="product-image"
  />
),
};
