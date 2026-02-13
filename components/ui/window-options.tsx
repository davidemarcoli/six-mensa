import React, { useState, useEffect, ReactNode } from "react";

interface WindowOptionsProps {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
    children?: ReactNode;
}

export default function WindowOptions({
                                          isMobile: propsIsMobile = false,
                                          isTablet: propsIsTablet = false,
                                          isDesktop: propsIsDesktop = false,
                                          children,
                                      }: WindowOptionsProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        function handleWindowResize() {
            const resolution = window.innerWidth;
            const mobile = resolution >= 320 && resolution <= 480;
            const tablet = resolution >= 768 && resolution <= 1024;
            const desktop = !mobile && !tablet;

            setIsMobile(mobile);
            setIsTablet(tablet);
            setIsDesktop(desktop);
        }

        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    if (
        (isDesktop && propsIsDesktop) ||
        (isMobile && propsIsMobile) ||
        (isTablet && propsIsTablet)
    ) {
        return <>{children}</>;
    }
    return null;
}
