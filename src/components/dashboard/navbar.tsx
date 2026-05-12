// import { MobileSidebar } from "./mobile-sidebar";
// import { UserMenu } from "../auth/user-menu";

// export function Navbar() {
//   return (
//     <header className="h-16 border-b border-zinc-800 bg-black flex items-center justify-between px-6 sticky top-0 z-40">
//       <div className="flex items-center gap-4">
//         <MobileSidebar />

//         <h1 className="text-lg font-semibold text-white">Dashboard</h1>
//       </div>

//       <UserMenu />
//     </header>
//   );
// }

import { MobileSidebar } from "./mobile-sidebar";
import { UserMenu } from "../auth/user-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-zinc-800/80 bg-black/70 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <MobileSidebar />

          <div>
            <h1 className="text-lg font-semibold text-white">CloseFlow</h1>

            <p className="text-xs text-zinc-500">AI Outreach System</p>
          </div>
        </div>

        <UserMenu />
      </div>
    </header>
  );
}
