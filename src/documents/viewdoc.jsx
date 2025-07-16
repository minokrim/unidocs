import sharePdf from "./sharedoc";
export default function ViewDoc({frameData}){
    console.log(frameData)
      if (!frameData) return <div className="text-black">Loading document...</div>;
    return <main>
        <iframe src={frameData} frameborder="0" className="w-full h-[100vh]"></iframe>
        <sharePdf/>
    </main>
}