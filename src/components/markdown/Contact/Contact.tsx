import { HTMLAttributes } from "react";


const LinksBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return (
        <div className='links-block' >
            {children}
        </div>
    )
}

const ContactComponentRegistry = {
    linksblock: (props: HTMLAttributes<HTMLDivElement>) => {
        return <LinksBlock {...props} />
    }
}

export default ContactComponentRegistry;