import { useState } from "react";

import { Monitor, Cpu, MemoryStick, Mouse, Headphones, Square } from "lucide-react";

import GpuIcon from "@/components/icons/GpuIcon";

import KeyboardIcon from "@/components/icons/KeyboardIcon";

import CardSectionIcon from "@/components/CardSectionIcon";



// --- Custom Icons ---



const EarbudsIcon = ({ size = 18, className = "" }) => (

  <img

    src="earphones2.svg"

    alt="Earbuds"

    width={size}

    height={size}

    className={`object-contain opacity-70 ${className}`}

  />

);



// --- Data ---



const pcSpecs = [

  { icon: Cpu, label: "CPU", value: "Ryzen 5 5600" },

  { icon: GpuIcon, label: "GPU", value: "RX 6600" },

  { icon: MemoryStick, label: "RAM", value: "16GB 3600MHz CL18" },

  { icon: Monitor, label: "Monitor", value: "1440p 240Hz OLED" },

];



const peripherals = [

  { icon: KeyboardIcon, label: "Keyboard", value: "Drunkdeer G65" },

  { icon: Mouse, label: "Mouse", value: "VXE Dragonfly R1 SE+" },

  { icon: Square, label: "Mousepad", value: "Aqua Control II" },

  { icon: Headphones, label: "Headphones", value: "HyperX Cloud II" },

  { icon: EarbudsIcon, label: "IEMs", value: "Aoshida E20" },

];



// --- Main Component ---



export default function SpecsCard() {

  const [tab, setTab] = useState<"pc" | "peripherals">("pc");

  const specs = tab === "pc" ? pcSpecs : peripherals;



  return (

    <div className="card-base flex flex-col">

      <div className="text-xs font-bold tracking-wider text-muted-foreground mb-4 flex items-center gap-2">

        <CardSectionIcon darkIcon={Monitor} pastelEmoji="🖥️" /> SPECS

      </div>



      <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg mb-4">

        {(["pc", "peripherals"] as const).map((t) => (

          <button

            key={t}

            onClick={() => setTab(t)}

            className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 ${

              tab === t

                ? "bg-border text-foreground shadow-md"

                : "text-muted-foreground hover:text-foreground"

            }`}

          >

            {t === "pc" ? "PC Specs" : "Peripherals"}

          </button>

        ))}

      </div>



      <ul className="flex flex-col gap-2.5 min-h-[190px] justify-center">

        {specs.map((s, i) => (

          <li

            key={i}

            className={`flex items-center justify-between text-sm pb-2.5 ${

              i < specs.length - 1 ? "border-b border-secondary/50" : ""

            }`}

          >

            <span className="text-muted-foreground w-6 text-center flex justify-center">

              <s.icon size={18} />

            </span>

            <span className="font-semibold text-foreground text-right">{s.value}</span>

          </li>

        ))}

      </ul>

    </div>

  );

}