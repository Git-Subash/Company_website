import { WhatWeDoArry } from "@/constants/data";

export default function WhatWeDo() {
  return (
    <div className="w-full">
      {WhatWeDoArry.map((item) => (
        <div key={item.title}>
          <h2 className="py-6 text-lg font-bold">{item.title}</h2>
          <p className="max-w-4xl text-ellipsis">{item.discription}</p>
        </div>
      ))}
    </div>
  );
}
