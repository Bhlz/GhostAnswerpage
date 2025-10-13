import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GhostAnswer — La IA invisible",
  description: "Respuestas donde miras. Sin cambiar de ventana.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
