import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatSideBar from "./chatSideBar";
import ChatArea from "./chatArea";
import ChatInfo from "./chatInfo";

export default function Chat() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="rounded-lg border min-h-dvh"
    >
      <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
        <ChatSideBar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ChatArea />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} maxSize={25} collapsible>
        <ChatInfo />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
