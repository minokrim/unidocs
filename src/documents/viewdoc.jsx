export default function ViewDoc({frameData}){
      if (!frameData) return <div className="text-black">Loading document...</div>;
    return <main className="flex flex-col">
        <iframe src={frameData} frameborder="0" className="w-[100%] h-[100vh]"></iframe>
    </main>
}