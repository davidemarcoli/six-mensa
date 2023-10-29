'use client'

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function NotFound({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    useEffect(() => {
        router.replace("/")
    })

    return null
}