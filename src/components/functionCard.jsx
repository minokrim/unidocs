import { GrDocumentPdf } from "react-icons/gr";
import "./functionCard.css";
export default function FunctionCard({task,description,icon}) {
  return <main className="bg-[#E6E6FA] w-[8em] h-[8em] md:w-[20em] md:h-[12em] text-black rounded-xl px-2 md:px-3 py-3">
    <section className="flex flex-col w-[100%] h-[100%]">
            <div>
              <img src={icon} alt="" className="w-auto h-[1.5em] md:h-[3em]"/>
            {/* <GrDocumentPdf className="text-2xl"/> */}
            <p className="truncate text-sm md:text-2xl md:font-bold">{task}</p>
          </div>
          <p className=" truncate font-normal text-xs md:font-regular md:text-base md:overflow-visible md:flex-wrap md:h-[100%] md:text-wrap">
            {description}
          </p>
    </section>
  </main>

}
