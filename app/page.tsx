import Image from "next/image";
import { getMetricsForWidth, getAdvancedTextMetrics } from "@/utils/helpers"

export default function Home() {
    // const h1_txt_el = 
    return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <div className="">
                <h1 className="font-bold text-9xl inset-0 pl-0 ml-0">
                    {/* <span className="tracking-normal">H</span>
                    <span>ello</span> */}
                    <span className="tracking-normal m-0">Hello</span>
                </h1>
                <h3 className="font-medium text-4xl">Give me a minute</h3>
            </div>
        </main>
        </div>
  );
}
