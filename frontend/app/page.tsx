import Footer from "@/components/Footer";
import Results from "@/components/Results";
import UploadForm from "@/components/UploadForm";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <UploadForm />
      <Results />
      <Footer />
    </div>
  );
}
