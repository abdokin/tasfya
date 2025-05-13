"use client"

import React, { useState } from "react"
import { Input } from "./ui/input"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export function PasswordInput({
    label,
    error,
    className,
    ...props
}: {
    label: string
    error?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <div className="relative">
            {label && <label className="text-sm font-medium mb-2 block">{label}</label>}
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    className={cn("pr-10", className)}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff size={16} aria-hidden="true" />
                    ) : (
                        <Eye size={16} aria-hidden="true" />
                    )}
                    <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                    </span>
                </button>
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    )
}