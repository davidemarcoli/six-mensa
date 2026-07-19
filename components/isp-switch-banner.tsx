import {TriangleAlert} from "lucide-react";

// Temporary banner: remove once the ISP switch on July 31st is fully done.
export default function IspSwitchBanner() {
    return (
        <div
            role="status"
            className="border-b border-yellow-300 bg-yellow-100 px-4 py-2 text-center text-sm text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
            <TriangleAlert className="mr-2 inline-block h-4 w-4 shrink-0" aria-hidden="true"/>
            Due to an ISP switch on July 31st, the menu data may be stale afterwards for a few days. Thanks for your patience!
        </div>
    );
}
