"use client";
import dynamic from "next/dynamic";

const ARViewer = dynamic(() => import("./_components/ARviewer"), {
  ssr: false,
});

export default function ARPage() {
  return <ARViewer imageUrl={""} />;
}
