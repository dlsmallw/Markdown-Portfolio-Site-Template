import { HTMLAttributes } from "react";

const StrengthBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return (
        <div className='strength-block' style={{}}>
            {children}
        </div>
    )
}

const StrengthComponentRegistry = {
    strengthblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <StrengthBlock {...props} />
    }
}

export default StrengthComponentRegistry;