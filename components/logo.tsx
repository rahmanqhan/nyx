import nyxLogo from "@/assets/nyx.webp";

export function Logo({ size = 30}: { size?: number }) {
  return (
    <img
      src={nyxLogo}
      alt="NYX"
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      style={{ display: "block" }}
    />
  );
}
