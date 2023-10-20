import Link from "next/link";
import {ModeToggle} from "@/components/theme-toggle";

export default function Nav() {
    return (
        <>
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <nav className="flex items-center space-x-4 lg:space-x-6">
                        <span>SIX Menus</span>
                        <Link
                            href="/fetch"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            API
                        </Link>
                        <Link
                            href="/pdf"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            PDF
                        </Link>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <ModeToggle/>
                    </div>
                </div>
            </div>
        </>
    )
}
