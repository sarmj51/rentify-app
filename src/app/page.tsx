import Image from "next/image";
import { FooterComponent } from "./components/FooterComponent/FooterComponent";
import { HeaderComponent } from "./components/HeaderComponent/HeaderComponent";
import LoginPage from "./login/page";
import PropertiesPage from "./properties/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex">
        <div className="container"> 
          <PropertiesPage />
        </div>

      </main>
    </div>
  );
}
