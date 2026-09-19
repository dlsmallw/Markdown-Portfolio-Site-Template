import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

interface WrappingContainerProps extends HTMLAttributes<HTMLDivElement> {
    separator?: string;
}

const WrappingContainer = forwardRef<HTMLDivElement, WrappingContainerProps>(({ children, separator, ...props }, ref) => {
    return (
        <div ref={ref} className='wrapping-container' {...props}>
            {children}
        </div>
        )
    }
)

export default WrappingContainer;